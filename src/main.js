import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // 1. Import the router

const app = createApp(App)

app.use(router) // 2. Tell the Vue app to use the router

app.mount('#app')