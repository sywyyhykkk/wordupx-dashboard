<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { ListTable } from '@visactor/vue-vtable';
import { fetchUserFacts } from '@/service/api';

defineOptions({
  name: 'UserFact'
});

const props = defineProps<{
  fields: string[];
  deckId: string;
}>();

const listRecords = ref<Record<string, string>[]>([]);
const isLoading = ref(false);

const columns = computed(() => {
  return props.fields.map(field => ({
    title: field,
    field,
    width: 'auto'
  }));
});

async function getUserFacts() {
  isLoading.value = true;
  const { data } = await fetchUserFacts(props.deckId);

  if (data) {
    listRecords.value = data.facts.map((arr: string[]) => {
      const obj: Record<string, string> = {};
      props.fields.forEach((field, index) => {
        obj[field] = arr[index] || '';
      });
      return obj;
    });
  }

  isLoading.value = false;
}

watch(
  () => props.deckId,
  val => {
    if (val) {
      getUserFacts();
    }
  },
  {
    immediate: true
  }
);

defineExpose({
  getUserFacts
});
</script>

<template>
  <NCard :bordered="false">
    <ListTable
      :options="{
        columns
      }"
      :records="listRecords"
      height="400px"
    />
  </NCard>
</template>
