<script setup>
import { computed } from 'vue';
import { languageStore } from '@/store.js';

const currentLanguage = computed(() => languageStore.state.language);
const translations = {
  en: {
    title: "Unlock Your Full Potential",
    subtitle: "You've completed all the free lessons. Purchase the full course to continue your journey to fluency.",
    packageName: "Beginner's Package",
    price: "2,499 Baht",
    feature1: "Access to all 10 beginner lessons",
    feature2: "Interactive quizzes for each lesson",
    feature3: "Downloadable lesson notes",
    feature4: "Priority support from Teacher Dan",
    purchaseBtn: "Purchase Now",
    contactBtn: "Contact for Other Options",
  },
  th: {
    title: "ปลดล็อกศักยภาพเต็มรูปแบบของคุณ",
    subtitle: "คุณเรียนบทเรียนฟรีครบแล้ว ซื้อคอร์สเต็มเพื่อเดินทางสู่ความคล่องแคล่วต่อไป",
    packageName: "แพ็กเกจสำหรับผู้เริ่มต้น",
    price: "2,499 บาท",
    feature1: "เข้าถึงบทเรียนสำหรับผู้เริ่มต้นทั้ง 10 บท",
    feature2: "แบบทดสอบอินเทอร์แอคทีฟสำหรับแต่ละบทเรียน",
    feature3: "เอกสารประกอบการเรียนที่ดาวน์โหลดได้",
    feature4: "การสนับสนุนพิเศษจากครูแดน",
    purchaseBtn: "ซื้อตอนนี้",
    contactBtn: "ติดต่อสำหรับทางเลือกอื่น",
  }
};
const t = computed(() => translations[currentLanguage.value]);
</script>

<template>
  <div class="bg-white shadow-lg rounded-xl p-8 max-w-2xl mx-auto text-center">
    <h1 class="text-4xl font-extrabold text-gray-900">{{ t.title }}</h1>
    <p class="text-lg text-gray-600 mt-4 mb-8">{{ t.subtitle }}</p>

    <div class="border rounded-xl p-8 bg-gray-50">
        <h2 class="text-2xl font-bold text-indigo-700">{{ t.packageName }}</h2>
        <p class="text-5xl font-extrabold text-gray-900 my-4">{{ t.price }}</p>

        <ul class="space-y-3 text-left my-8 inline-block">
            <li class="flex items-center"><svg class="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>{{ t.feature1 }}</li>
            <li class="flex items-center"><svg class="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>{{ t.feature2 }}</li>
            <li class="flex items-center"><svg class="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>{{ t.feature3 }}</li>
            <li class="flex items-center"><svg class="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>{{ t.feature4 }}</li>
        </ul>

        <div class="space-y-4">
            <button class="w-full bg-indigo-600 text-white font-semibold rounded-lg px-8 py-4 text-xl hover:bg-indigo-700 transition shadow-lg">{{ t.purchaseBtn }}</button>
            <router-link to="/contact" class="w-full inline-block bg-gray-200 text-gray-800 font-semibold rounded-lg px-8 py-3 text-lg hover:bg-gray-300 transition">{{ t.contactBtn }}</router-link>
        </div>
    </div>
  </div>
</template>
