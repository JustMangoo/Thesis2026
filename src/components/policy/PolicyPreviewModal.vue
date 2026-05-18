<script setup>
import { computed } from 'vue'
import { usePoliciesStore } from '@/stores/policies.js'
import PolicyEditor from './PolicyEditor.vue'

const props = defineProps({
  modelValue: Boolean,
  versionId: String,
})
const emit = defineEmits(['update:modelValue'])

const store = usePoliciesStore()
const result = computed(() => store.getVersionById(props.versionId))
const version = computed(() => result.value?.version)
const policy = computed(() => result.value?.policy)
const title = computed(() =>
  policy.value && version.value
    ? `${policy.value.title} ${version.value.version_number}`
    : ''
)
</script>

<template>
  <AppDialog
    :model-value="modelValue"
    :title="title"
    max-width="max-w-2xl"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <div v-if="version" class="max-h-[65vh] overflow-y-auto -mx-6 px-6 space-y-6">
      <div
        v-for="(section, idx) in version.sections"
        :key="section.id"
      >
        <h3 v-if="section.title" class="text-sm font-semibold text-neutral-900 mb-2">
          <span v-if="version.numbered_sections" class="mr-1">{{ idx + 1 }}.</span>
          {{ section.title }}
        </h3>
        <PolicyEditor :model-value="section.content" :editable="false" class="border-none"/>
        <p v-if="section.footnote" class="mt-1.5 text-xs text-neutral-400 italic border-t border-neutral-100 pt-1.5">
          {{ section.footnote }}
        </p>
      </div>

      <p v-if="!version.sections?.length" class="text-sm text-neutral-400 text-center py-8">
        No sections yet.
      </p>
    </div>

    <template #footer>
      <AppButton variant="primary" @click="emit('update:modelValue', false)">Close</AppButton>
    </template>
  </AppDialog>
</template>
