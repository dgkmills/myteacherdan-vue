<script setup>
import { computed } from 'vue';
import { languageStore } from '../store.js';

// Access the global language state and the function to change it.
const currentLanguage = computed(() => languageStore.state.language);

const toggleLanguage = () => {
  const newLanguage = currentLanguage.value === 'en' ? 'th' : 'en';
  languageStore.setLanguage(newLanguage);
};
</script>

<template>
  <button
    @click="toggleLanguage"
    class="relative inline-flex items-center h-8 rounded-full w-16 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    :class="currentLanguage === 'en' ? 'bg-indigo-600' : 'bg-gray-300'"
  >
    <span class="sr-only">Toggle Language</span>
    <span
      class="absolute left-1 top-1 w-6 h-6 rounded-full bg-white shadow-md transform transition-transform duration-300 ease-in-out flex items-center justify-center font-bold text-xs"
      :class="{ 'translate-x-8': currentLanguage === 'th' }"
    >
      <span v-if="currentLanguage === 'en'" class="text-indigo-600">EN</span>
      <span v-else class="text-gray-700">TH</span>
    </span>
  </button>
</template>
