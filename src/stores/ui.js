import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUiStore = defineStore('ui', () => {
  const manageDrawerOpen = ref(false)
  const manageDrawerPolicyId = ref(null)
  const manageDrawerTab = ref('general')

  const versionDrawerOpen = ref(false)
  const versionDrawerVersionId = ref(null)
  const versionDrawerTab = ref('content')

  function openManageDrawer(policyId, tab = 'general') {
    manageDrawerPolicyId.value = policyId
    manageDrawerTab.value = tab
    manageDrawerOpen.value = true
    versionDrawerOpen.value = false
  }

  function closeManageDrawer() {
    manageDrawerOpen.value = false
    manageDrawerPolicyId.value = null
  }

  function openVersionDrawer(versionId, tab = 'content') {
    versionDrawerVersionId.value = versionId
    versionDrawerTab.value = tab
    versionDrawerOpen.value = true
  }

  function closeVersionDrawer() {
    versionDrawerOpen.value = false
    versionDrawerVersionId.value = null
  }

  return {
    manageDrawerOpen, manageDrawerPolicyId, manageDrawerTab,
    versionDrawerOpen, versionDrawerVersionId, versionDrawerTab,
    openManageDrawer, closeManageDrawer,
    openVersionDrawer, closeVersionDrawer,
  }
})
