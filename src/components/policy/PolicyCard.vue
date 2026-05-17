<script setup>
import { ref, computed } from 'vue'
import { useUiStore } from '@/stores/ui.js'
import VersionRow from './VersionRow.vue'
import { ChevronDown, Pencil } from '@lucide/vue'

const props = defineProps({ policy: Object })
const uiStore = useUiStore()
const expanded = ref(true)

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
  <div class="bg-white border border-neutral-200 rounded-lg overflow-hidden mb-3">
    <div class="px-4 py-3 flex items-center gap-3">
      <button class="text-neutral-400 hover:text-neutral-600 flex-shrink-0" @click="expanded = !expanded">
        <ChevronDown :class="['w-5 h-5 transition-transform', expanded ? 'rotate-0' : '-rotate-90']" />
      </button>

      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-2">
          <span class="font-semibold text-neutral-900 truncate">{{ policy.title }}</span>
          <AppBadge :status="policyStatus">{{ policyStatus === 'active' ? 'Active' : 'Inactive' }}</AppBadge>
          <span class="text-xs text-neutral-400 ml-1">Last update {{ lastUpdated }}</span>
        </div>
      </div>

      <div class="flex items-center gap-4 flex-shrink-0">
        <AppProgressBar v-if="activeVersion" :value="signedCount" :max="totalReceivers" class="w-40" />
        <AppAvatar name="PU" />
        <AppButton variant="ghost" size="sm" @click="uiStore.openManageDrawer(policy.id, 'general')">
          <Pencil class="w-4 h-4" />
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
