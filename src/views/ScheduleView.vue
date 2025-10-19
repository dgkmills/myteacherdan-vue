<script setup>
import { ref, onMounted } from 'vue';
import { collection, getDocs } from 'firebase/firestore';
import { initFirebase, getDB } from '../db-service.js'; 
import ScheduleCard from '../components/ScheduleCard.vue';
import RequestForm from '../components/RequestForm.vue'; // Import the new form

const scheduleData = ref([]);
const isLoading = ref(true);

const fetchSchedule = async () => {
  isLoading.value = true;
  try {
    await initFirebase(); 
    const db = getDB();
    if (!db) throw new Error("Firebase database failed to initialize.");
    
    const q = collection(db, 'classes');
    const querySnapshot = await getDocs(q);
    
    const fetchedData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    scheduleData.value = fetchedData;
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
  <div class="bg-white shadow-lg rounded-xl p-8">
    <h1 class="text-4xl font-extrabold text-gray-900 mb-6 text-center">Class Schedule</h1>
    <p class="text-lg text-gray-600 mb-12 text-center max-w-3xl mx-auto">
      Below is a list of currently available classes. More will be added soon!
    </p>

    <!-- Loading Spinner -->
    <div v-if="isLoading" class="text-center py-12">
      <div class="animate-spin inline-block w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      <p class="mt-4 text-blue-600 font-semibold">Loading schedule...</p>
    </div>

    <!-- Schedule Cards -->
    <div v-else-if="scheduleData.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <ScheduleCard
        v-for="item in scheduleData"
        :key="item.id"
        :topic="item.topic"
        :type="item.type"
        :time="item.time"
        :status="item.status"
        :pricing="item.pricing"
      />
    </div>

    <!-- No Classes Message -->
    <div v-else class="text-center py-12 bg-gray-50 rounded-lg">
      <p class="text-xl font-semibold text-gray-700">No classes are scheduled at the moment.</p>
      <p class="text-gray-500 mt-2">Please check back soon for updates!</p>
    </div>
    
    <!-- ADD THE FORM COMPONENT HERE -->
    <RequestForm />

  </div>
</template>

