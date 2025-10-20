<script setup>
import { ref, onMounted, computed } from 'vue';
import { collection, getDocs } from 'firebase/firestore';
import { initFirebase, getDB } from '../db-service.js';
import ScheduleCard from '../components/ScheduleCard.vue';
import RequestForm from '../components/RequestForm.vue';
import { languageStore } from '../store.js';

const scheduleData = ref([]);
const isLoading = ref(true);
const errorMessage = ref('');
const currentLanguage = computed(() => languageStore.state.language);

const translations = {
  en: {
    heroTitle: "Class Schedule & Booking",
    heroSubtitle: "Find a class that fits your schedule. Ready to start? Request a free 15-minute consultation below.",
    loadingText: "Loading available classes...",
    errorTitle: "Something went wrong",
    errorText: "Sorry, we couldn't load the schedule. Please try again later.",
    availableClassesTitle: "Available Classes",
    availableClassesSubtitle: "More classes and times will be added based on demand.",
    noClassesTitle: "No classes are scheduled at the moment.",
    noClassesSubtitle: "Please check back soon for new openings!"
  },
  th: {
    heroTitle: "ตารางเรียนและการจอง",
    heroSubtitle: "ค้นหาคลาสที่เหมาะกับตารางเวลาของคุณ พร้อมที่จะเริ่มหรือยัง? ขอนัดเวลาให้คำปรึกษาฟรี 15 นาทีด้านล่าง",
    loadingText: "กำลังโหลดคลาสที่ว่าง...",
    errorTitle: "เกิดข้อผิดพลาดบางอย่าง",
    errorText: "ขออภัย เราไม่สามารถโหลดตารางเรียนได้ โปรดลองอีกครั้งในภายหลัง",
    availableClassesTitle: "คลาสที่ว่าง",
    availableClassesSubtitle: "จะมีการเพิ่มคลาสและเวลาเรียนเพิ่มเติมตามความต้องการ",
    noClassesTitle: "ยังไม่มีการจัดตารางเรียนในขณะนี้",
    noClassesSubtitle: "โปรดกลับมาตรวจสอบอีกครั้งสำหรับการเปิดรับใหม่!"
  }
};
const t = computed(() => translations[currentLanguage.value]);

const fetchSchedule = async () => {
  isLoading.value = true;
  errorMessage.value = '';
  try {
    await initFirebase(); // Initialize Firebase
    const db = getDB(); // Get the Firestore instance
    if (!db) {
      throw new Error("Firestore database is not available.");
    }
    
    // THE FIX: Changed collection name from 'schedule' to 'classes' to match Firestore rules.
    const scheduleCol = collection(db, 'classes'); 
    
    const scheduleSnapshot = await getDocs(scheduleCol);
    const scheduleList = scheduleSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    scheduleData.value = scheduleList;

  } catch (error) {
    console.error("Error fetching schedule:", error);
    errorMessage.value = `Error: ${error.message}`;
  } finally {
    isLoading.value = false;
  }
};

onMounted(fetchSchedule);
</script>

<template>
  <div>
    <section class="bg-indigo-50 py-16 rounded-xl shadow-inner">
      <div class="container mx-auto px-6 text-center">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900">{{ t.heroTitle }}</h1>
        <p class="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">{{ t.heroSubtitle }}</p>
      </div>
    </section>

    <div class="container mx-auto px-6 py-12">
      <div v-if="isLoading" class="text-center py-12">
        <div class="animate-spin inline-block w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full"></div>
        <p class="mt-4 text-indigo-600 font-semibold">{{ t.loadingText }}</p>
      </div>

      <div v-else-if="errorMessage" class="text-center py-12 bg-red-50 rounded-lg border border-red-200">
        <p class="text-xl font-semibold text-red-700">{{ t.errorTitle }}</p>
        <p class="text-red-600 mt-2">{{ t.errorText }}</p>
      </div>
      
      <div v-else-if="scheduleData.length > 0">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-800">{{ t.availableClassesTitle }}</h2>
          <p class="text-gray-500 mt-2">{{ t.availableClassesSubtitle }}</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ScheduleCard v-for="item in scheduleData" :key="item.id" :topic="item.topic" :type="item.type" :time="item.time" :status="item.status" :pricing="item.pricing"/>
        </div>
      </div>

      <div v-else class="text-center py-12 bg-gray-50 rounded-lg">
        <p class="text-xl font-semibold text-gray-700">{{ t.noClassesTitle }}</p>
        <p class="text-gray-500 mt-2">{{ t.noClassesSubtitle }}</p>
      </div>
    </div>
    
    <div class="container mx-auto px-6">
       <RequestForm />
    </div>
  </div>
</template>
