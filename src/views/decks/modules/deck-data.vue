<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { ListColumn, ListTable } from '@visactor/vue-vtable';
import { fetchAllDecks } from '@/service/api';

defineOptions({
  name: 'DeckData'
});

const listRecords = ref<App.WordUpx.Deck[]>();

onMounted(async () => {
  const { data } = await fetchAllDecks();

  if (data) {
    listRecords.value = data.decks;
  }
});
</script>

<template>
  <NSpace vertical :size="16">
    <NCard>Some filters</NCard>
    <NCard :bordered="false">
      <ListTable :options="{}" :records="listRecords" height="400px">
        <ListColumn field="name" :title="$t('table.deck.name')" width="auto" />
        <ListColumn field="owner.username" :title="$t('table.deck.owner')" width="auto" />
        <ListColumn field="fields" :title="$t('table.deck.fields')" width="auto" />
        <ListColumn field="templates" :title="$t('table.deck.template')" width="auto" />
        <ListColumn field="rate" :title="$t('table.deck.rate')" width="auto" />
      </ListTable>
    </NCard>
  </NSpace>
</template>
