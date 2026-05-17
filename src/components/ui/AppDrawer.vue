<script setup>
import { onMounted, onUnmounted } from 'vue'
import { X } from '@lucide/vue'

const props = defineProps({
  modelValue: Boolean,
  title: String,
  width: { type: String, default: '520px' },
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
      <div v-if="modelValue" class="fixed inset-0 bg-black/30 z-40" @click="close" />
    </transition>
    <transition name="slide-right">
      <div
        v-if="modelValue"
        :style="{ width }"
        class="fixed top-0 right-0 h-full bg-white shadow-2xl z-50 flex flex-col"
      >
        <div class="flex items-center justify-between px-6 py-4 border-b border-neutral-200 flex-shrink-0">
          <h2 class="text-lg font-semibold text-neutral-900">{{ title }}</h2>
          <button class="text-neutral-400 hover:text-neutral-600 transition-colors" @click="close">
            <X class="w-5 h-5" />
          </button>
        </div>
        <div class="flex-1 overflow-y-auto">
          <slot />
        </div>
        <div v-if="$slots.footer" class="flex-shrink-0 px-6 py-4 border-t border-neutral-200 flex items-center justify-end gap-3">
          <slot name="footer" />
        </div>
      </div>
    </transition>
  </teleport>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.slide-right-enter-active, .slide-right-leave-active { transition: transform 0.25s ease; }
.slide-right-enter-from, .slide-right-leave-to { transform: translateX(100%); }
</style>
