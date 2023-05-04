import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import UUID from 'vue-uuid'
import piniaPluginPersistedState from 'pinia-plugin-persistedstate'

import './assets/main.scss'
import { Form as VeeForm, Field as VeeField } from 'vee-validate'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedState)

app.use(pinia)
app.use(UUID)
app.component("VeeForm", VeeForm)
app.component("VeeField", VeeField)

app.mount('#app')
