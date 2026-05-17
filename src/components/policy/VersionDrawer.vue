<script setup>
import { computed } from 'vue'
import { useUiStore } from '@/stores/ui.js'
import { usePoliciesStore } from '@/stores/policies.js'
import VersionDrawerContent from './VersionDrawerContent.vue'
import VersionDrawerSettings from './VersionDrawerSettings.vue'
import VersionDrawerReceivers from './VersionDrawerReceivers.vue'

const uiStore = useUiStore()
const store = usePoliciesStore()

const result = computed(() => store.getVersionById(uiStore.versionDrawerVersionId))
const version = computed(() => result.value?.version)
const policy = computed(() => result.value?.policy)

const readonly = computed(() => version.value?.status === 'active' || version.value?.status === 'archived')

const drawerTitle = computed(() => {
  if (!version.value || !policy.value) return ''
  return `${policy.value.title} › ${version.value.version_number}`
})

const tab = computed({
  get: () => uiStore.versionDrawerTab,
  set: val => { uiStore.versionDrawerTab = val },
})

const tabs = [
  { key: 'content', label: 'Content' },
  { key: 'settings', label: 'Settings' },
  { key: 'receivers', label: 'Receivers' },
]
</script>

<template>
  <AppDrawer
    :model-value="uiStore.versionDrawerOpen"
    :title="drawerTitle"
    width="600px"
    @update:model-value="uiStore.closeVersionDrawer()"
  >
    <div v-if="version">
      <AppTabs v-model="tab" :tabs="tabs" class="px-6" />

      <div v-if="readonly" class="px-6 pt-4">
        <AppAlert variant="warning">Read only — published versions cannot be edited.</AppAlert>
      </div>

      <VersionDrawerContent
        v-if="tab === 'content'"
        :version-id="uiStore.versionDrawerVersionId"
        :readonly="readonly"
      />
      <VersionDrawerSettings
        v-else-if="tab === 'settings'"
        :version-id="uiStore.versionDrawerVersionId"
        :readonly="readonly"
      />
      <VersionDrawerReceivers
        v-else
        :version-id="uiStore.versionDrawerVersionId"
      />
    </div>

    <template #footer>
      <AppButton variant="secondary" @click="uiStore.closeVersionDrawer()">Cancel</AppButton>
      <AppButton variant="primary" :disabled="readonly" @click="uiStore.closeVersionDrawer()">Save</AppButton>
    </template>
  </AppDrawer>
</template>
