<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue';
import { useAuthStore } from '@/store/modules/auth';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import { $t } from '@/locales';

defineOptions({
  name: 'PwdLogin'
});

const authStore = useAuthStore();
const { formRef, validate } = useNaiveForm();
const userType = ref('1'); // 0=admin 1=user
interface FormModel {
  username: string;
  password: string;
}

const model: FormModel = reactive({
  username: 'joeadmin',
  password: '123456'
});

const rules = computed<Record<keyof FormModel, App.Global.FormRule[]>>(() => {
  // inside computed to make locale reactive, if not apply i18n, you can define it without computed
  const { formRules } = useFormRules();

  return {
    username: formRules.username,
    password: formRules.pwd
  };
});

async function handleSubmit() {
  await validate();

  if (userType.value === '0') {
    await authStore.login(model.username, model.password);
  } else {
    await authStore.userLogin(model.username, model.password);
  }
}

watch(
  () => userType.value,
  val => {
    authStore.setUserRole(val);
    if (val === '0') {
      model.username = 'joeadmin';
      model.password = '123456';
    } else {
      model.username = 'kkk888';
      model.password = 'kkk888';
    }
  },
  {
    immediate: true
  }
);
</script>

<template>
  <NForm ref="formRef" :model="model" :rules="rules" size="large" :show-label="false" @keyup.enter="handleSubmit">
    <NFormItem path="username">
      <NInput v-model:value="model.username" :placeholder="$t('page.login.common.usernamePlaceholder')" />
    </NFormItem>
    <NFormItem path="password">
      <NInput
        v-model:value="model.password"
        type="password"
        show-password-on="click"
        :placeholder="$t('page.login.common.passwordPlaceholder')"
      />
    </NFormItem>
    <NFormItem path="userType">
      <NSelect
        v-model:value="userType"
        :options="[
          {
            label: $t('page.login.common.admin'),
            value: '0'
          },
          {
            label: $t('page.login.common.user'),
            value: '1'
          }
        ]"
        :placeholder="$t('page.login.common.userTypePlaceholder')"
      />
    </NFormItem>
    <NSpace vertical :size="24">
      <div class="flex-y-center justify-between">
        <NCheckbox>{{ $t('page.login.pwdLogin.rememberMe') }}</NCheckbox>
      </div>
      <NButton type="primary" size="large" round block :loading="authStore.loginLoading" @click="handleSubmit">
        {{ $t('common.confirm') }}
      </NButton>
    </NSpace>
  </NForm>
</template>

<style scoped></style>
