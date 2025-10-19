<script setup>
import { ref, onMounted } from 'vue';
import { collection, getDocs } from 'firebase/firestore';
import { initFirebase, getDB } from './db-service.js'; 
import ScheduleCard from './components/ScheduleCard.vue';
import Navbar from './components/Navbar.vue'; // 1. Import the new Navbar

const scheduleData = ref([]);
const isLoading = ref(true);
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';

const fetchSchedule = async () => {
  // ... (your existing fetchSchedule logic remains unchanged)
  isLoading.value = true;
  
  try {
    await initFirebase(); 

    const db = getDB();
    if (!db) {
        throw new Error("Firebase database failed to initialize. Check db-service.js and vite.config.js");
    }
    const collectionPath = `classes`;
    const q = collection(db, collectionPath);
    const querySnapshot = await getDocs(q);
    
    const fetchedData = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    scheduleData.value = fetchedData;
    console.log("Fetched schedule data:", fetchedData);

  } catch (error) {
    console.error("Error fetching Firestore schedule:", error);
    scheduleData.value = []; 
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchSchedule();
});

</script>

<template>
  <Navbar />

  <div class="bg-gray-50">
    <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
    
      <div class="text-center mb-12">
        <h1 class="text-4xl font-extrabold text-gray-900 sm:text-5xl">
          Your Journey to Fluency Starts Here
        </h1>
        <p class="mt-4 text-xl text-gray-600">
          Achieve your language goals with fun, personalized lessons.
        </p>
      </div>

      <div v-if="isLoading" class="text-center p-8">
        <div class="animate-spin inline-block w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full"></div>
        <p class="mt-4 text-indigo-600">Loading schedule from Firebase...</p>
      </div>

      <div v-else-if="scheduleData.length === 0" class="text-center p-8 bg-white shadow rounded-xl">
        <p class="text-red-600 font-semibold mb-2">No Classes Found.</p>
        <p class="text-gray-600">Please add documents to the "classes" collection in your Firebase project. Current path: /classes</p>
        <p class="text-sm text-gray-400 mt-4">If this message persists, check the browser console (F12) for detailed Firebase errors.</p>
      </div>
      
      <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ScheduleCard
          v-for="scheduleItem in scheduleData"
          :key="scheduleItem.id"
          :time="scheduleItem.time"
          :topic="scheduleItem.topic"
          :pricing="scheduleItem.pricing" 
          :status="scheduleItem.status"
          :type="scheduleItem.type"
        />
      </div>

      <footer class="mt-12 text-center text-gray-500 text-sm">
        Built with Vue and the power of HMR on your HP Omen.
      </footer>
    </div>
  </div>
</template>