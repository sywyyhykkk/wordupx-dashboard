<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import type { SelectOption } from 'naive-ui';
import { fetchNextDueCard, fetchReviewCard } from '@/service/api/card';
import { fetchUserDecks } from '@/service/api';
import Fact from './modules/Fact.vue';
import Slide from './modules/Slider.vue';

const deckId = ref();
const nextCard = ref();
const userDecks = ref<SelectOption[]>();
const interval = ref();
const isLoading = ref(false);
const cardLoading = ref(false);

async function getNextDueCard() {
  cardLoading.value = true;
  if (nextCard.value) {
    await fetchReviewCard(deckId.value, nextCard.value.card_index, interval.value);
  }
  const { data } = await fetchNextDueCard(deckId.value);
  if (data) {
    nextCard.value = data;
    interval.value = nextCard.value.def_interval;
  }
  cardLoading.value = false;
}

async function getUserDecks() {
  isLoading.value = true;
  const { data } = await fetchUserDecks();
  if (data) {
    userDecks.value = data?.decks.map((deck: App.WordUpx.Deck) => ({
      label: deck.name,
      value: deck.id
    }));
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
  <NSpace vertical :size="8" class="color-black">
    <template v-if="!isLoading">
      <NCard>
        <div class="flex items-center justify-between">
          <NSelect v-model:value="deckId" :options="userDecks" :placeholder="$t('page.cards.deckIdPlaceholder')" />
        </div>
      </NCard>

      <NCard v-if="nextCard">
        <Fact :fact="nextCard.fact" :loading="cardLoading" />
        <Slide
          v-model="interval"
          :min_interval="nextCard.min_interval"
          :def_interval="nextCard.def_interval"
          :max_interval="nextCard.max_interval"
          :loading="cardLoading"
          class="mt-24"
        />
        <NSpace :vertical="false" class="mt-12" :size="24">
          <NButton type="primary" :loading="cardLoading" :disabled="!deckId" @click="getNextDueCard">
            {{ $t('page.cards.next') }}
          </NButton>
        </NSpace>
      </NCard>
    </template>
    <div v-else class="w-full flex justify-center">
      <NSpin size="small" class="mx-auto" />
    </div>
  </NSpace>
</template>

<style scoped></style>
