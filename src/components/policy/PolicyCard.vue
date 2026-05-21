<script setup>
import { ref, computed } from 'vue'
import { useUiStore } from '@/stores/ui.js'
import { usePoliciesStore } from '@/stores/policies.js'
import VersionRow from './VersionRow.vue'
import { ChevronDown, Settings } from '@lucide/vue'

const props = defineProps({ policy: Object, expanded: Boolean })
const uiStore = useUiStore()
const store = usePoliciesStore()

const owner = computed(() => store.members.find(m => m.id === props.policy.owner_id) ?? null)
defineEmits(['toggle'])

const activeVersion = computed(() => props.policy.versions.find(v => v.status === 'active'))
const draftVersion = computed(() => props.policy.versions.find(v => v.status === 'draft'))
const policyStatus = computed(() => activeVersion.value ? 'active' : 'inactive')

const signedCount = computed(() => {
  if (!activeVersion.value) return 0
  return activeVersion.value.signing_records.filter(r => r.status === 'signed').length
})

const totalReceivers = computed(() => props.policy.receivers.length)

const lastUpdated = computed(() => {
  const d = new Date(props.policy.updated_at)
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' }).replace(',', '')
})
</script>

<template>
  <div class="bg-white border border-neutral-200 rounded-sm">
    <div class="px-4 py-3 flex items-center gap-3">
      <button class="text-neutral-400 hover:text-neutral-600 flex-shrink-0" @click="$emit('toggle')">
        <ChevronDown :class="['w-5 h-5 transition-transform', expanded ? 'rotate-0' : '-rotate-90']" />
      </button>

      <div class="flex-2 min-w-0 flex flex-col">
        <div class=" flex gap-2">
          <span class="font-semibold text-neutral-900 truncate">{{ policy.title }}</span>
          <AppBadge :status="policyStatus">{{ policyStatus === 'active' ? 'Active' : 'Inactive' }}</AppBadge>
        </div>
        <span class="text-xs text-neutral-400">Last update {{ lastUpdated }}</span>
      </div>

      <div class="flex-1 flex justify-center">
        <AppProgressBar v-if="activeVersion" :value="signedCount" :max="totalReceivers" class="w-40" />
      </div>
      <div class="flex-1 flex justify-center">
        <AppAvatar :name="owner?.name ?? ''" />
      </div>
      <div class="flex-shrink-0">
        <AppButton variant="ghost" size="sm" @click="uiStore.openManageDrawer(policy.id, 'general')">
          <Settings class="w-4 h-4" />
          Manage
        </AppButton>
      </div>
    </div>


    <div v-if="expanded">
      <VersionRow v-if="activeVersion" :version="activeVersion" :policy-id="policy.id" />
      <VersionRow v-if="draftVersion" :version="draftVersion" :policy-id="policy.id" />
    </div>
  </div>
</template>
