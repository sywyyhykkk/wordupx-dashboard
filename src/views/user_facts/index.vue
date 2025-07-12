<script setup lang="ts">
import { onMounted, ref } from 'vue';
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

function onSelect(data: string) {
  const deck = userDecks.value?.find(d => d.value === data);
  if (deck) {
    fields.value = deck.field as unknown as string[];
  }
}

function onAddNewFact() {
  console.log(userFact.value);
  userFact.value?.getUserFacts();
}

onMounted(() => {
  getUserDecks();
});
</script>

<template>
  <NSpace vertical :size="8" class="color-black">
    <NCard v-if="!isLoading">
      <div class="flex items-center justify-between gap-8">
        <NSelect
          v-model:value="deckId"
          :options="userDecks"
          :placeholder="$t('page.cards.deckIdPlaceholder')"
          @update:value="onSelect"
        />
        <NButton type="primary" :disabled="!deckId" @click="isShowDialog = true">Add fact</NButton>
      </div>
    </NCard>

    <UserFact v-if="deckId" ref="userFact" :deck-id="deckId" :fields="fields || []" />

    <div v-if="isLoading" class="w-full flex justify-center">
      <NSpin size="small" class="mx-auto" />
    </div>

    <AddFact v-if="isShowDialog" v-model="isShowDialog" :deck-id="deckId" :fields="fields || []" @save="onAddNewFact" />
  </NSpace>
</template>

<style scoped></style>
