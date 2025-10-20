<script setup>
import { ref, computed } from 'vue';
import LanguageToggle from './LanguageToggle.vue';
import { languageStore } from '../store.js';

const isMobileMenuOpen = ref(false);
const currentLanguage = computed(() => languageStore.state.language);

const navLinks = computed(() => ({
  home: currentLanguage.value === 'en' ? 'Home' : 'หน้าหลัก',
  app: currentLanguage.value === 'en' ? 'App' : 'แอป',
  schedule: currentLanguage.value === 'en' ? 'Schedule' : 'ตารางเรียน',
  contact: currentLanguage.value === 'en' ? 'Contact' : 'ติดต่อ',
  tools: currentLanguage.value === 'en' ? 'Tools' : 'เครื่องมือ',
  tracker: currentLanguage.value === 'en' ? 'Tracker' : 'ติดตาม',
}));

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
};
</script>

<template>
  <nav class="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <div class="flex-shrink-0 flex items-center">
          <router-link to="/" class="text-2xl font-bold text-indigo-700">
            {{ currentLanguage === 'en' ? "Teacher Dan's Classes" : "คลาสครูแดน" }}
          </router-link>
        </div>
        
        <div class="hidden sm:flex sm:items-center sm:space-x-8">
          <router-link to="/" class="nav-link" active-class="active-link">{{ navLinks.home }}</router-link>
          <router-link to="/app" class="nav-link" active-class="active-link">{{ navLinks.app }}</router-link>
          <router-link to="/schedule" class="nav-link" active-class="active-link">{{ navLinks.schedule }}</router-link>
          <router-link to="/tracker" class="nav-link" active-class="active-link">{{ navLinks.tracker }}</router-link>
          <router-link to="/contact" class="nav-link" active-class="active-link">{{ navLinks.contact }}</router-link>
          <router-link to="/tools" class="nav-link" active-class="active-link">{{ navLinks.tools }}</router-link>
          <LanguageToggle />
        </div>

        <div class="sm:hidden flex items-center space-x-4">
          <LanguageToggle />
          <button @click="toggleMobileMenu" class="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
            <span class="sr-only">Open main menu</span>
            <svg v-if="!isMobileMenuOpen" class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
            <svg v-else class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
      </div>
    </div>

    <div v-if="isMobileMenuOpen" class="sm:hidden bg-white border-t border-gray-200">
      <div class="px-2 pt-2 pb-3 space-y-1">
        <router-link @click="closeMobileMenu" to="/" class="mobile-nav-link" active-class="mobile-active-link">{{ navLinks.home }}</router-link>
        <router-link @click="closeMobileMenu" to="/app" class="mobile-nav-link" active-class="mobile-active-link">{{ navLinks.app }}</router-link>
        <router-link @click="closeMobileMenu" to="/schedule" class="mobile-nav-link" active-class="mobile-active-link">{{ navLinks.schedule }}</router-link>
        <router-link @click="closeMobileMenu" to="/tracker" class="mobile-nav-link" active-class="mobile-active-link">{{ navLinks.tracker }}</router-link>
        <router-link @click="closeMobileMenu" to="/contact" class="mobile-nav-link" active-class="mobile-active-link">{{ navLinks.contact }}</router-link>
        <router-link @click="closeMobileMenu" to="/tools" class="mobile-nav-link" active-class="mobile-active-link">{{ navLinks.tools }}</router-link>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.nav-link { @apply border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium; }
.active-link { @apply border-indigo-500 text-gray-900; }
.mobile-nav-link { @apply block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50; }
.mobile-active-link { @apply bg-indigo-50 border-indigo-500 text-indigo-700; }
</style>
