<script lang="ts" setup>
import { defineProps, ref, watch } from 'vue';
import { ListColumn, ListTable } from '@visactor/vue-vtable';
import { fetchAllCards } from '@/service/api';

defineOptions({
  name: 'CardData'
});

const props = defineProps<{ deckId: string }>();
const listRecords = ref<App.WordUpx.CardRaw[]>();

watch(
  () => props.deckId,
  async val => {
    if (val) {
      const { data } = await fetchAllCards(props.deckId);
      if (data) {
        listRecords.value = data.cards;
      }
    }
  },
  {
    immediate: true
  }
);
</script>

<template>
  <NSpace vertical :size="8">
    <NCard>Some filters</NCard>
    <NCard :bordered="false">
      <ListTable :options="{}" :records="listRecords" height="400px">
        <ListColumn field="fact_index" :title="$t('table.deck.name')" width="auto" />
        <ListColumn field="hidden" :title="$t('table.card.hidden')" width="auto" />
      </ListTable>
    </NCard>
  </NSpace>
</template>
