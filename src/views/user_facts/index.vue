<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import type { SelectOption } from 'naive-ui';
import { fetchUserDecks } from '@/service/api';
import AddFact from './modules/add-fact.vue';
import UserFact from './modules/user-fact.vue';

const userDecks = ref<SelectOption[]>();
const isLoading = ref(false);
const deckId = ref();
const isShowDialog = ref();
const fields = ref<string[]>();
const userFact = ref();

async function getUserDecks() {
  isLoading.value = true;
  const { data } = await fetchUserDecks();
  if (data) {
    userDecks.value = data.decks.map((deck: App.WordUpx.Deck) => ({
      label: deck.name,
      value: deck.id,
      ...deck
    }));
  }
  isLoading.value = false;
}

watch(
  () => [deckId.value, userDecks.value?.length],
  val => {
    const deck = userDecks.value?.find(d => d.value === val[0]);
    if (deck) {
      fields.value = deck.field as unknown as string[];
    }
  },
  {
    immediate: true
  }
);

function onAddNewFact() {
  userFact.value?.getUserFacts();
}

onMounted(() => {
  getUserDecks();
});
</script>

<template>
  <NSpace vertical :size="8" class="color-black">
    <DeckSelector v-model="deckId" />

    <UserFact v-if="deckId" ref="userFact" :deck-id="deckId" :fields="fields || []" />

    <div v-if="isLoading" class="w-full flex justify-center">
      <NSpin size="small" class="mx-auto" />
    </div>

    <AddFact v-if="isShowDialog" v-model="isShowDialog" :deck-id="deckId" :fields="fields || []" @save="onAddNewFact" />
  </NSpace>
</template>

<style scoped></style>
