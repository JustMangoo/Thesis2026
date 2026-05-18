<script setup>
import { onMounted, onUnmounted } from 'vue'
import { X } from '@lucide/vue'

const props = defineProps({
  modelValue: Boolean,
  title: String,
  maxWidth: { type: String, default: 'max-w-md' },
})
const emit = defineEmits(['update:modelValue'])
function close() { emit('update:modelValue', false) }
function onKeydown(e) { if (e.key === 'Escape') close() }
onMounted(() => document.addEventListener('keydown', onKeydown))
onUnmounted(() => document.removeEventListener('keydown', onKeydown))
</script>

<template>
  <teleport to="body">
    <transition name="fade">
      <div v-if="modelValue" class="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" @click.self="close">
        <div :class="['bg-white rounded-lg shadow-xl w-full', maxWidth]">
          <div class="flex items-center justify-between px-6 py-4 border-b border-neutral-200">
            <h3 class="text-base font-semibold text-neutral-900">{{ title }}</h3>
            <button class="text-neutral-400 hover:text-neutral-600" @click="close">
              <X class="w-5 h-5" />
            </button>
          </div>
          <div class="px-6 py-4"><slot /></div>
          <div v-if="$slots.footer" class="px-6 py-4 border-t border-neutral-200 flex justify-end gap-3">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.15s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
