<script setup>
import { computed } from 'vue'
import { useUiStore } from '@/stores/ui.js'
import { usePoliciesStore } from '@/stores/policies.js'
import ManageDrawerGeneral from './ManageDrawerGeneral.vue'
import ManageDrawerReceivers from './ManageDrawerReceivers.vue'

const uiStore = useUiStore()
const store = usePoliciesStore()

const policy = computed(() => store.getPolicyById(uiStore.manageDrawerPolicyId))
const tab = computed({
  get: () => uiStore.manageDrawerTab,
  set: val => { uiStore.manageDrawerTab = val },
})
const tabs = [{ key: 'general', label: 'General' }, { key: 'receivers', label: 'Receivers' }]
</script>

<template>
  <AppDrawer
    :model-value="uiStore.manageDrawerOpen"
    :title="policy?.title ?? 'Policy'"
    @update:model-value="uiStore.closeManageDrawer()"
  >
    <AppTabs v-model="tab" :tabs="tabs" class="px-6" />
    <ManageDrawerGeneral v-if="tab === 'general'" :policy-id="uiStore.manageDrawerPolicyId" />
    <ManageDrawerReceivers v-else :policy-id="uiStore.manageDrawerPolicyId" />
    <template #footer>
      <AppButton variant="secondary" @click="uiStore.closeManageDrawer()">Cancel</AppButton>
      <AppButton variant="primary" @click="uiStore.closeManageDrawer()">Save</AppButton>
    </template>
  </AppDrawer>
</template>
