<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { SelectOption } from 'naive-ui';
import { fetchNextDueCard, fetchReviewCard } from '@/service/api/card';
import { fetchUserDecks } from '@/service/api';

const deckId = ref();
const nextCard = ref();
const isReviewed = ref(false);
const userDecks = ref<SelectOption[]>();
const factor = ref(2);

async function getNextDueCard() {
  const { data } = await fetchNextDueCard(deckId.value);
  if (data) {
    isReviewed.value = false;
    nextCard.value = data;
  }
}

async function reviewCard() {
  const { data } = await fetchReviewCard(deckId.value, nextCard.value.card_index, factor.value);
  if (data) {
    isReviewed.value = true;
  }
}

async function getUserDecks() {
  const { data } = await fetchUserDecks();
  if (data) {
    userDecks.value = data?.decks.map((deck: App.WordUpx.Deck) => ({
      label: deck.name,
      value: deck.id
    }));
  }
}

onMounted(() => {
  getUserDecks();
});
</script>

<template>
  <NSpace vertical :size="16" class="color-black">
    <NSelect v-model:value="deckId" :options="userDecks" :placeholder="$t('page.cards.deckIdPlaceholder')" />
    <NButton type="primary" :disabled="!deckId" @click="getNextDueCard">{{ $t('page.cards.next') }}</NButton>

    <template v-if="nextCard">
      <span class="fw-bold">Fact: {{ nextCard?.fact }}</span>
      <div class="px-4">
        <NSlider
          v-model:value="factor"
          :step="1"
          :tooltip="false"
          :min="2"
          :max="8"
          class="w-1/2"
          :marks="{ 2: 'EASY', 8: 'HARD' }"
        />
      </div>
      <NButton :disabled="!nextCard || isReviewed" @click="reviewCard">{{ $t('page.cards.review') }}</NButton>
    </template>
  </NSpace>
</template>

<style scoped></style>
