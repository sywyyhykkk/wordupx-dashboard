<script setup lang="ts">
import { computed } from 'vue';
import { NSlider } from 'naive-ui';
import { $t } from '@/locales';

const props = defineProps<{
  def_interval: number;
  min_interval: number;
  max_interval: number;
  modelValue: number;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void;
}>();

function formatTime(seconds: number): string {
  if (seconds < 3600) return `${Math.round(seconds / 60)}${$t('page.cards.min')}`;
  if (seconds < 86400) return `${Math.round(seconds / 3600)}${$t('page.cards.hr')}`;
  if (seconds < 604800) return `${Math.round(seconds / 86400)}${$t('page.cards.d')}`;
  if (seconds < 2592000) return `${Math.round(seconds / 604800)}${$t('page.cards.wk')}`;
  if (seconds < 31536000) return `${Math.round(seconds / 2592000)}${$t('page.cards.yr')}`;
  return `${Math.round(seconds / 31536000)}yr`;
}

// 为滑块的标记生成格式化文本
const marks = computed(() => ({
  [props.min_interval]: formatTime(props.min_interval),
  [props.def_interval]: formatTime(props.def_interval),
  [props.max_interval]: formatTime(props.max_interval)
}));
</script>

<template>
  <div class="w-full px-4">
    <NSlider
      :min="min_interval"
      :max="max_interval"
      :marks="marks"
      :step="1"
      :value="modelValue"
      :format-tooltip="formatTime"
      @update:value="emit('update:modelValue', $event)"
    />
  </div>
</template>
