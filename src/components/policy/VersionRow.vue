<script setup>
import { ref } from 'vue'
import { useUiStore } from '@/stores/ui.js'
import ReceiverChips from './ReceiverChips.vue'
import { Eye, Pencil, MoreVertical } from '@lucide/vue'

const props = defineProps({
  version: Object,
  policyId: String,
})

const uiStore = useUiStore()
const showOverflow = ref(false)
</script>

<template>
  <div class="px-4 py-3 border-t border-neutral-100 flex items-center gap-4">
    <span class="text-sm font-medium text-neutral-700 w-16 flex-shrink-0">{{ version.version_number }}</span>
    <AppBadge :status="version.status">{{ version.status }}</AppBadge>

    <div class="flex-1">
      <ReceiverChips
        v-if="version.status === 'active'"
        :signing-records="version.signing_records"
        :policy-id="policyId"
      />
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
        <div class="relative">
          <button
            class="p-1.5 text-neutral-400 hover:text-neutral-600 rounded-md hover:bg-neutral-100"
            @click="showOverflow = !showOverflow"
          >
            <MoreVertical class="w-4 h-4" />
          </button>
          <div v-if="showOverflow" class="absolute right-0 mt-1 w-36 bg-white rounded-md shadow-lg border border-neutral-200 z-10 py-1">
            <button class="w-full text-left px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50" @click="showOverflow = false">Duplicate</button>
            <button class="w-full text-left px-3 py-2 text-sm text-danger hover:bg-neutral-50" @click="showOverflow = false">Delete draft</button>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
