<script setup>
defineProps({
  label: String,
  variant: { type: String, default: 'neutral' },
  active: Boolean,
})
defineEmits(['click'])

const variantClasses = {
  neutral: 'bg-neutral-100 text-neutral-500',
  danger: 'bg-danger-light text-danger',
  warning: 'bg-warning-light text-warning',
  success: 'bg-success-light text-success',
}
</script>

<template>
  <button :class="[
    'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium transition-colors',
    active ? 'bg-primary-light text-primary' : variantClasses[variant],
  ]" @click="$emit('click')">
    <slot name="icon" />
    {{ label }}
  </button>
</template>
