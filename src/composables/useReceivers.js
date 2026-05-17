import { usePoliciesStore } from '@/stores/policies'

export function useReceivers() {
  const store = usePoliciesStore()
  return {
    addReceiver: store.addReceiver,
    removeReceiver: store.removeReceiver,
    organizations: store.organizations,
  }
}
