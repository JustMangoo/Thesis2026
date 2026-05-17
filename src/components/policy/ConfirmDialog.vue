<script setup>
defineProps({
  modelValue: Boolean,
  title: { type: String, default: 'Confirm' },
  body: String,
  confirmLabel: { type: String, default: 'Confirm' },
  confirmVariant: { type: String, default: 'danger' },
})
const emit = defineEmits(['update:modelValue', 'confirm', 'cancel'])
function cancel() { emit('cancel'); emit('update:modelValue', false) }
function confirm() { emit('confirm'); emit('update:modelValue', false) }
</script>

<template>
  <AppDialog :model-value="modelValue" :title="title" @update:model-value="$emit('update:modelValue', $event)">
    <p class="text-sm text-neutral-600" v-html="body" />
    <template #footer>
      <AppButton variant="secondary" size="sm" @click="cancel">Cancel</AppButton>
      <AppButton :variant="confirmVariant" size="sm" @click="confirm">{{ confirmLabel }}</AppButton>
    </template>
  </AppDialog>
</template>
