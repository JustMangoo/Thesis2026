<script setup>
import { onMounted } from 'vue'
import AppSidebar from '@/components/AppSidebar.vue'
import { usePoliciesStore } from '@/stores/policies.js'

const store = usePoliciesStore()
onMounted(() => store.fetchAll())
</script>

<template>
  <div class="flex h-screen bg-neutral-50 overflow-hidden">
    <AppSidebar />
    <main class="flex-1 overflow-y-auto">
      <router-view />
    </main>
  </div>
</template>
