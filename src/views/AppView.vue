<script setup>
import { computed } from 'vue';
// THE FIX: Use the root-level alias '@' for robust importing. This resolves the Vite import error.
import { languageStore } from '@/store.js';
import { useRouter } from 'vue-router';

const router = useRouter();
const currentLanguage = computed(() => languageStore.state.language);

const translations = {
  en: {
    title: "Master English Speaking with Confidence",
    subtitle: "Interactive video lessons designed for Thai students. Start with 3 free lessons and see your progress immediately.",
    button: "Start Your First Lesson Free",
  },
  th: {
    title: "ฝึกพูดภาษาอังกฤษอย่างมั่นใจ",
    subtitle: "บทเรียนวิดีโอแบบอินเทอร์แอคทีฟที่ออกแบบมาสำหรับนักเรียนไทยโดยเฉพาะ เริ่มเรียนฟรี 3 บทเรียนและเห็นความก้าวหน้าของคุณได้ทันที",
    button: "เริ่มบทเรียนแรกของคุณฟรี",
  }
};

const t = computed(() => translations[currentLanguage.value]);

// Function to navigate to the first lesson
const startFirstLesson = () => {
  router.push('/app/lesson/1');
};
</script>

<template>
  <div class="bg-white shadow-lg rounded-xl p-8 mb-8">
    <!-- Hero Section -->
    <section class="text-center">
      <h1 class="text-4xl md:text-5xl font-bold text-gray-900">{{ t.title }}</h1>
      <p class="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">{{ t.subtitle }}</p>
      <!-- THE FIX: Button now triggers a function to navigate to the first lesson page -->
      <button @click="startFirstLesson" class="mt-8 inline-block bg-indigo-600 text-white font-semibold rounded-lg px-8 py-3 text-lg hover:bg-indigo-700 transition shadow-lg">
        {{ t.button }}
      </button>
    </section>
  </div>
</template>

