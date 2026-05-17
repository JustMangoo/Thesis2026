<script setup>
import { computed, ref } from 'vue'
import { usePoliciesStore } from '@/stores/policies.js'
import { useUiStore } from '@/stores/ui.js'

const props = defineProps({ versionId: String })
const store = usePoliciesStore()
const uiStore = useUiStore()

const result = computed(() => store.getVersionById(props.versionId))
const version = computed(() => result.value?.version)
const policy = computed(() => result.value?.policy)
const records = computed(() => version.value?.signing_records ?? [])

const page = ref(1)
const perPage = 10
const paginated = computed(() => records.value.slice((page.value - 1) * perPage, page.value * perPage))
const totalPages = computed(() => Math.max(1, Math.ceil(records.value.length / perPage)))

function openManage() {
  if (policy.value) {
    uiStore.openManageDrawer(policy.value.id, 'receivers')
  }
}
</script>

<template>
  <div class="p-6">
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-base font-semibold text-neutral-900">Receivers</h3>
      <div class="flex items-center gap-2">
        <AppButton variant="secondary" size="sm" @click="openManage">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
          </svg>
          Manage receivers
        </AppButton>
        <button class="p-1.5 text-neutral-400 hover:text-neutral-600 rounded-md hover:bg-neutral-100">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z"/>
          </svg>
        </button>
        <div class="flex items-center gap-1 text-xs text-neutral-500">
          <button :disabled="page <= 1" class="p-1 disabled:opacity-40" @click="page--">&#8249;</button>
          {{ page }}/{{ totalPages }}
          <button :disabled="page >= totalPages" class="p-1 disabled:opacity-40" @click="page++">&#8250;</button>
        </div>
      </div>
    </div>

    <div class="space-y-2">
      <div
        v-for="record in paginated" :key="record.id"
        class="flex items-center gap-3 px-3 py-2.5 border border-neutral-100 rounded-md"
      >
        <AppAvatar :name="record.org.name" />
        <span class="flex-1 text-sm font-medium text-neutral-700">{{ record.org.name }}</span>
        <AppBadge :status="record.status">{{ record.status.replace('_', ' ') }}</AppBadge>
      </div>
      <p v-if="records.length === 0" class="text-sm text-neutral-400 text-center py-4">No receivers for this version.</p>
    </div>
  </div>
</template>
