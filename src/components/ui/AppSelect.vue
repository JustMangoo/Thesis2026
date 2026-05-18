<script setup>
defineProps({
  modelValue: String,
  options: { type: Array, default: () => [] },
  placeholder: String,
  disabled: Boolean,
})
defineEmits(['update:modelValue'])
</script>

<template>
  <select :value="modelValue" :disabled="disabled"
    class="w-full rounded-sm border border-neutral-200 px-3 py-2 text-sm text-neutral-900 bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-neutral-50 disabled:text-neutral-400 appearance-none"
    @change="$emit('update:modelValue', $event.target.value)">
    <option v-if="placeholder" value="" disabled>{{ placeholder }}</option>
    <option v-for="opt in options" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
  </select>
</template>
