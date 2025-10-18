<script setup>
defineProps({
  time: String,
  topic: String,
  type: String,
  status: String,
  // Accept the whole pricing object
  pricing: Object,
});
</script>

<template>
  <div class="bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 border border-gray-200">
    <div class="p-6">
      <div class="flex justify-between items-start mb-4">
        <div>
          <p class="text-sm font-semibold text-indigo-600">{{ type }} Class</p>
          <h3 class="text-2xl font-bold text-gray-900">{{ topic }}</h3>
        </div>
        <span
          class="px-3 py-1 text-xs font-bold rounded-full"
          :class="{
            'bg-green-100 text-green-800': status === 'Available',
            'bg-yellow-100 text-yellow-800': status === 'Filling Up',
            'bg-red-100 text-red-800': status === 'Full'
          }"
        >
          {{ status }}
        </span>
      </div>
      
      <p class="text-gray-600 mb-6">{{ time }}</p>

      <div class="bg-gray-50 rounded-lg p-4">
        <p class="text-sm font-medium text-gray-500 mb-2">Pricing (baht)</p>
        <div class="flex justify-around items-center text-center">
          <div>
            <p class="text-2xl font-bold text-gray-800">{{ pricing.individual }}</p>
            <p class="text-xs text-gray-500">Individual</p>
          </div>
          <div class="border-l border-gray-200 h-10"></div>
          <div>
            <p class="text-2xl font-bold text-gray-800">{{ pricing.package }}</p>
            <p class="text-xs text-gray-500">Package Rate</p>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
