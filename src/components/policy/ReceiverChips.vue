<script setup>
import { computed } from 'vue'
import { useUiStore } from '@/stores/ui.js'
import { XCircle, AlertCircle, CircleCheck, Clock } from '@lucide/vue'

const props = defineProps({
  signingRecords: { type: Array, default: () => [] },
  policyId: String,
})

const uiStore = useUiStore()

const counts = computed(() => ({
  rejected: props.signingRecords.filter(r => r.status === 'rejected').length,
  needs_review: props.signingRecords.filter(r => r.status === 'needs_review').length,
  signed: props.signingRecords.filter(r => r.status === 'signed').length,
  pending: props.signingRecords.filter(r => r.status === 'pending').length,
}))

const chips = computed(() => [
  { key: 'rejected', label: 'rejected', variant: 'danger', icon: XCircle },
  { key: 'needs_review', label: 'need review', variant: 'warning', icon: AlertCircle },
  { key: 'signed', label: 'signed', variant: 'success', icon: CircleCheck },
  { key: 'pending', label: 'pending', variant: 'neutral', icon: Clock },
].filter(c => counts.value[c.key] > 0))
</script>

<template>
  <div class="flex items-start flex-col gap-1">
    <span class="text-xs text-neutral-500">Receivers</span>
    <div class="flex-wrap flex items-center gap-tight">
      <AppChip v-for="chip in chips" :key="chip.key" :label="`${counts[chip.key]} ${chip.label}`"
        :variant="chip.variant">
        <template #icon>
          <component :is="chip.icon" class="w-3 h-3" />
        </template>
      </AppChip>

      <button class="text-xs text-primary hover:underline font-medium"
        @click="uiStore.openManageDrawer(policyId, 'receivers')">
        View all →
      </button>
    </div>
  </div>
</template>
