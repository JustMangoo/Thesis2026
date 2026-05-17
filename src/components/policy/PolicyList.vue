<script setup>
import PolicyCard from './PolicyCard.vue'
defineProps({ policies: { type: Array, default: () => [] } })
</script>

<template>
  <div>
    <PolicyCard v-for="policy in policies" :key="policy.id" :policy="policy" />
  </div>
</template>
