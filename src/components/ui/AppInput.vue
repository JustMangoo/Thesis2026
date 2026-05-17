<script setup>
defineProps({
  modelValue: { type: [String, Number], default: '' },
  placeholder: String,
  type: { type: String, default: 'text' },
  disabled: Boolean,
  suffix: String,
})
defineEmits(['update:modelValue'])
</script>

<template>
  <div class="relative flex items-center">
    <input
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      class="w-full rounded-md border border-neutral-200 px-3 py-2 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-neutral-50 disabled:text-neutral-400"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <span v-if="suffix" class="absolute right-3 text-sm text-neutral-400">{{ suffix }}</span>
  </div>
</template>
