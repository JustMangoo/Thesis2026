import { usePoliciesStore } from '@/stores/policies'
import { storeToRefs } from 'pinia'

export function useReceivers() {
  const store = usePoliciesStore()
  const { organizations } = storeToRefs(store)
  return {
    addReceiver: store.addReceiver,
    removeReceiver: store.removeReceiver,
    organizations,
  }
}
