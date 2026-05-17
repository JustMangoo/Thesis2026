<script setup>
import { ref, computed } from 'vue'
import { usePoliciesStore } from '@/stores/policies.js'
import ConfirmDialog from './ConfirmDialog.vue'
import ReceiverFilterDialog from './ReceiverFilterDialog.vue'

const props = defineProps({ policyId: String })
const store = usePoliciesStore()

const policy = computed(() => store.getPolicyById(props.policyId))
const receivers = computed(() => policy.value?.receivers ?? [])

const confirmOpen = ref(false)
const filterOpen = ref(false)
const pendingDeleteId = ref(null)
const addSearchOpen = ref(false)
const searchQuery = ref('')

const pendingReceiver = computed(() => receivers.value.find(r => r.id === pendingDeleteId.value))

const availableOrgs = computed(() => {
  const existingIds = new Set(receivers.value.map(r => r.organization_id))
  return store.organizations.filter(o => !existingIds.has(o.id) && o.name.toLowerCase().includes(searchQuery.value.toLowerCase()))
})

function requestDelete(id) { pendingDeleteId.value = id; confirmOpen.value = true }
function confirmDelete() { store.removeReceiver(props.policyId, pendingDeleteId.value); pendingDeleteId.value = null }
function addOrg(org) { store.addReceiver(props.policyId, org); addSearchOpen.value = false; searchQuery.value = '' }

const page = ref(1)
const perPage = 10
const paginated = computed(() => receivers.value.slice((page.value - 1) * perPage, page.value * perPage))
const totalPages = computed(() => Math.max(1, Math.ceil(receivers.value.length / perPage)))
</script>

<template>
  <div class="p-6">
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-base font-semibold text-neutral-900">Receivers</h3>
      <div class="flex items-center gap-2">
        <AppButton variant="secondary" size="sm" @click="addSearchOpen = !addSearchOpen">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
          </svg>
          Add receiver
        </AppButton>
        <button class="p-1.5 text-neutral-400 hover:text-neutral-600 rounded-md hover:bg-neutral-100" @click="filterOpen = true">
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

    <div v-if="addSearchOpen" class="mb-4 p-3 border border-neutral-200 rounded-md">
      <AppInput v-model="searchQuery" placeholder="Search organizations..." class="mb-2" />
      <div class="space-y-1 max-h-40 overflow-y-auto">
        <button
          v-for="org in availableOrgs" :key="org.id"
          class="w-full flex items-center gap-2 px-2 py-1.5 text-sm text-left hover:bg-neutral-50 rounded"
          @click="addOrg(org)"
        >
          <AppAvatar :name="org.name" />
          {{ org.name }}
          <span class="text-xs text-neutral-400 ml-auto">{{ org.industry }}</span>
        </button>
        <p v-if="availableOrgs.length === 0" class="text-sm text-neutral-400 px-2 py-1">No organizations found</p>
      </div>
    </div>

    <div class="space-y-2">
      <div
        v-for="receiver in paginated" :key="receiver.id"
        class="flex items-center gap-3 px-3 py-2.5 border border-neutral-100 rounded-md"
      >
        <AppAvatar :name="receiver.org.name" />
        <span class="flex-1 text-sm font-medium text-neutral-700">{{ receiver.org.name }}</span>
        <button class="p-1 text-neutral-300 hover:text-danger transition-colors" @click="requestDelete(receiver.id)">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
          </svg>
        </button>
      </div>
      <p v-if="receivers.length === 0" class="text-sm text-neutral-400 text-center py-4">No receivers added yet.</p>
    </div>
  </div>

  <ConfirmDialog
    v-model="confirmOpen"
    title="Remove Receiver"
    :body="`Remove <strong>${pendingReceiver?.org?.name ?? ''}</strong> as a receiver? Their signing records will be preserved, but they will no longer receive future versions of this policy.`"
    confirm-label="Remove"
    confirm-variant="danger"
    @confirm="confirmDelete"
  />

  <ReceiverFilterDialog v-model="filterOpen" />
</template>
