<script setup>
import { ref } from 'vue'
import { usePolicies } from '@/composables/usePolicies.js'
import KpiBar from '@/components/policy/KpiBar.vue'
import PolicyList from '@/components/policy/PolicyList.vue'
import ManageDrawer from '@/components/policy/ManageDrawer.vue'
import VersionDrawer from '@/components/policy/VersionDrawer.vue'
import { Home, CirclePlus, ChevronDown } from '@lucide/vue'

const { policies, kpis, createPolicy } = usePolicies()

const showAddMenu = ref(false)

function handleAddPolicy() {
  createPolicy('New Policy')
  showAddMenu.value = false
}
</script>

<template>
  <div class="min-h-full bg-neutral-50">
    <div class="max-w-5xl mx-auto px-8 py-8">
      <div class="flex items-start justify-between mb-6">
        <div>
          <h1 class="text-3xl font-bold text-neutral-900">Policies</h1>
          <nav class="flex items-center gap-1.5 text-xs text-neutral-400 mt-1">
            <Home class="w-3.5 h-3.5" />
            <span>›</span>
            <span>Supply Chain</span>
            <span>›</span>
            <span class="text-neutral-700 font-medium">Policies</span>
          </nav>
        </div>

        <div class="relative">
          <button
            class="inline-flex items-center gap-2 bg-primary text-white rounded-lg px-4 py-2.5 text-sm font-semibold hover:bg-primary-dark transition-colors"
            @click="showAddMenu = !showAddMenu"
          >
            <CirclePlus class="w-4 h-4" />
            Add policy
            <span class="w-px h-4 bg-white/30 mx-0.5"></span>
            <ChevronDown class="w-4 h-4" />
          </button>
          <div v-if="showAddMenu" class="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-neutral-200 z-10 py-1">
            <button class="w-full text-left px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50" @click="handleAddPolicy">Blank policy</button>
            <button class="w-full text-left px-4 py-2 text-sm text-neutral-400 cursor-not-allowed">Templates</button>
            <button class="w-full text-left px-4 py-2 text-sm text-neutral-400 cursor-not-allowed">Generate from PDF</button>
          </div>
        </div>
      </div>

      <KpiBar :kpis="kpis" />

      <PolicyList :policies="policies" />
    </div>

    <ManageDrawer />
    <VersionDrawer />
  </div>
</template>
