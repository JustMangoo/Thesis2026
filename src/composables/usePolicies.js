import { usePoliciesStore } from '@/stores/policies'
import { storeToRefs } from 'pinia'

export function usePolicies() {
  const store = usePoliciesStore()
  // storeToRefs keeps state/computed reactive; actions are pulled directly
  const { policies, kpis, loading, organizations } = storeToRefs(store)
  const { createPolicy, updatePolicy, getPolicyById, fetchAll } = store
  return { policies, kpis, loading, organizations, createPolicy, updatePolicy, getPolicyById, fetchAll }
}
