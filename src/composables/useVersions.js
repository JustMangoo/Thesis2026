import { usePoliciesStore } from '@/stores/policies'

export function useVersions() {
  const store = usePoliciesStore()
  return {
    getVersionById: store.getVersionById,
    getPolicyForVersion: store.getPolicyForVersion,
    updateVersion: store.updateVersion,
    publishVersion: store.publishVersion,
    addSection: store.addSection,
    updateSection: store.updateSection,
    removeSection: store.removeSection,
  }
}
