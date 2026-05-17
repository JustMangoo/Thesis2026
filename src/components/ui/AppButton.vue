<script setup>
defineProps({
  variant: { type: String, default: 'primary' },
  size: { type: String, default: 'md' },
  loading: Boolean,
  disabled: Boolean,
})

const variantClasses = {
  primary: 'bg-primary text-white hover:bg-primary-dark',
  secondary: 'border border-primary text-primary bg-white hover:bg-primary-light',
  ghost: 'text-primary bg-transparent hover:bg-primary-light',
  danger: 'bg-danger text-white hover:opacity-90',
}

const sizeClasses = {
  sm: 'text-xs px-3 py-1.5',
  md: 'text-sm px-4 py-2',
  lg: 'text-base px-5 py-2.5',
}
</script>

<template>
  <button
    :class="[
      'inline-flex items-center gap-1.5 rounded-md font-medium transition-colors cursor-pointer',
      variantClasses[variant],
      sizeClasses[size],
      (disabled || loading) ? 'opacity-50 cursor-not-allowed' : '',
    ]"
    :disabled="disabled || loading"
  >
    <svg v-if="loading" class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
    </svg>
    <slot />
  </button>
</template>
