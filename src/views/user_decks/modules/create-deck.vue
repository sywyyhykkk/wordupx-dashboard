<script setup lang="ts">
import { computed, ref } from 'vue';
import { NButton, NDynamicInput, NForm, NFormItem, NInput, NModal, NSlider } from 'naive-ui';
import { createNewDeck } from '@/service/api';

const emit = defineEmits<{
  save: [];
}>();
const show = defineModel<boolean>();

// 表单数据
const name = ref('');
const fields = ref<string[]>(['']);
const rate = ref(20);

// 自动生成模板，每个字段一个模板
const templates = computed(() => {
  return fields.value.map((_, index) => [index]);
});

async function handleSave() {
  const deckData: App.WordUpx.DeckForm = {
    name: name.value.trim(),
    fields: fields.value.filter(f => f.trim() !== ''),
    templates: templates.value,
    rate: rate.value
  };

  await createNewDeck(deckData);

  show.value = false;
  name.value = '';
  fields.value = [''];
  rate.value = 20;
  emit('save');
}
</script>

<template>
  <NModal v-model:show="show" preset="card" title="新增卡组" class="w-96">
    <NForm label-placement="top">
      <NFormItem label="卡组名称">
        <NInput v-model:value="name" placeholder="请输入卡组名称" />
      </NFormItem>

      <NFormItem label="字段（如 仮名 / 汉字 / 含义）">
        <NDynamicInput v-model:value="fields" placeholder="请输入字段名" :min="1" />
      </NFormItem>

      <NFormItem label="复习频率（rate）">
        <NSlider v-model:value="rate" :min="1" :max="100" :step="1" :format-tooltip="val => `${val} 次/日`" />
      </NFormItem>
    </NForm>

    <template #footer>
      <div class="flex justify-end gap-2">
        <NButton @click="show = false">{{ $t('common.cancel') }}</NButton>
        <NButton type="primary" @click="handleSave">{{ $t('common.save') }}</NButton>
      </div>
    </template>
  </NModal>
</template>
