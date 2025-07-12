<script setup lang="ts">
import { ref } from 'vue';
import { NButton, NForm, NFormItem, NInput, NModal } from 'naive-ui';
import { useI18n } from 'vue-i18n';
import { addFactToDeck } from '@/service/api';

const emit = defineEmits<{
  save: [];
}>();
const props = defineProps<{
  fields: string[];
  deckId: string;
}>();
const show = defineModel<boolean>();
const factsInput = ref<string[][]>([Array.from({ length: props.fields.length }, () => '')]);
const { t } = useI18n();

function addFactGroup() {
  factsInput.value.push(['', '']);
}

function removeFactGroup(index: number) {
  if (factsInput.value.length > 1) {
    factsInput.value.splice(index, 1);
  }
}

async function handleSave() {
  const { data } = await addFactToDeck(props.deckId, factsInput.value);
  if (data) {
    factsInput.value = [Array.from({ length: props.fields.length }, () => '')];
    emit('save');
    window.$notification?.success({
      content: t('common.saveSuccess'),
      duration: 2000
    });
    show.value = false;
  }
}
</script>

<template>
  <NModal
    v-model:show="show"
    preset="card"
    :title="$t('page.common.addNew', { name: $t('route.user_facts') })"
    class="max-h-70svh w-96 overflow-y-scroll"
  >
    <NForm label-placement="top">
      <template v-for="(group, index) in factsInput" :key="index">
        <NDivider># {{ index + 1 }}</NDivider>
        <NFormItem v-for="(field, idx) in fields" :key="field" :label="`${field}`">
          <NInput v-model:value.trim="group[idx]" type="textarea" :placeholder="$t('form.field.required', { field })" />
        </NFormItem>

        <div class="mb-4">
          <NButton v-if="factsInput.length > 1" size="small" type="error" @click="removeFactGroup(index)">
            {{ $t('common.delete') }}
          </NButton>
        </div>
      </template>
    </NForm>
    <NButton type="default" @click="addFactGroup">添加新组</NButton>
    <template #footer>
      <div class="flex justify-end gap-2">
        <NButton @click="show = false">{{ $t('common.cancel') }}</NButton>
        <NButton type="primary" @click="handleSave">{{ $t('common.save') }}</NButton>
      </div>
    </template>
  </NModal>
</template>
