import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// *** THE FIX: Point to your NEW Firebase project ***
const firebaseConfig = {
  apiKey: "AIzaSyAdkkonrM6gFCN_xmw5g1qSJipHJ_LZKTE",
  authDomain: "my-teacher-dan-schedule-9bd19.firebaseapp.com",
  projectId: "my-teacher-dan-schedule-9bd19",
  storageBucket: "my-teacher-dan-schedule-9bd19.appspot.com",
  // This is from your screenshot
  messagingSenderId: "61828103605", 
  // This value is now correctly substituted from your screenshot
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

