<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useLocalStorage } from '@vueuse/core';
import type { SelectOption } from 'naive-ui';
import { fetchNextDueCard, fetchReviewCard } from '@/service/api/card';
import { fetchUserDecks } from '@/service/api';
import Fact from './modules/Fact.vue';
import Slide from './modules/Slider.vue';

const deckId = useLocalStorage('USER_CURRENT_DECK_ID', '');
const nextCard = ref();
const isReviewed = ref(false);
const userDecks = ref<SelectOption[]>();
const interval = ref();
const isLoading = ref(false);

async function getNextDueCard() {
  const { data } = await fetchNextDueCard(deckId.value);
  if (data) {
    isReviewed.value = false;
    nextCard.value = data;
    interval.value = nextCard.value.def_interval;
  }
}

async function reviewCard() {
  const { data } = await fetchReviewCard(deckId.value, nextCard.value.card_index, interval.value);
  if (data) {
    isReviewed.value = true;
  }
}

async function getUserDecks() {
  isLoading.value = true;
  const { data } = await fetchUserDecks();
  if (data) {
    userDecks.value = data?.decks.map((deck: App.WordUpx.Deck) => ({
      label: deck.name,
      value: deck.id
    }));
    deckId.value = userDecks.value[0].value as string;
  }
  isLoading.value = false;
}

onMounted(() => {
  getUserDecks();
});

watch(
  () => deckId.value,
  val => {
    nextCard.value = undefined;
    if (val) {
      getNextDueCard();
    }
  },
  {
    immediate: true
  }
);
</script>

<template>
  <NSpace vertical :size="32" class="color-black">
    <template v-if="!isLoading">
      <NSelect v-model:value="deckId" :options="userDecks" :placeholder="$t('page.cards.deckIdPlaceholder')" />
      {{ nextCard }}
      <template v-if="nextCard">
        <Fact :fact="nextCard?.fact" />
        <Slide
          v-model="interval"
          :min_interval="nextCard.min_interval"
          :def_interval="nextCard.def_interval"
          :max_interval="nextCard.max_interval"
        />
        <NSpace :vertical="false" :size="24">
          <NButton type="primary" :disabled="!deckId" @click="getNextDueCard">{{ $t('page.cards.next') }}</NButton>
          <NButton :disabled="!nextCard || isReviewed" @click="reviewCard">{{ $t('page.cards.review') }}</NButton>
        </NSpace>
      </template>
    </template>
    <div v-else class="w-full flex justify-center">
      <NSpin size="small" class="mx-auto" />
    </div>
  </NSpace>
</template>

<style scoped></style>
