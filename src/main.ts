import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { registerPlugins } from '@/plugins'

import App from './App.vue'

import VueApexCharts from 'vue3-apexcharts'

import 'unfonts.css'

const app = createApp(App)

app.use(VueApexCharts)
app.use(createPinia())

registerPlugins(app)

app.mount('#app')