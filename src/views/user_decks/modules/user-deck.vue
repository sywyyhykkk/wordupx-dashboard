<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { NButton } from 'naive-ui';
import { ListTable } from '@visactor/vue-vtable';
import { useI18n } from 'vue-i18n';
import { fetchUserDecks } from '@/service/api';
import CreateDeck from './create-deck.vue';

defineOptions({
  name: 'UserDeck'
});

const listRecords = ref<App.WordUpx.Deck[]>();
const isLoading = ref(false);
const isShowDialog = ref(false);
const { t } = useI18n();
const columns = [
  {
    title: t('table.deck.name'),
    field: 'name',
    width: 'auto'
  },
  {
    title: t('table.deck.owner'),
    field: 'owner',
    width: 'auto'
  },
  {
    title: t('table.deck.fields'),
    field: 'field',
    width: 'auto'
  },
  {
    title: t('table.deck.template'),
    field: 'templates',
    width: 'auto'
  },
  {
    title: t('table.deck.rate'),
    field: 'rate',
    width: 'auto'
  }
  //   {
  //     title: t('table.common.actions'),
  //     field: 'button',
  //     cellType: 'button',
  //     text: 'Select',
  //     width: 120,
  //     render(record: App.WordUpx.Deck) {
  //       return h('div', { class: 'flex gap-2' }, [
  //         h(
  //           NButton,
  //           {
  //             size: 'small',
  //             tertiary: true,
  //             onClick: () => handleEdit(record)
  //           },
  //           { default: () => t('common.edit') }
  //         ),
  //         h(
  //           NButton,
  //           {
  //             size: 'small',
  //             tertiary: true,
  //             type: 'error',
  //             onClick: () => handleDelete(record)
  //           },
  //           { default: () => t('common.delete') }
  //         )
  //       ]);
  //     }
  //   }
];

async function getUserDecks() {
  isLoading.value = true;
  const { data } = await fetchUserDecks();
  if (data) {
    listRecords.value = data.decks.map(item => {
      return {
        ...item,
        actions: []
      };
    });
  }
  isLoading.value = false;
}

onMounted(() => {
  getUserDecks();
});

// function handleEdit(row: App.WordUpx.Deck) {}

// function handleDelete(row: App.WordUpx.Deck) {}
</script>

<template>
  <NSpace vertical :size="16">
    <NCard>
      <div class="flex items-center justify-between">
        <div>Some filters</div>
        <NButton type="primary" @click="isShowDialog = true">Create</NButton>
      </div>
    </NCard>
    <NCard :bordered="false">
      <ListTable
        :options="{
          columns
        }"
        :records="listRecords"
        height="400px"
      />
    </NCard>

    <CreateDeck v-if="isShowDialog" v-model="isShowDialog" @save="getUserDecks" />
  </NSpace>
</template>
