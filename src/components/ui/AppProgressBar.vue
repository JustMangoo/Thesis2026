<script setup>
import { computed } from 'vue'
const props = defineProps({ value: Number, max: Number })
const pct = computed(() => props.max > 0 ? Math.round((props.value / props.max) * 100) : 0)
</script>

<template>
  <div class="flex items-center gap-2">
    <div class="flex-1 h-2 rounded-full bg-neutral-200 overflow-hidden">
      <div class="h-full bg-warning rounded-full transition-all" :style="{ width: pct + '%' }" />
    </div>
    <span class="text-xs text-neutral-500 whitespace-nowrap">{{ value }}/{{ max }} Signed</span>
  </div>
</template>
