<script setup>
import { computed, onMounted } from 'vue';
import { languageStore } from '@/store.js';
import { useRouter, useRoute } from 'vue-router';

const props = defineProps({
  id: String
});

const router = useRouter();
const route = useRoute();
const currentLanguage = computed(() => languageStore.state.language);
const quizPassed = computed(() => languageStore.state.quiz1_passed);

const lessonData = {
  '1': {
    en: { title: 'Lesson 1: Greetings & Introductions' },
    th: { title: 'บทที่ 1: การทักทายและแนะนำตัว' }
  },
  '2': {
    en: { title: 'Lesson 2: Asking Basic Questions' },
    th: { title: 'บทที่ 2: การถามคำถามพื้นฐาน' }
  },
  '3': {
    en: { title: 'Lesson 3: Talking About Hobbies' },
    th: { title: 'บทที่ 3: การพูดคุยเรื่องงานอดิเรก' }
  }
};

const lesson = computed(() => lessonData[props.id][currentLanguage.value]);
const nextPath = computed(() => {
  if (props.id === '1') return '/app/quiz/1';
  if (props.id === '2') return '/app/lesson/3';
  if (props.id === '3') return '/app/paywall';
  return '/app';
});

const buttonText = computed(() => {
    const lang = currentLanguage.value;
    if (props.id === '1') return lang === 'en' ? 'Take the Quiz' : 'ทำแบบทดสอบ';
    if (props.id === '3') return lang === 'en' ? 'Finish Free Lessons' : 'จบส่วนเรียนฟรี';
    return lang === 'en' ? 'Next Lesson' : 'บทเรียนถัดไป';
});


// Navigation guard to protect lessons 2 and 3
onMounted(() => {
  const lessonId = parseInt(props.id);
  if ((lessonId === 2 || lessonId === 3) && !quizPassed.value) {
    // If trying to access lesson 2 or 3 without passing the quiz, redirect back
    router.push('/app/lesson/1');
  }
});
</script>

<template>
  <div class="bg-white shadow-lg rounded-xl p-8 max-w-4xl mx-auto">
    <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ lesson.title }}</h1>
    <p class="text-gray-500 mb-8">This is the placeholder content for the lesson.</p>

    <!-- Video Placeholder -->
    <div class="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg mb-8 flex items-center justify-center">
      <svg class="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd"></path></svg>
      <span class="absolute text-gray-500 font-semibold">10-15 minute video content</span>
    </div>

    <div class="text-center">
      <router-link :to="nextPath" class="inline-block bg-indigo-600 text-white font-semibold rounded-lg px-8 py-3 text-lg hover:bg-indigo-700 transition shadow-lg">
        {{ buttonText }}
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.aspect-w-16 { position: relative; padding-bottom: 56.25%; }
.aspect-h-9 > * { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }
</style>
