<script setup>
import { useUiStore } from '@/stores/ui.js'
import ReceiverChips from './ReceiverChips.vue'
import { Eye, Pencil, MoreVertical } from '@lucide/vue'

const props = defineProps({
  version: Object,
  policyId: String,
})

const uiStore = useUiStore()

const draftActions = [
  { label: 'Duplicate', action: () => { } },
  { label: 'Delete draft', variant: 'danger', action: () => { } },
]
</script>

<template>
  <div class="px-4 py-3 border-t border-neutral-100 flex items-center justify-between">
    <div class="flex items-center gap-2">
      <span class="text-sm font-medium text-neutral-700 flex-shrink-0">{{ version.version_number }}</span>
      <AppBadge :status="version.status">{{ version.status.charAt(0).toUpperCase() + version.status.slice(1) }}
      </AppBadge>
    </div>

    <div class="mx-4">
      <ReceiverChips v-if="version.status === 'active'" :signing-records="version.signing_records"
        :policy-id="policyId" />
    </div>

    <div class="flex items-center gap-2 flex-shrink-0">
      <template v-if="version.status === 'active'">
        <AppButton variant="ghost" size="sm" @click="uiStore.openVersionDrawer(version.id, 'content')">
          <Eye class="w-4 h-4" />
          View
        </AppButton>
      </template>
      <template v-else-if="version.status === 'draft'">
        <AppButton variant="ghost" size="sm" @click="uiStore.openVersionDrawer(version.id, 'content')">
          <Pencil class="w-4 h-4" />
          Edit
        </AppButton>
        <AppPopover :items="draftActions" width="w-36">
          <template #default="{ toggle }">
            <button class="p-1.5 text-neutral-400 hover:text-neutral-600 rounded-sm hover:bg-neutral-100"
              @click="toggle">
              <MoreVertical class="w-4 h-4" />
            </button>
          </template>
        </AppPopover>
      </template>
    </div>
  </div>
</template>
