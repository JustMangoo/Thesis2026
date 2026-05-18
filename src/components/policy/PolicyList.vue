<script setup>
import PolicyCard from './PolicyCard.vue'
defineProps({ policies: { type: Array, default: () => [] } })
</script>

<template>
  <div class="flex flex-col bg-white border rounded-lg border-border-default p-section gap-inner">
    <PolicyCard v-for="policy in policies" :key="policy.id" :policy="policy" />
  </div>
</template>
