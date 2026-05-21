<script setup>
import { ref, computed, watchEffect } from 'vue'
import PolicyCard from './PolicyCard.vue'
defineProps({ policies: { type: Array, default: () => [] } })
const openID = ref(null)
watchEffect(() => console.log('openId changed:', openID.value))
</script>

<template>
  <div class="flex flex-col bg-white border rounded-lg border-border-default p-section gap-inner">
    <PolicyCard 
      v-for="policy in policies" 
      :key="policy.id" 
      :expanded="openID === policy.id" 
      :policy="policy"
      @toggle="openID = openID === policy.id ? null : policy.id" />
  </div>
</template>
