<script setup>
defineProps({ variant: { type: String, default: 'info' } })

const variantClasses = {
  info: 'bg-info-light text-info border-info',
  warning: 'bg-warning-light text-warning border-warning',
  danger: 'bg-danger-light text-danger border-danger',
  neutral: 'bg-neutral-100 text-neutral-500 border-neutral-300',
}
</script>

<template>
  <div :class="['flex items-center gap-3 px-4 py-3 rounded-sm border text-sm font-medium', variantClasses[variant]]">
    <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        d="M12 15h.01M12 9v4m9 3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <slot />
  </div>
</template>
