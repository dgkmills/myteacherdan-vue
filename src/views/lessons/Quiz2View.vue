<script setup>
import { ref, computed, onMounted } from 'vue';
import { languageStore } from '@/store.js';
import { useRouter } from 'vue-router';

const router = useRouter();
const currentLanguage = computed(() => languageStore.state.language);
const quiz1Passed = computed(() => languageStore.state.quiz1_passed);
const userAnswers = ref({});
const submitted = ref(false);

const translations = {
  en: {
    title: "Quiz: Lessons 2 & 3 Review",
    subtitle: "Answer all questions to test your knowledge. You must get at least 4 out of 5 correct to pass.",
    submit: "Submit Answers",
    passedTitle: "Excellent Work!",
    passedSubtitle: "You have completed all the free lessons.",
    nextLesson: "See Full Course Options",
    failedTitle: "Almost There!",
    failedSubtitle: "You need at least 4 correct answers to continue. Please review the lessons and try again.",
    tryAgain: "Review Lesson 3",
  },
  th: {
    title: "แบบทดสอบ: ทบทวนบทที่ 2 และ 3",
    subtitle: "ตอบคำถามทั้งหมดเพื่อทดสอบความรู้ของคุณ คุณต้องตอบถูกอย่างน้อย 4 จาก 5 ข้อเพื่อที่จะผ่าน",
    submit: "ส่งคำตอบ",
    passedTitle: "ยอดเยี่ยมมาก!",
    passedSubtitle: "คุณเรียนบทเรียนฟรีครบทุกบทแล้ว",
    nextLesson: "ดูตัวเลือกคอร์สเรียนทั้งหมด",
    failedTitle: "เกือบแล้ว!",
    failedSubtitle: "คุณต้องตอบถูกอย่างน้อย 4 ข้อเพื่อไปต่อ กรุณาทบทวนบทเรียนแล้วลองอีกครั้ง",
    tryAgain: "ทบทวนบทที่ 3",
  }
};
const t = computed(() => translations[currentLanguage.value]);

const questions = [
  { id: 'q1', text: { en: 'Question 1: Placeholder...', th: 'คำถามที่ 1: ...' }, options: ['A', 'B', 'C', 'D'], answer: 'A' },
  { id: 'q2', text: { en: 'Question 2: Placeholder...', th: 'คำถามที่ 2: ...' }, options: ['A', 'B', 'C', 'D'], answer: 'B' },
  { id: 'q3', text: { en: 'Question 3: Placeholder...', th: 'คำถามที่ 3: ...' }, options: ['A', 'B', 'C', 'D'], answer: 'C' },
  { id: 'q4', text: { en: 'Question 4: Placeholder...', th: 'คำถามที่ 4: ...' }, options: ['A', 'B', 'C', 'D'], answer: 'D' },
  { id: 'q5', text: { en: 'Question 5: Placeholder...', th: 'คำถามที่ 5: ...' }, options: ['A', 'B', 'C', 'D'], answer: 'A' },
];

const score = computed(() => {
  return questions.reduce((correctCount, question) => {
    return userAnswers.value[question.id] === question.answer ? correctCount + 1 : correctCount;
  }, 0);
});

const passed = computed(() => score.value >= 4);

function handleSubmit() {
  submitted.value = true;
  if (passed.value) {
    languageStore.setQuiz2Passed();
  }
}

function resetQuiz() {
    userAnswers.value = {};
    submitted.value = false;
    router.push('/app/lesson/3');
}

// Navigation guard to ensure Quiz 1 was passed before taking Quiz 2
onMounted(() => {
  if (!quiz1Passed.value) {
    router.push('/app/lesson/1');
  }
});
</script>

<template>
  <div class="bg-white shadow-lg rounded-xl p-8 max-w-4xl mx-auto">
    <div v-if="!submitted">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ t.title }}</h1>
      <p class="text-gray-500 mb-8">{{ t.subtitle }}</p>

      <form @submit.prevent="handleSubmit" class="space-y-8">
        <div v-for="(q, index) in questions" :key="q.id" class="border-t pt-6">
          <p class="font-semibold text-lg mb-4">{{ index + 1 }}. {{ q.text[currentLanguage] }}</p>
          <div class="space-y-2">
            <label v-for="option in q.options" :key="option" class="flex items-center p-3 rounded-lg border hover:bg-gray-50 cursor-pointer">
              <input type="radio" :name="q.id" :value="option" v-model="userAnswers[q.id]" class="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300">
              <span class="ml-3 text-gray-700">{{ option }}</span>
            </label>
          </div>
        </div>
        <button type="submit" class="w-full bg-indigo-600 text-white font-semibold rounded-lg px-8 py-3 text-lg hover:bg-indigo-700 transition shadow-lg">{{ t.submit }}</button>
      </form>
    </div>

    <!-- Result Screen -->
    <div v-else class="text-center py-8">
        <div v-if="passed">
            <h2 class="text-3xl font-bold text-green-600">{{ t.passedTitle }}</h2>
            <p class="text-gray-600 mt-2 text-lg">{{ t.passedSubtitle }} ({{ score }}/5)</p>
            <router-link to="/app/paywall" class="mt-8 inline-block bg-green-600 text-white font-semibold rounded-lg px-8 py-3 text-lg hover:bg-green-700 transition shadow-lg">{{ t.nextLesson }}</router-link>
        </div>
        <div v-else>
            <h2 class="text-3xl font-bold text-red-600">{{ t.failedTitle }}</h2>
            <p class="text-gray-600 mt-2 text-lg">{{ t.failedSubtitle }} ({{ score }}/5)</p>
            <button @click="resetQuiz" class="mt-8 inline-block bg-red-600 text-white font-semibold rounded-lg px-8 py-3 text-lg hover:bg-red-700 transition shadow-lg">{{ t.tryAgain }}</button>
        </div>
    </div>
  </div>
</template>
