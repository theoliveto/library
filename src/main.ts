import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { registerPlugins } from '@/plugins'
import { useAuthStore } from '@/stores/auth'

import App from './App.vue'

import VueApexCharts from 'vue3-apexcharts'

import 'unfonts.css'

const app = createApp(App)

app.use(VueApexCharts)

const pinia = createPinia()

app.use(pinia)

registerPlugins(app)

const authStore = useAuthStore(pinia)

authStore.restaurarSessao().finally(() => {
    app.mount('#app')
})