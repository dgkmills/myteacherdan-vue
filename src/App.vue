<script setup>
import Navbar from './components/Navbar.vue';
import { RouterView } from 'vue-router';
// THE FIX: Changed the import path to be an alias from the project root.
// This resolves the Vite import analysis failure.
import { languageStore } from '@/store.js'; 
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <Navbar />
    <main class="py-12 px-4 sm:px-6 lg:px-8">
      <router-view />
    </main>
    <footer class="py-8 text-center text-gray-500 text-sm">
      Copyright © 2025 Teacher Dan's Classes. All Rights Reserved.
    </footer>
  </div>
</template>

