<script setup>
import { computed } from 'vue'
import { usePoliciesStore } from '@/stores/policies.js'

const props = defineProps({ versionId: String, readonly: Boolean })
const store = usePoliciesStore()

const result = computed(() => store.getVersionById(props.versionId))
const version = computed(() => result.value?.version)

function update(field, val) { store.updateVersion(props.versionId, { [field]: val }) }
</script>

<template>
  <div class="p-6 space-y-6">
    <h3 class="text-base font-semibold text-neutral-900">Settings</h3>

    <div class="space-y-5">
      <div>
        <p class="text-sm font-semibold text-neutral-700 mb-1">Require e-signature</p>
        <p class="text-xs text-neutral-500 mb-2">Suppliers must electronically sign this version before it counts as accepted.</p>
        <AppToggle
          :model-value="version?.require_esignature"
          :disabled="readonly"
          @update:model-value="update('require_esignature', $event)"
        />
      </div>

      <div>
        <p class="text-sm font-semibold text-neutral-700 mb-1">Numbered sections</p>
        <p class="text-xs text-neutral-500 mb-2">Display section numbers in the document</p>
        <AppToggle
          :model-value="version?.numbered_sections"
          :disabled="readonly"
          @update:model-value="update('numbered_sections', $event)"
        />
      </div>

      <div>
        <p class="text-sm font-semibold text-neutral-700 mb-1">Alternative documentation</p>
        <p class="text-xs text-neutral-500 mb-2">Suppliers can upload supporting documents alongside their signature</p>
        <AppSelect
          :model-value="version?.alternative_documentation"
          :disabled="readonly"
          :options="[
            { value: 'none', label: 'No upload' },
            { value: 'optional', label: 'Optional' },
            { value: 'required', label: 'Required' },
          ]"
          @update:model-value="update('alternative_documentation', $event)"
        />
      </div>

      <div>
        <p class="text-sm font-semibold text-neutral-700 mb-1">Styled PDF version</p>
        <p class="text-xs text-neutral-500 mb-2">Upload a branded PDF to be attached alongside this version when sent to suppliers.</p>
        <div class="border-2 border-dashed border-neutral-200 rounded-md p-6 flex flex-col items-center justify-center gap-2 text-center">
          <svg class="w-8 h-8 text-primary-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
          </svg>
          <p class="text-sm text-neutral-500">
            <span class="text-primary cursor-pointer hover:underline">Upload a file</span>
            <span> or drag and drop</span>
          </p>
          <p class="text-xs text-neutral-400">PDF up to 10MB</p>
        </div>
      </div>
    </div>
  </div>
</template>
