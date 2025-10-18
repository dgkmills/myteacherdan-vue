import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

const firebaseConfig = {
  // Using the known "grandfathered" API key.
  apiKey: "AIzaSyAdkkonrM6gFCN_xmw5g1qSJipHJ_LZKTE",
  
  // Pointing all services to the original project that the API key belongs to.
  authDomain: "dgkmills-schedule-tracker.firebaseapp.com",
  projectId: "dgkmills-schedule-tracker",
  storageBucket: "dgkmills-schedule-tracker.appspot.com",
  
  messagingSenderId: "61828103605",
  appId: "1:61828103605:web:5643cb68d3925273ba2dfc"
};

export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  define: {
    __firebase_config: JSON.stringify(firebaseConfig),
    __initial_auth_token: JSON.stringify(''),
  }
})

