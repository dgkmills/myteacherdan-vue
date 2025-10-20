import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig(({ mode }) => {
  // Load environment variables from the .env file
  const env = loadEnv(mode, process.cwd(), '');

  const firebaseConfig = {
    apiKey: env.VITE_FIREBASE_API_KEY,
    authDomain: "my-teacher-dan-schedule-9bd19.firebaseapp.com",
    projectId: "my-teacher-dan-schedule-9bd19",
    storageBucket: "my-teacher-dan-schedule-9bd19.appspot.com",
    messagingSenderId: "61828103605",
    appId: "1:61828103605:web:5643cb68d3925273ba2dfc"
  };

  return {
    plugins: [
      vue(),
      vueDevTools(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    define: {
      'process.env': {
        __firebase_config: JSON.stringify(firebaseConfig),
        __initial_auth_token: JSON.stringify(env.INITIAL_AUTH_TOKEN || ''),
      }
    }
  }
})

