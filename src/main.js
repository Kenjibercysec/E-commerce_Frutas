import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import 'animate.css'
import './styles/main.css'

const app = createApp(App)

// Initialize Pinia
const pinia = createPinia()
app.use(pinia)

// Initialize Router
app.use(router)

// Mount the app
app.mount('#app') 