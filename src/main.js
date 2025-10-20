import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// No changes needed here, but confirming it's correct.
const app = createApp(App)

app.use(router)

app.mount('#app')
