<script setup lang="ts">
import { computed, ref } from 'vue';
import { NButton, NCard } from 'naive-ui';

defineOptions({
  name: 'FactCard'
});

const props = defineProps<{
  fact: string[];
  loading: boolean;
}>();

interface Emits {
  (e: 'flip'): void;
}

const emit = defineEmits<Emits>();
const flipped = ref(false);
const front = computed(() => props.fact[0]);
const back = computed(() => props.fact.slice(1));

function toggleFlip() {
  emit('flip');
  flipped.value = !flipped.value;
}
</script>

<template>
  <div class="m-auto h-40 w-80 perspective-800">
    <div
      class="transform-style-preserve-3d relative h-full w-full transition-transform duration-500"
      :class="{ 'rotate-y-180': flipped }"
    >
      <!-- Front -->
      <NCard
        class="backface-hidden absolute h-full w-full flex items-center justify-center rounded-xl text-center text-lg shadow-xl"
        embedded
      >
        {{ front }}
      </NCard>

      <!-- Back -->
      <NCard
        class="backface-hidden absolute h-full w-full flex rotate-y-180 items-center justify-center rounded-xl text-center text-lg shadow-xl"
        embedded
      >
        {{ back.join(', ') }}
      </NCard>
    </div>

    <div class="mt-4 text-center">
      <NButton size="small" type="primary" :loading="props.loading" @click="toggleFlip">
        {{ $t('page.cards.flip') }}
      </NButton>
    </div>
  </div>
</template>

<style scoped>
.perspective-800 {
  perspective: 800px;
}

.transform-style-preserve-3d {
  transform-style: preserve-3d;
}

.backface-hidden {
  backface-visibility: hidden;
}

.rotate-y-180 {
  transform: rotateY(180deg);
}
</style>
