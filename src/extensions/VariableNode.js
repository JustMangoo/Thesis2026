import { Node, mergeAttributes } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import { defineComponent, h } from 'vue'

const VariablePill = defineComponent({
  props: { node: Object },
  setup(props) {
    return () => h(
      'span',
      {
        class: 'inline-flex items-center px-2 py-0.5 rounded-full border border-primary text-primary text-xs font-medium select-none mx-0.5',
        contenteditable: 'false',
      },
      props.node.attrs.label || props.node.attrs.variableType
    )
  },
})

export const VariableNode = Node.create({
  name: 'variableNode',
  group: 'inline',
  inline: true,
  atom: true,

  addAttributes() {
    return {
      variableType: { default: 'supplier' },
      label: { default: 'supplier_name' },
    }
  },

  parseHTML() {
    return [{ tag: 'span[data-variable]' }]
  },

  renderHTML({ HTMLAttributes }) {
    return ['span', mergeAttributes(HTMLAttributes, { 'data-variable': true }), HTMLAttributes.label || '']
  },

  addNodeView() {
    return VueNodeViewRenderer(VariablePill)
  },
})
