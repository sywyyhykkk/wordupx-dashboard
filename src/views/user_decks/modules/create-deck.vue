<script setup lang="ts">
import { computed, ref } from 'vue';
import { NButton, NDynamicInput, NForm, NFormItem, NInput, NModal, NSlider } from 'naive-ui';
import { createNewDeck } from '@/service/api';

const emit = defineEmits<{
  save: [];
}>();
const show = defineModel<boolean>();
const name = ref('');
const fields = ref<string[]>(['']);
const rate = ref(20);

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
  <NModal
    v-model:show="show"
    preset="card"
    :title="$t('page.common.addNew', { name: $t('route.user_decks') })"
    class="w-96"
  >
    <NForm label-placement="top">
      <NFormItem :label="$t('table.deck.name')">
        <NInput
          v-model:value.trim="name"
          :placeholder="$t('form.pleaseEnter', { field: $t('table.deck.name').toLocaleLowerCase() })"
        />
      </NFormItem>

      <NFormItem :label="$t('table.deck.fields')">
        <NDynamicInput
          v-model:value.trim="fields"
          :placeholder="$t('form.pleaseEnter', { field: $t('table.deck.fields').toLocaleLowerCase() })"
          :min="1"
        />
      </NFormItem>

      <NFormItem :label="$t('table.deck.rate')">
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
