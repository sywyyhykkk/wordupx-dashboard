import { computed, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { defineStore } from 'pinia';
import { useLoading } from '@sa/hooks';
import { fetchLogin, fetchUserLogin, fetchUserRegister } from '@/service/api';
import { useRouterPush } from '@/hooks/common/router';
import { localStg } from '@/utils/storage';
import { SetupStoreId } from '@/enum';
import { $t } from '@/locales';
import { useRouteStore } from '../route';
import { useTabStore } from '../tab';
import { clearAuthStorage, getToken } from './shared';

export const useAuthStore = defineStore(SetupStoreId.Auth, () => {
  const route = useRoute();
  const routeStore = useRouteStore();
  const tabStore = useTabStore();
  const { toLogin, redirectFromLogin } = useRouterPush(false);
  const { loading: loginLoading, startLoading, endLoading } = useLoading();

  const token = computed(() => getToken());

  const userInfo: Api.Auth.UserInfo = reactive({
    userId: '',
    username: '',
    roles: ['1'],
    buttons: []
  });

  const setUserRole = (role: string) => {
    userInfo.roles = [role];
  };

  /** is super role in static route */
  const isStaticSuper = computed(() => {
    const { VITE_AUTH_ROUTE_MODE, VITE_STATIC_SUPER_ROLE } = import.meta.env;

    return VITE_AUTH_ROUTE_MODE === 'static' && userInfo.roles.includes(VITE_STATIC_SUPER_ROLE);
  });

  /** Is login */
  const isLogin = computed(() => Boolean(token.value));

  /** Reset auth store */
  async function resetStore() {
    const authStore = useAuthStore();

    clearAuthStorage();

    authStore.$reset();

    if (!route.meta.constant) {
      await toLogin();
    }

    tabStore.cacheTabs();
    routeStore.resetStore();
  }

  /**
   * Login
   *
   * @param username Username
   * @param password Password
   * @param [redirect=true] Whether to redirect after login. Default is `true`
   */
  async function login(username: string, password: string, redirect = true) {
    startLoading();

    const { data, error } = await fetchLogin(username, password);

    if (!error) {
      localStg.set('token', data.token);

      await redirectFromLogin(redirect);

      window.$notification?.success({
        title: $t('page.login.common.loginSuccess'),
        content: $t('page.login.common.welcomeBack'),
        duration: 4500
      });
    } else {
      resetStore();
    }

    endLoading();
  }

  async function userLogin(username: string, password: string, redirect = true) {
    startLoading();

    const { data, error } = await fetchUserLogin(username, password);

    if (!error) {
      localStg.set('token', data.token);

      await redirectFromLogin(redirect);

      window.$notification?.success({
        title: $t('page.login.common.loginSuccess'),
        content: $t('page.login.common.welcomeBack'),
        duration: 4500
      });
    } else {
      resetStore();
    }

    endLoading();
  }

  async function userRegister(email: string, username: string, password: string) {
    startLoading();

    const { data, error } = await fetchUserRegister(email, username, password);

    if (!error) {
      if (data.email && data.username) {
        userLogin(username, password, true);
      }
    } else {
      resetStore();
    }

    endLoading();
  }

  // async function getUserInfo() {
  //   const { data: info, error } = await fetchGetUserInfo();

  //   if (!error) {
  //     // update store
  //     Object.assign(userInfo, info);

  //     return true;
  //   }

  //   return false;
  // }

  async function initUserInfo() {
    const hasToken = getToken();

    if (hasToken) {
      // const pass = await getUserInfo();

      const pass = true;
      if (!pass) {
        resetStore();
      }
    }
  }

  return {
    token,
    userInfo,
    isStaticSuper,
    isLogin,
    loginLoading,
    resetStore,
    login,
    userLogin,
    userRegister,
    initUserInfo,
    setUserRole
  };
});
