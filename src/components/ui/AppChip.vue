<script setup>
defineProps({
  label: String,
  variant: { type: String, default: 'neutral' },
  active: Boolean,
})
defineEmits(['click'])

const variantClasses = {
  neutral: 'bg-neutral-100 text-neutral-500 border-neutral-200',
  danger:  'bg-danger-light text-danger border-danger',
  warning: 'bg-warning-light text-warning border-warning',
  success: 'bg-success-light text-success border-success',
}
</script>

<template>
  <button
    :class="[
      'inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border transition-colors',
      active ? 'bg-primary-light text-primary border-primary' : variantClasses[variant],
    ]"
    @click="$emit('click')"
  >
    <slot name="icon" />
    {{ label }}
  </button>
</template>
