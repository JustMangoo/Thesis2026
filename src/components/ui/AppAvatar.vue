<script setup>
defineProps({ name: { type: String, default: '' }, size: { type: String, default: 'sm' } })

const sizeClass = { sm: 'w-8 h-8 text-xs', md: 'w-10 h-10 text-sm' }
</script>

<template>
  <div :class="['rounded-full bg-primary-light text-primary font-semibold flex items-center justify-center flex-shrink-0', sizeClass[size]]">
    {{ name.slice(0, 2).toUpperCase() }}
  </div>
</template>
