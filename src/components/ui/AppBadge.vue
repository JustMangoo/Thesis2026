<script setup>
import { computed } from 'vue'
import { useStatusColor } from '@/composables/useStatusColor.js'

const props = defineProps({
  status: { type: String, required: true },
})

const { getClasses } = useStatusColor()
const classes = computed(() => getClasses(props.status))
</script>

<template>
  <span :class="['inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border', classes.text, classes.bg, classes.border]">
    <span :class="['w-1.5 h-1.5 rounded-full', classes.dot]" />
    <slot>{{ status }}</slot>
  </span>
</template>
