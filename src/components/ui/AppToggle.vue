<script setup>
defineProps({
  modelValue: Boolean,
  label: String,
  description: String,
  disabled: Boolean,
})
defineEmits(['update:modelValue'])
</script>

<template>
  <div class="flex items-start gap-3">
    <button
      type="button"
      role="switch"
      :aria-checked="modelValue"
      :disabled="disabled"
      :class="[
        'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1',
        modelValue ? 'bg-primary' : 'bg-neutral-200',
        disabled ? 'opacity-50 cursor-not-allowed' : '',
      ]"
      @click="!disabled && $emit('update:modelValue', !modelValue)"
    >
      <span
        :class="[
          'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
          modelValue ? 'translate-x-5' : 'translate-x-0',
        ]"
      />
    </button>
    <div>
      <p v-if="label" class="text-sm font-medium text-neutral-700">{{ label }}</p>
      <p v-if="description" class="text-xs text-neutral-500 mt-0.5">{{ description }}</p>
    </div>
  </div>
</template>
