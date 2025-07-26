<script setup lang="ts">
import { ref, watch } from 'vue';
import { fetchNextDueCard, fetchUpdateCard } from '@/service/api/card';
import FactCard from '../modules/fact-card.vue';
import IntervalSlider from '../modules/interval-slider.vue';
import CardSetting from '../modules/card-setting.vue';

const deckId = ref();
const nextCard = ref<App.WordUpx.Card>();
const interval = ref();
const cardLoading = ref(false);
const isFlipped = ref(false);

function onFlip() {
  isFlipped.value = true;
}

async function getNextDueCard() {
  if (!deckId.value) return;

  cardLoading.value = true;
  if (nextCard.value) {
    await fetchUpdateCard(deckId.value, nextCard.value.card_index, {
      interval: interval.value
    });
  }
  const { data } = await fetchNextDueCard(deckId.value);
  if (data) {
    isFlipped.value = false;
    nextCard.value = data;
    interval.value = nextCard.value.def_interval;
  }
  cardLoading.value = false;
}

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
    <DeckSelector v-model="deckId" />
    <NCard v-if="nextCard">
      <CardSetting :card="nextCard" :deck-id="deckId" />
      <FactCard :fact="nextCard.fact" :loading="cardLoading" @flip="onFlip" />
      <IntervalSlider
        v-model="interval"
        :min_interval="nextCard.min_interval"
        :def_interval="nextCard.def_interval"
        :max_interval="nextCard.max_interval"
        :loading="cardLoading"
        class="mt-24"
      />
      <NSpace :vertical="false" class="mt-12" :size="24">
        <NButton type="primary" :loading="cardLoading" :disabled="!deckId || !isFlipped" @click="getNextDueCard">
          {{ $t('page.cards.next') }}
        </NButton>
      </NSpace>
    </NCard>
  </NSpace>
</template>

<style scoped></style>
