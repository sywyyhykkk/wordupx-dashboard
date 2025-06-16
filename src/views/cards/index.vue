<script setup lang="ts">
import { ref } from 'vue';
import { fetchNextDueCard } from '@/service/api/user';
const deckId = ref('e6d67b3a-9443-4059-8a90-8a84caad8c75');
const nextCard = ref();

async function getNextDueCard() {
  const { data } = await fetchNextDueCard(deckId.value);
  if (data) {
    nextCard.value = data;
  }
}
</script>

<template>
  <NSpace vertical :size="16" class="color-black">
    <NInput v-model:value="deckId" :placeholder="$t('page.cards.deckIdPlaceholder')" />
    <NButton @click="getNextDueCard">GET NEXT DUE</NButton>

    Fact: {{ nextCard?.fact }}
  </NSpace>
</template>

<style scoped></style>
