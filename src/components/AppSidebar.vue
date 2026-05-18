<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import {
  LayoutDashboard, Link, Share2, AppWindow, Cloud,
  ClipboardCheck, FileText, ShieldCheck, BarChart2,
  MessageCircle, Bell, Search, ChevronLeft, MoreVertical,
} from '@lucide/vue'

const route = useRoute()
const collapsed = ref(false)

const navItems = [
  { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { label: 'Supply Chain', path: '/policies', icon: Link },
  { label: 'Connections', path: '/connections', icon: Share2 },
  { label: 'Applications', path: '/applications', icon: AppWindow },
  { label: 'Assets', path: '/assets', icon: Cloud },
  { label: 'Task Manager', path: '/tasks', icon: ClipboardCheck },
  { label: 'Surveys', path: '/surveys', icon: FileText },
  { label: 'Due Diligence', path: '/due-diligence', icon: ShieldCheck },
  { label: 'Reports', path: '/reports', icon: BarChart2 },
]

const bottomItems = [
  { label: 'Messages', path: '/messages', icon: MessageCircle },
  { label: 'Notifications', path: '/notifications', icon: Bell },
]

function isActive(path) {
  return route.path === path || (path === '/policies' && route.path.startsWith('/policies'))
}
</script>

<template>
  <aside :class="[
    'flex flex-col bg-white border-r border-neutral-200 h-screen flex-shrink-0 transition-all duration-200',
    collapsed ? 'w-16' : 'w-56',
  ]">
    <!-- Logo -->
    <div :class="[
      'flex items-center gap-2.5 flex-shrink-0 justify-center',
      collapsed ? 'px-2 py-4 justify-center' : 'px-4 py-5'
    ]">
      <svg class="h-8 w-auto flex-shrink-0" viewBox="0 0 127 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd"
          d="M34.4332 22.1572L57.4424 44.6269L34.4332 67.043L0 55.8352L11.4773 44.6269L34.4332 22.1572Z"
          fill="#8B5CF6" />
        <path fill-rule="evenodd" clip-rule="evenodd"
          d="M57.441 44.6267L34.4316 22.1573L57.441 -0.260254L80.3956 22.1573L57.441 44.6267Z" fill="#9333EA" />
        <path fill-rule="evenodd" clip-rule="evenodd" d="M80.398 22.1573L57.4434 -0.260254H103.354L80.398 22.1573Z"
          fill="#F43F5E" />
        <path fill-rule="evenodd" clip-rule="evenodd"
          d="M114.832 10.9493L126.309 22.1573L103.354 44.6267L91.8773 33.3656L80.3984 22.1573L103.354 -0.260254L114.832 10.9493Z"
          fill="#F59E0B" />
        <path fill-rule="evenodd" clip-rule="evenodd"
          d="M103.354 44.6265L126.309 67.0429L103.354 89.4602L80.3984 67.0429L103.354 44.6265Z" fill="#2DD4BF" />
        <path fill-rule="evenodd" clip-rule="evenodd" d="M80.398 67.043L103.354 89.4603H57.4434L80.398 67.043Z"
          fill="#3B82F6" />
        <path fill-rule="evenodd" clip-rule="evenodd"
          d="M80.3956 67.0429L57.441 89.4602L45.9638 78.2522L34.4316 67.0429L57.441 44.6265L68.9185 55.8348L80.3956 67.0429Z"
          fill="#2563EB" />
      </svg>
      <svg v-if="!collapsed" class="h-8 w-auto" viewBox="0 0 274 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M0 89.4607H11.673V61.8281C15.055 67.1689 20.837 70.1121 27.764 70.1121C39.491 70.1121 51.819 61.7189 51.819 45.2044C51.819 29.8895 41.074 19.3154 25.746 19.3154C10.582 19.3154 0 29.5065 0 45.0952V89.4607ZM25.8 59.2662C17.346 59.2662 11.673 53.2165 11.673 44.7139C11.673 36.2115 17.346 30.1618 25.8 30.1618C34.309 30.1618 40.091 36.2115 40.091 44.7139C40.091 53.2165 34.309 59.2662 25.8 59.2662Z"
          fill="#0F172A" />
        <path
          d="M58.2991 69.8849H69.8251V41.2339C69.8251 33.2789 73.7211 30.3861 79.3501 30.3861V19.3149C66.8491 19.3149 58.2991 26.3801 58.2991 41.2339V69.8849Z"
          fill="#0F172A" />
        <path
          d="M111.901 69.8851C127.066 69.8851 137.648 59.8182 137.648 44.2844V-0.260254H126.029V27.7213C122.592 22.3641 116.81 19.4409 109.882 19.4409C98.1549 19.4409 85.8279 27.7763 85.8279 44.1759C85.8279 59.4395 96.5749 69.8851 111.901 69.8851ZM111.847 59.1143C103.337 59.1143 97.5549 53.1068 97.5549 44.6629C97.5549 36.2197 103.337 30.212 111.847 30.212C120.356 30.212 126.029 36.2197 126.029 44.6629C126.029 53.1068 120.356 59.1143 111.847 59.1143Z"
          fill="#0F172A" />
        <path
          d="M167.601 69.8849C181.68 69.8849 191.082 61.429 191.082 44.9618V19.3149H179.639V44.9618C179.639 54.364 174.803 58.814 167.601 58.814C160.348 58.814 155.566 54.364 155.566 44.9618V19.3149H144.121V44.9618C144.121 61.5405 153.523 69.8849 167.601 69.8849Z"
          fill="#0F172A" />
        <path
          d="M223.142 69.8849C236.014 69.8849 245.454 62.0175 247.76 50.6228H236.177C234.19 55.7774 229.363 59.0873 223.142 59.0873C214.777 59.0873 209.09 53.0646 209.09 44.5999C209.09 36.1354 214.777 30.113 223.142 30.113C229.363 30.113 234.19 33.4226 236.177 38.5772H247.76C245.454 27.1828 236.014 19.3149 223.142 19.3149C208.126 19.3149 197.563 30.0043 197.563 44.5999C197.563 59.196 208.126 69.8849 223.142 69.8849Z"
          fill="#0F172A" />
        <path
          d="M273.668 58.8605C268.999 58.8605 265.724 56.3128 265.724 49.7196V30.2751H273.668V19.5273H265.724V2.18652L254.237 8.00443V49.7196C254.237 63.3482 262.127 69.8851 273.668 69.8851V58.8605Z"
          fill="#0F172A" />
      </svg>
    </div>

    <!-- Search -->
    <div v-if="!collapsed" class="px-3 mb-3 flex-shrink-0">
      <div class="flex items-center gap-2 bg-neutral-100 rounded-sm px-3 py-2">
        <Search class="w-4 h-4 text-neutral-400 flex-shrink-0" />
        <input type="text" placeholder="Search"
          class="bg-transparent text-sm text-neutral-600 placeholder-neutral-400 outline-none w-full" />
      </div>
    </div>

    <!-- Main nav -->
    <nav class="flex-1 px-2 space-y-0.5 overflow-y-auto">
      <router-link v-for="item in navItems" :key="item.path" :to="item.path" :class="[
        'flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm font-medium transition-colors',
        isActive(item.path)
          ? 'bg-primary-light text-primary'
          : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900',
      ]" :title="collapsed ? item.label : undefined">
        <component :is="item.icon" class="w-5 h-5 flex-shrink-0" />
        <span v-if="!collapsed" class="truncate">{{ item.label }}</span>
      </router-link>
    </nav>

    <!-- Bottom nav items -->
    <div class="px-2 pb-2 space-y-0.5 flex-shrink-0">
      <router-link v-for="item in bottomItems" :key="item.path" :to="item.path" :class="[
        'flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm font-medium transition-colors',
        isActive(item.path)
          ? 'bg-primary-light text-primary'
          : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900',
      ]" :title="collapsed ? item.label : undefined">
        <component :is="item.icon" class="w-5 h-5 flex-shrink-0" />
        <span v-if="!collapsed" class="truncate">{{ item.label }}</span>
      </router-link>
    </div>

    <!-- User profile -->
    <div class="mx-2 mb-3 mt-1 bg-primary-light rounded-xl p-3 flex items-center gap-2.5 flex-shrink-0">
      <div
        class="w-8 h-8 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
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
      class="flex items-center justify-center py-2 mb-2 mx-2 rounded-sm text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 transition-colors"
      @click="collapsed = !collapsed">
      <ChevronLeft :class="['w-4 h-4 transition-transform', collapsed ? 'rotate-180' : '']" />
    </button>
  </aside>
</template>
