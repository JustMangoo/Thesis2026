<script setup>
import { ref, watch } from 'vue'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'
import Underline from '@tiptap/extension-underline'
import Strike from '@tiptap/extension-strike'
import BulletList from '@tiptap/extension-bullet-list'
import OrderedList from '@tiptap/extension-ordered-list'
import ListItem from '@tiptap/extension-list-item'
import History from '@tiptap/extension-history'
import { VariableNode } from '@/extensions/VariableNode.js'

const props = defineProps({
  modelValue: Object,
  editable: { type: Boolean, default: true },
})
const emit = defineEmits(['update:modelValue'])

const showVarMenu = ref(false)

const editor = useEditor({
  content: props.modelValue,
  editable: props.editable,
  extensions: [Document, Paragraph, Text, Bold, Italic, Underline, Strike, BulletList, OrderedList, ListItem, History, VariableNode],
  onUpdate({ editor }) {
    emit('update:modelValue', editor.getJSON())
  },
  editorProps: {
    attributes: {
      class: 'prose prose-sm max-w-none min-h-[80px] px-3 py-2 focus:outline-none text-sm text-neutral-700',
    },
  },
})

watch(() => props.modelValue, (val) => {
  if (!editor.value) return
  const current = editor.value.getJSON()
  if (JSON.stringify(current) !== JSON.stringify(val)) {
    editor.value.commands.setContent(val, false)
  }
})

watch(() => props.editable, (val) => {
  editor.value?.setEditable(val)
})

function insertVariable(type) {
  const labels = { supplier: 'supplier_name', organization: 'organization_name' }
  editor.value?.chain().focus().insertContent({
    type: 'variableNode',
    attrs: { variableType: type, label: labels[type] },
  }).run()
  showVarMenu.value = false
}
</script>

<template>
  <div class="border border-neutral-200 rounded-sm overflow-hidden">
    <div v-if="editable"
      class="flex items-center gap-0.5 px-2 py-1.5 border-b border-neutral-100 bg-neutral-50 flex-wrap">
      <button
        v-for="[cmd, label] in [['toggleBold', 'B'], ['toggleItalic', 'I'], ['toggleUnderline', 'U'], ['toggleStrike', 'S']]"
        :key="cmd"
        class="w-7 h-7 flex items-center justify-center rounded text-sm font-medium text-neutral-600 hover:bg-neutral-200 transition-colors"
        :class="{ 'bg-neutral-200': editor?.isActive(cmd.replace('toggle', '').toLowerCase()) }"
        @click="editor?.chain().focus()[cmd]().run()">{{ label }}</button>

      <div class="w-px h-5 bg-neutral-200 mx-1" />

      <button class="w-7 h-7 flex items-center justify-center rounded text-neutral-600 hover:bg-neutral-200"
        @click="editor?.chain().focus().toggleBulletList().run()">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
        </svg>
      </button>
      <button class="w-7 h-7 flex items-center justify-center rounded text-neutral-600 hover:bg-neutral-200"
        @click="editor?.chain().focus().toggleOrderedList().run()">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M7 6h13M7 12h13M7 18h13M3 6h.01M3 12h.01M3 18h.01" />
        </svg>
      </button>

      <div class="w-px h-5 bg-neutral-200 mx-1" />

      <div class="relative">
        <button
          class="flex items-center gap-1 px-2 py-1 rounded text-xs text-neutral-600 hover:bg-neutral-200 font-medium"
          @click="showVarMenu = !showVarMenu">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7l3-3 3 3m0 10l-3 3-3-3" />
          </svg>
          Variables
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <div v-if="showVarMenu"
          class="absolute left-0 top-full mt-1 w-44 bg-white border border-neutral-200 rounded-sm shadow-lg z-10 py-1">
          <button class="w-full text-left px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
            @click="insertVariable('supplier')">Insert supplier</button>
          <button class="w-full text-left px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
            @click="insertVariable('organization')">Insert organization</button>
        </div>
      </div>
    </div>
    <EditorContent :editor="editor" />
  </div>
</template>

<style>
.ProseMirror p {
  margin: 0;
}

.ProseMirror {
  min-height: 80px;
}
</style>
