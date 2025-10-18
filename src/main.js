import { createApp } from 'vue'
import App from './App.vue'

// REMOVED: import './index.css' (because the file doesn't exist and we are using Tailwind CDN)

// Create the Vue application and attach it to the HTML element with id="app".
createApp(App).mount('#app')
