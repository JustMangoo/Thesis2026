<script setup>
import { computed, ref } from 'vue'
import { usePoliciesStore } from '@/stores/policies.js'
import { VueDraggable } from 'vue-draggable-plus'
import PolicyEditor from './PolicyEditor.vue'

const props = defineProps({ versionId: String, readonly: Boolean })
const store = usePoliciesStore()

const result = computed(() => store.getVersionById(props.versionId))
const version = computed(() => result.value?.version)
const sections = computed({
  get: () => version.value?.sections ?? [],
  set: (val) => {
    val.forEach((s, i) => store.updateSection(props.versionId, s.id, { order_index: i }))
  },
})

function addSection() { store.addSection(props.versionId) }
function removeSection(id) { store.removeSection(props.versionId, id) }
function updateSectionTitle(id, title) { store.updateSection(props.versionId, id, { title }) }
function updateSectionContent(id, content) { store.updateSection(props.versionId, id, { content }) }
function updateFootnote(id, footnote) { store.updateSection(props.versionId, id, { footnote }) }

const showFootnote = ref({})
function toggleFootnote(id) { showFootnote.value[id] = !showFootnote.value[id] }
</script>

<template>
  <div class="p-6">
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-base font-semibold text-neutral-900">Content</h3>
      <AppButton variant="secondary" size="sm">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
        </svg>
        Preview
      </AppButton>
    </div>

    <VueDraggable v-model="sections" handle=".drag-handle" :disabled="readonly" class="space-y-3">
      <div
        v-for="(section, idx) in sections"
        :key="section.id"
        class="border border-neutral-200 rounded-md overflow-hidden"
      >
        <div class="flex items-center gap-2 px-3 py-2 bg-neutral-50 border-b border-neutral-100">
          <span v-if="!readonly" class="drag-handle cursor-grab text-neutral-300 hover:text-neutral-500">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 6a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm8 0a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM8 12a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm8 0a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM8 18a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm8 0a1.5 1.5 0 110 3 1.5 1.5 0 010-3z"/>
            </svg>
          </span>
          <span v-if="version?.numbered_sections" class="text-sm font-medium text-neutral-500 w-5">{{ idx + 1 }}.</span>
          <input
            :value="section.title"
            :disabled="readonly"
            placeholder="Heading"
            class="flex-1 text-sm font-medium text-neutral-700 bg-transparent focus:outline-none placeholder-neutral-400 disabled:cursor-default"
            @input="updateSectionTitle(section.id, $event.target.value)"
          />
          <button v-if="!readonly" class="text-neutral-300 hover:text-danger transition-colors" @click="removeSection(section.id)">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
            </svg>
          </button>
        </div>

        <PolicyEditor
          :model-value="section.content"
          :editable="!readonly"
          @update:model-value="updateSectionContent(section.id, $event)"
        />

        <div v-if="section.footnote || showFootnote[section.id]" class="px-3 py-2 border-t border-neutral-100">
          <textarea
            :value="section.footnote"
            :disabled="readonly"
            placeholder="Add footnote..."
            rows="2"
            class="w-full text-xs text-neutral-500 bg-transparent resize-none focus:outline-none placeholder-neutral-400 disabled:cursor-default"
            @input="updateFootnote(section.id, $event.target.value)"
          />
        </div>

        <div v-if="!readonly && !section.footnote && !showFootnote[section.id]" class="px-3 py-2 border-t border-neutral-100">
          <button class="text-xs text-primary hover:underline" @click="toggleFootnote(section.id)">+ Add footnote</button>
        </div>
      </div>
    </VueDraggable>

    <button
      v-if="!readonly"
      class="mt-3 w-full py-2.5 border border-dashed border-neutral-300 rounded-md text-sm text-neutral-500 hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-1"
      @click="addSection"
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
      </svg>
      Add new section
    </button>
  </div>
</template>
