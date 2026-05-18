import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router/index.js'
import App from './App.vue'
import './assets/css/main.css'

// UI components — globally registered
import AppButton from '@/components/ui/AppButton.vue'
import AppBadge from '@/components/ui/AppBadge.vue'
import AppInput from '@/components/ui/AppInput.vue'
import AppSelect from '@/components/ui/AppSelect.vue'
import AppToggle from '@/components/ui/AppToggle.vue'
import AppDrawer from '@/components/ui/AppDrawer.vue'
import AppTabs from '@/components/ui/AppTabs.vue'
import AppDialog from '@/components/ui/AppDialog.vue'
import AppAvatar from '@/components/ui/AppAvatar.vue'
import AppChip from '@/components/ui/AppChip.vue'
import AppProgressBar from '@/components/ui/AppProgressBar.vue'
import AppAlert from '@/components/ui/AppAlert.vue'
import AppPopover from '@/components/ui/AppPopover.vue'

const app = createApp(App)
app.use(createPinia())
app.use(router)

app.component('AppButton', AppButton)
app.component('AppBadge', AppBadge)
app.component('AppInput', AppInput)
app.component('AppSelect', AppSelect)
app.component('AppToggle', AppToggle)
app.component('AppDrawer', AppDrawer)
app.component('AppTabs', AppTabs)
app.component('AppDialog', AppDialog)
app.component('AppAvatar', AppAvatar)
app.component('AppChip', AppChip)
app.component('AppProgressBar', AppProgressBar)
app.component('AppAlert', AppAlert)
app.component('AppPopover', AppPopover)

app.mount('#app')
