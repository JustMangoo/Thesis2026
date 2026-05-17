<script setup>
import { ref, computed } from 'vue'
import { usePoliciesStore } from '@/stores/policies.js'
import { useUiStore } from '@/stores/ui.js'

const props = defineProps({ policyId: String })
const store = usePoliciesStore()
const uiStore = useUiStore()

const policy = computed(() => store.getPolicyById(props.policyId))
const activeVersion = computed(() => policy.value?.versions.find(v => v.status === 'active'))
const draftVersion = computed(() => policy.value?.versions.find(v => v.status === 'draft'))
const historyVersions = computed(() => policy.value?.versions.filter(v => v.status === 'archived') ?? [])

const reminderPeriod = computed({
  get: () => policy.value?.reminder_period_days ?? '',
  set: val => store.updatePolicy(props.policyId, { reminder_period_days: Number(val) }),
})

const historyPage = ref(1)
const perPage = 3
const paginatedHistory = computed(() => historyVersions.value.slice((historyPage.value - 1) * perPage, historyPage.value * perPage))
const totalHistoryPages = computed(() => Math.max(1, Math.ceil(historyVersions.value.length / perPage)))

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' })
}

function publishDraft() {
  if (draftVersion.value) store.publishVersion(draftVersion.value.id)
}
</script>

<template>
  <div class="p-6 space-y-6">
    <section>
      <h3 class="text-base font-semibold text-neutral-900 mb-3">Current</h3>
      <div class="space-y-2">
        <div v-if="activeVersion" class="flex items-center justify-between px-3 py-2.5 border border-neutral-200 rounded-md">
          <div class="flex items-center gap-2">
            <span class="text-sm font-medium text-neutral-700">{{ activeVersion.version_number }}</span>
            <AppBadge status="active">Active</AppBadge>
            <span class="text-xs text-neutral-400">Created {{ formatDate(activeVersion.created_at) }}</span>
          </div>
          <AppButton variant="ghost" size="sm" @click="uiStore.openVersionDrawer(activeVersion.id, 'content')">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
            </svg>
            View
          </AppButton>
        </div>
        <div v-if="draftVersion" class="flex items-center justify-between px-3 py-2.5 border border-neutral-200 rounded-md">
          <div class="flex items-center gap-2">
            <span class="text-sm font-medium text-neutral-700">{{ draftVersion.version_number }}</span>
            <AppBadge status="draft">Draft</AppBadge>
            <span class="text-xs text-neutral-400">Created {{ formatDate(draftVersion.created_at) }}</span>
          </div>
          <div class="flex items-center gap-2">
            <AppButton variant="ghost" size="sm" @click="uiStore.openVersionDrawer(draftVersion.id, 'content')">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
              </svg>
              Edit
            </AppButton>
            <AppButton variant="primary" size="sm" @click="publishDraft">Publish</AppButton>
          </div>
        </div>
      </div>
    </section>

    <section>
      <h3 class="text-base font-semibold text-neutral-900 mb-3">Manage</h3>
      <div class="space-y-4">
        <div>
          <p class="text-sm font-medium text-neutral-700 mb-0.5">Owner</p>
          <p class="text-xs text-neutral-500 mb-2">Team member responsible for keeping this policy up to date</p>
          <AppSelect
            model-value=""
            placeholder="Select owner"
            :options="[]"
          />
        </div>
        <div>
          <p class="text-sm font-medium text-neutral-700 mb-0.5">Reminder period</p>
          <p class="text-xs text-neutral-500 mb-2">Days before unsigned receivers get an automatic reminder</p>
          <AppInput v-model="reminderPeriod" type="number" placeholder="Placeholder" suffix="days" />
        </div>
      </div>
    </section>

    <section>
      <div class="flex items-center justify-between mb-3">
        <h3 class="text-base font-semibold text-neutral-900">History</h3>
        <div class="flex items-center gap-2">
          <button class="p-1.5 text-neutral-400 hover:text-neutral-600 rounded-md hover:bg-neutral-100">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z"/>
            </svg>
          </button>
          <div class="flex items-center gap-1 text-xs text-neutral-500">
            <button :disabled="historyPage <= 1" class="p-1 disabled:opacity-40" @click="historyPage--">&#8249;</button>
            {{ historyPage }}/{{ totalHistoryPages }}
            <button :disabled="historyPage >= totalHistoryPages" class="p-1 disabled:opacity-40" @click="historyPage++">&#8250;</button>
          </div>
        </div>
      </div>
      <div class="space-y-2">
        <div
          v-for="ver in paginatedHistory" :key="ver.id"
          class="flex items-center justify-between px-3 py-2.5 border border-neutral-100 rounded-md"
        >
          <div>
            <span class="text-sm font-medium text-neutral-700">{{ ver.version_number }}</span>
            <span class="text-xs text-neutral-400 ml-2">Created {{ formatDate(ver.created_at) }}</span>
          </div>
          <AppButton variant="ghost" size="sm" @click="uiStore.openVersionDrawer(ver.id, 'content')">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
            </svg>
            View
          </AppButton>
        </div>
        <p v-if="historyVersions.length === 0" class="text-sm text-neutral-400 text-center py-2">No archived versions.</p>
      </div>
    </section>
  </div>
</template>
