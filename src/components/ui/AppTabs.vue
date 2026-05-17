<script setup>
defineProps({
  tabs: { type: Array, required: true },
  modelValue: { type: String, required: true },
})
defineEmits(['update:modelValue'])
</script>

<template>
  <div class="flex border-b border-neutral-200">
    <button
      v-for="tab in tabs"
      :key="tab.key"
      :class="[
        'px-4 py-3 text-sm font-medium transition-colors border-b-2 -mb-px',
        modelValue === tab.key
          ? 'border-primary text-primary'
          : 'border-transparent text-neutral-500 hover:text-neutral-700',
      ]"
      @click="$emit('update:modelValue', tab.key)"
    >
      {{ tab.label }}
    </button>
  </div>
</template>
