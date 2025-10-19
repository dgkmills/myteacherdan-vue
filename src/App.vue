<script setup>
// This component now only needs to import the Navbar and the RouterView.
import Navbar from './components/Navbar.vue';
import { RouterView } from 'vue-router';
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- The Navbar is always visible at the top of every page. -->
    <Navbar />

    <!-- 
      The <router-view> component is the magic part. 
      Vue Router will automatically render the correct page component here 
      (HomeView, ScheduleView, etc.) based on the current URL.
    -->
    <main class="py-12 px-4 sm:px-6 lg:px-8">
      <router-view />
    </main>
    
    <!-- A simple, consistent footer for all pages -->
    <footer class="py-8 text-center text-gray-500 text-sm">
      Copyright © 2025 Teacher Dan's Classes. All Rights Reserved.
    </footer>
  </div>
</template>
