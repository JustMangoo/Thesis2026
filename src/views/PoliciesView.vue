<script setup>
import { usePolicies } from '@/composables/usePolicies.js'
import KpiBar from '@/components/policy/KpiBar.vue'
import PolicyList from '@/components/policy/PolicyList.vue'
import ManageDrawer from '@/components/policy/ManageDrawer.vue'
import VersionDrawer from '@/components/policy/VersionDrawer.vue'
import { Home, Plus, ChevronDown } from '@lucide/vue'

const { policies, kpis, createPolicy } = usePolicies()

const addPolicyItems = [
  { label: 'Blank policy',        action: () => createPolicy('New Policy') },
  { label: 'Templates',           variant: 'disabled' },
  { label: 'Generate from PDF',   variant: 'disabled' },
]
</script>

<template>
  <div class="min-h-full bg-neutral-50">
    <div class="max-w-5xl mx-auto px-8 py-8 flex flex-col gap-page">
      <div class="flex items-start justify-between">
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

        <AppPopover :items="addPolicyItems" width="w-48">
          <template #default="{ toggle }">
            <button
              class="inline-flex items-center gap-2 bg-primary text-white rounded-sm px-4 py-2.5 text-sm font-semibold hover:bg-primary-dark transition-colors"
              @click="toggle">
              <Plus class="w-4 h-4" />
              Add policy
              <span class="w-px h-4 bg-white/30 mx-0.5"></span>
              <ChevronDown class="w-4 h-4" />
            </button>
          </template>
        </AppPopover>
      </div>

      <KpiBar :kpis="kpis" />

      <PolicyList :policies="policies" />
    </div>

    <ManageDrawer />
    <VersionDrawer />
  </div>
</template>
