import { createRouter, createWebHistory } from 'vue-router'
import PoliciesView from '@/views/PoliciesView.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/policies' },
    { path: '/policies', name: 'policies', component: PoliciesView },
    { path: '/suppliers', name: 'suppliers', component: { template: '<div class="p-8 text-neutral-500">Supplier overview — coming soon</div>' } },
    ...['/dashboard','/connections','/applications','/assets','/tasks','/surveys','/due-diligence','/reports','/messages','/notifications'].map(path => ({
      path,
      component: { template: `<div class="p-8 text-neutral-500 capitalize">${path.slice(1).replace(/-/g,' ')} — coming soon</div>` },
    })),
  ],
})
