<script setup lang="ts">
import { useAppStore } from '@/store/modules/app';
import { useThemeStore } from '@/store/modules/theme';
import { useRouterPush } from '@/hooks/common/router';
import FirstLevelMenu from '../components/first-level-menu.vue';
import { useMenu, useMixMenuContext } from '../../../context';

defineOptions({
  name: 'HorizontalMixMenu'
});

const appStore = useAppStore();
const themeStore = useThemeStore();
const { routerPushByKeyWithMetaQuery } = useRouterPush();
const { allMenus, childLevelMenus, activeFirstLevelMenuKey, setActiveFirstLevelMenuKey } = useMixMenuContext();
const { selectedKey } = useMenu();

function handleSelectMixMenu(menu: App.Global.Menu) {
  setActiveFirstLevelMenuKey(menu.key);

  if (!menu.children?.length) {
    routerPushByKeyWithMetaQuery(menu.routeKey);
  }
}
</script>

<template>
  <Teleport to="__GLOBAL_HEADER_MENU__">
    <NMenu
      mode="horizontal"
      :value="selectedKey"
      :options="childLevelMenus"
      :indent="18"
      responsive
      @update:value="routerPushByKeyWithMetaQuery"
    />
  </Teleport>
  <Teleport to="__GLOBAL_SIDE_MENU__">
    <FirstLevelMenu
      :menus="allMenus"
      :active-menu-key="activeFirstLevelMenuKey"
      :sider-collapse="appStore.siderCollapse"
      :dark-mode="themeStore.darkMode"
      :theme-color="themeStore.themeColor"
      @select="handleSelectMixMenu"
      @toggle-sider-collapse="appStore.toggleSiderCollapse"
    />
  </Teleport>
</template>

<style scoped></style>
