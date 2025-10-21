import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { initFirebase } from './db-service'
import './style.css' // Import Tailwind's entrypoint

// Create an async function to initialize Firebase and then mount the app
const initializeApp = async () => {
  try {
    // Wait for Firebase to be initialized before doing anything else
    await initFirebase();

    const app = createApp(App)

    app.use(router)
    app.use(store)

    app.mount('#app')
  } catch (e) {
    console.error("Failed to initialize the application:", e);
  }
};

// Call the function to start the app
initializeApp();

