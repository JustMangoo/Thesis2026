<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import {
  LayoutGrid, Link2, Share2, AppWindow, Cloud,
  ClipboardCheck, FileText, ShieldCheck, BarChart2,
  MessageCircle, Bell, Search, ChevronLeft, MoreVertical,
} from '@lucide/vue'

const route = useRoute()
const collapsed = ref(false)

const navItems = [
  { label: 'Dashboard',     path: '/dashboard',    icon: LayoutGrid },
  { label: 'Supply Chain',  path: '/policies',     icon: Link2 },
  { label: 'Connections',   path: '/connections',  icon: Share2 },
  { label: 'Applications',  path: '/applications', icon: AppWindow },
  { label: 'Assets',        path: '/assets',       icon: Cloud },
  { label: 'Task Manager',  path: '/tasks',        icon: ClipboardCheck },
  { label: 'Surveys',       path: '/surveys',      icon: FileText },
  { label: 'Due Diligence', path: '/due-diligence',icon: ShieldCheck },
  { label: 'Reports',       path: '/reports',      icon: BarChart2 },
]

const bottomItems = [
  { label: 'Messages',      path: '/messages',     icon: MessageCircle },
  { label: 'Notifications', path: '/notifications',icon: Bell },
]

function isActive(path) {
  return route.path === path || (path === '/policies' && route.path.startsWith('/policies'))
}
</script>

<template>
  <aside
    :class="[
      'flex flex-col bg-white border-r border-neutral-200 h-screen flex-shrink-0 transition-all duration-200',
      collapsed ? 'w-16' : 'w-56',
    ]"
  >
    <!-- Logo -->
    <div class="flex items-center gap-2.5 px-4 py-5 flex-shrink-0">
      <div class="w-8 h-8 flex-shrink-0">
        <svg viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="16" fill="#7c3aed"/>
          <circle cx="16" cy="16" r="8" fill="#f97316"/>
          <circle cx="16" cy="16" r="4" fill="#fff"/>
        </svg>
      </div>
      <span v-if="!collapsed" class="text-xl font-bold text-neutral-900 tracking-tight">
        pr<span class="text-primary">o</span>uct
      </span>
    </div>

    <!-- Search -->
    <div v-if="!collapsed" class="px-3 mb-3 flex-shrink-0">
      <div class="flex items-center gap-2 bg-neutral-100 rounded-lg px-3 py-2">
        <Search class="w-4 h-4 text-neutral-400 flex-shrink-0" />
        <input
          type="text"
          placeholder="Search"
          class="bg-transparent text-sm text-neutral-600 placeholder-neutral-400 outline-none w-full"
        />
      </div>
    </div>

    <!-- Main nav -->
    <nav class="flex-1 px-2 space-y-0.5 overflow-y-auto">
      <router-link
        v-for="item in navItems"
        :key="item.path"
        :to="item.path"
        :class="[
          'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
          isActive(item.path)
            ? 'bg-primary-light text-primary'
            : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900',
        ]"
        :title="collapsed ? item.label : undefined"
      >
        <component :is="item.icon" class="w-5 h-5 flex-shrink-0" />
        <span v-if="!collapsed" class="truncate">{{ item.label }}</span>
      </router-link>
    </nav>

    <!-- Bottom nav items -->
    <div class="px-2 pb-2 space-y-0.5 flex-shrink-0">
      <router-link
        v-for="item in bottomItems"
        :key="item.path"
        :to="item.path"
        :class="[
          'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
          isActive(item.path)
            ? 'bg-primary-light text-primary'
            : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900',
        ]"
        :title="collapsed ? item.label : undefined"
      >
        <component :is="item.icon" class="w-5 h-5 flex-shrink-0" />
        <span v-if="!collapsed" class="truncate">{{ item.label }}</span>
      </router-link>
    </div>

    <!-- User profile -->
    <div class="mx-2 mb-3 mt-1 bg-primary-light rounded-xl p-3 flex items-center gap-2.5 flex-shrink-0">
      <div class="w-8 h-8 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
        PU
      </div>
      <div v-if="!collapsed" class="flex-1 min-w-0">
        <p class="text-sm font-semibold text-neutral-900 truncate">Username</p>
        <p class="text-xs text-neutral-500 truncate">Company</p>
      </div>
      <button v-if="!collapsed" class="text-neutral-400 hover:text-neutral-600 flex-shrink-0">
        <MoreVertical class="w-4 h-4" />
      </button>
    </div>

    <!-- Collapse toggle -->
    <button
      class="flex items-center justify-center py-2 mb-2 mx-2 rounded-lg text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 transition-colors"
      @click="collapsed = !collapsed"
    >
      <ChevronLeft :class="['w-4 h-4 transition-transform', collapsed ? 'rotate-180' : '']" />
    </button>
  </aside>
</template>
