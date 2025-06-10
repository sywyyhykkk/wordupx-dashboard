<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { ListColumn, ListTable } from '@visactor/vue-vtable';
import { fetchAllDecks } from '@/service/api';

defineOptions({
  name: 'UserData'
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
    <NCard title="Deck List" :bordered="false">
      <ListTable :options="{}" :records="listRecords" height="400px">
        <ListColumn field="name" title="Name" width="auto" />
        <ListColumn field="owner.username" title="Owner" width="auto" />
        <ListColumn field="fields" title="Fields" width="auto" />
        <ListColumn field="templates" title="Templates" width="auto" />
        <ListColumn field="rate" title="Rate" width="auto" />
      </ListTable>
    </NCard>
  </NSpace>
</template>
