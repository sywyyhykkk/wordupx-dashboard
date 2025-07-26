<script setup lang="ts">
import { NButton, NDropdown } from 'naive-ui';
import { useI18n } from 'vue-i18n';
import { fetchUpdateCard } from '@/service/api';

defineOptions({
  name: 'CardSettings'
});

const props = defineProps<{ deckId: string; card: App.WordUpx.Card }>();
const { t } = useI18n();

// 菜单项定义
const menuOptions = [
  {
    label: t('page.cards.hide'),
    key: 'hide'
  }
];

// 处理选中项
async function handleSelect(key: string) {
  switch (key) {
    case 'hide':
      // Interval is out of range
      await fetchUpdateCard(props.deckId, props.card.card_index, {
        hidden: false
      });
      break;
    default:
      break;
  }
}
</script>

<template>
  <div class="absolute right-4 top-4 z-3">
    <NDropdown trigger="click" :options="menuOptions" @select="handleSelect">
      <NButton text>
        <SvgIcon icon="mdi:dots-horizontal" class="text-icon-large" />
      </NButton>
    </NDropdown>
  </div>
</template>
