import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import UUID from 'vue-uuid'

import './assets/main.scss'
import { Form as VeeForm, Field as VeeField } from 'vee-validate'

const app = createApp(App)

app.use(createPinia())
app.use(UUID)
app.component("VeeForm", VeeForm)
app.component("VeeField", VeeField)

app.mount('#app')
