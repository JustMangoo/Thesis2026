<script setup>
import { ref } from 'vue'
const props = defineProps({ modelValue: Boolean })
const emit = defineEmits(['update:modelValue', 'apply'])

const sortBy = ref('status')
const selectedStatuses = ref([])
const selectedIndustries = ref([])

const statuses = ['signed', 'pending', 'rejected', 'needs_review']
const industries = ['Manufacturing', 'Technology', 'Retail', 'Pharmaceutical']

function toggleStatus(s) {
  const idx = selectedStatuses.value.indexOf(s)
  idx >= 0 ? selectedStatuses.value.splice(idx, 1) : selectedStatuses.value.push(s)
}

function toggleIndustry(i) {
  const idx = selectedIndustries.value.indexOf(i)
  idx >= 0 ? selectedIndustries.value.splice(idx, 1) : selectedIndustries.value.push(i)
}

function clearAll() { selectedStatuses.value = []; selectedIndustries.value = []; sortBy.value = 'status' }
function apply() { emit('apply', { sortBy: sortBy.value, statuses: selectedStatuses.value, industries: selectedIndustries.value }); emit('update:modelValue', false) }
</script>

<template>
  <AppDialog :model-value="modelValue" title="Filter Receivers" @update:model-value="$emit('update:modelValue', $event)">
    <div class="space-y-4">
      <div>
        <p class="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-2">Sort by</p>
        <AppSelect v-model="sortBy" :options="[
          { value: 'status', label: 'Status' },
          { value: 'name', label: 'Company name' },
          { value: 'date_added', label: 'Date added' },
          { value: 'date_signed', label: 'Date signed' },
        ]" />
      </div>
      <div>
        <p class="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-2">Signing status</p>
        <div class="flex flex-wrap gap-2">
          <AppChip
            v-for="s in statuses" :key="s"
            :label="s.replace('_', ' ')"
            :active="selectedStatuses.includes(s)"
            @click="toggleStatus(s)"
          />
        </div>
      </div>
      <div>
        <p class="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-2">Industry</p>
        <div class="flex flex-wrap gap-2">
          <AppChip
            v-for="i in industries" :key="i"
            :label="i"
            :active="selectedIndustries.includes(i)"
            @click="toggleIndustry(i)"
          />
        </div>
      </div>
    </div>
    <template #footer>
      <AppButton variant="ghost" size="sm" @click="clearAll">Clear all</AppButton>
      <AppButton variant="primary" size="sm" @click="apply">Apply</AppButton>
    </template>
  </AppDialog>
</template>
