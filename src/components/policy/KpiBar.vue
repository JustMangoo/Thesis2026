<script setup>
import { useRouter } from 'vue-router'
import { FileText, Clock, AlertCircle, Ban } from '@lucide/vue'

const router = useRouter()
const props = defineProps({ kpis: Object })

const cells = [
  { key: 'totalPolicies', label: 'Total policies', icon: FileText, iconBg: 'bg-info-light', iconColor: 'text-info', clickable: false },
  { key: 'pendingSignatures', label: 'Pending signatures', icon: Clock, iconBg: 'bg-neutral-100', iconColor: 'text-neutral-400', clickable: true },
  { key: 'needReview', label: 'Need review', icon: AlertCircle, iconBg: 'bg-warning-light', iconColor: 'text-warning', clickable: false },
  { key: 'rejections', label: 'Rejections', icon: Ban, iconBg: 'bg-danger-light', iconColor: 'text-danger', clickable: true },
]
</script>

<template>
  <div class="bg-white border border-neutral-200 rounded-xl grid grid-cols-4 divide-x divide-neutral-200">
    <div v-for="cell in cells" :key="cell.key" :class="[
      'px-6 py-5 flex items-start justify-between',
      cell.clickable ? 'cursor-pointer hover:bg-neutral-50 transition-colors' : '',
    ]" @click="cell.clickable && router.push('/suppliers')">
      <div>
        <p class="text-3xl font-bold text-neutral-900">{{ kpis[cell.key] }}</p>
        <p class="text-sm text-neutral-500 mt-1">{{ cell.label }}</p>
      </div>
      <div :class="['w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0', cell.iconBg]">
        <component :is="cell.icon" :class="['w-5 h-5', cell.iconColor]" />
      </div>
    </div>
  </div>
</template>
