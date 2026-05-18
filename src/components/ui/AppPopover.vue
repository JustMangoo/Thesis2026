<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    required: true,
    // [{ label: String, action: Function, variant: 'default' | 'danger' | 'disabled' }]
  },
  width: { type: String, default: 'w-40' },
  align: { type: String, default: 'right' }, // 'right' | 'left'
})

const open = ref(false)
const el = ref(null)

function handleOutsideClick(e) {
  if (el.value && !el.value.contains(e.target)) open.value = false
}

onMounted(() => document.addEventListener('click', handleOutsideClick))
onBeforeUnmount(() => document.removeEventListener('click', handleOutsideClick))

function select(item) {
  if (item.variant === 'disabled') return
  item.action?.()
  open.value = false
}
</script>

<template>
  <div ref="el" class="relative">
    <slot :toggle="() => open = !open" :open="open" />
    <div
      v-if="open"
      :class="[
        'absolute mt-1 bg-white rounded-sm shadow-lg border border-neutral-200 z-10 py-1',
        width,
        align === 'right' ? 'right-0' : 'left-0',
      ]"
    >
      <button
        v-for="item in items"
        :key="item.label"
        :disabled="item.variant === 'disabled'"
        :class="[
          'w-full text-left px-3 py-2 text-sm',
          item.variant === 'danger'    ? 'text-danger hover:bg-neutral-50' :
          item.variant === 'disabled'  ? 'text-neutral-400 cursor-not-allowed' :
                                         'text-neutral-700 hover:bg-neutral-50',
        ]"
        @click="select(item)"
      >{{ item.label }}</button>
    </div>
  </div>
</template>
