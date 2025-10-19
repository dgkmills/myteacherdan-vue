<script setup>
// This component will be used as the consistent header for your main Vue site.
// We'll use Vue Router's <router-link> for navigation if you add routing later.
// For now, simple <a> tags work.
</script>

<template>
  <nav class="bg-white shadow-sm border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex-shrink-0 flex items-center">
          <span class="text-2xl font-bold text-indigo-700">Teacher Dan's Classes</span>
        </div>
        
        <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
          <a href="https://myteacherdan.com" 
             class="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
            Home
          </a>
          <a href="https://app.myteacherdan.com" 
             class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
            App
          </a>
          <a href="https://myteacherdan.com/schedule" 
             class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
            Schedule
          </a>
          <a href="https://myteacherdan.com/contact" 
             class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
            Contact
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>