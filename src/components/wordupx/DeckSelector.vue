<script setup lang="ts">
import { onActivated, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { NCard, NSelect } from 'naive-ui';
import type { SelectOption } from 'naive-ui';
import { fetchUserDecks } from '@/service/api';

defineOptions({
  name: 'DeckSelector'
});

const userDecks = ref<SelectOption[]>();
const router = useRouter();
const route = useRoute();
const isLoading = ref(false);
const deckId = defineModel<string>();

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

function onDeckChange(value: string) {
  deckId.value = value;

  router.replace({
    ...route,
    query: {
      ...route.query,
      deckId: value
    }
  });
}

onMounted(() => {
  getUserDecks();
  const q = route.query.deckId;
  const id = Array.isArray(q) ? q[0] : q || '';
  if (id && id !== deckId.value) {
    onDeckChange(id);
  }
});

onActivated(() => {
  if (deckId.value) {
    router.replace({
      ...route,
      query: {
        ...route.query,
        deckId: deckId.value
      }
    });
  }
});
</script>

<template>
  <NCard>
    <div class="flex items-center justify-between">
      <NSelect
        v-model:value="deckId"
        :options="userDecks"
        :loading="!userDecks?.length"
        :placeholder="$t('page.cards.deckIdPlaceholder')"
        @update:value="onDeckChange"
      />
    </div>
  </NCard>
</template>
