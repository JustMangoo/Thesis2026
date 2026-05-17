import { usePoliciesStore } from '@/stores/policies'
import { storeToRefs } from 'pinia'

export function usePolicies() {
  const store = usePoliciesStore()
  const { policies, kpis, loading, organizations } = storeToRefs(store)
  return { policies, kpis, loading, organizations, ...store }
}
