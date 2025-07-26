<script setup lang="ts">
import { ref } from 'vue';
import DeckSelector from '@/components/wordupx/DeckSelector.vue';
import CardData from '../modules/card-data.vue';

const deckId = ref();
</script>

<template>
  <NSpace vertical :size="8" class="color-black">
    <DeckSelector v-model="deckId" />
    <CardData :deck-id="deckId" />
  </NSpace>
</template>
