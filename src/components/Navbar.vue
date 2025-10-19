<script setup>
// No script changes needed for this component.
</script>

<template>
  <nav class="bg-white shadow-sm border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex-shrink-0 flex items-center">
          <router-link to="/" class="text-2xl font-bold text-indigo-700">Teacher Dan's Classes</router-link>
        </div>
        
        <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
          <!-- THE FIX: Use <router-link> for internal Vue pages -->
          <router-link 
             to="/" 
             class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
             active-class="border-indigo-500 text-gray-900">
            Home
          </router-link>
          
          <!-- This remains a standard <a> tag because it links to your separate MVP site -->
          <a 
             href="https://app.myteacherdan.com" 
             target="_blank"
             class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
            App
          </a>

          <router-link 
             to="/schedule" 
             class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
             active-class="border-indigo-500 text-gray-900">
            Schedule
          </router-link>

          <router-link 
             to="/contact" 
             class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
             active-class="border-indigo-500 text-gray-900">
            Contact
          </router-link>
          
          <router-link 
             to="/tools" 
             class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
             active-class="border-indigo-500 text-gray-900">
            Tools
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>
