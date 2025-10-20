<script setup>
import { computed } from 'vue';
import { languageStore } from '../store.js';

const currentLanguage = computed(() => languageStore.state.language);
const translations = {
  en: {
    title: "Tools for Learning",
    subtitle: "These interactive tools are great for practicing your English skills. They also demonstrate the type of projects students learn to build in my Web Kid$ class.",
    dialogueTitle: "Dialogue Practice Tool",
    dialogueDesc: "Practice your conversation skills. This tool helps you generate and practice real-world dialogues.",
    pronunciationTitle: "Pronunciation Practice Tool",
    pronunciationDesc: "Improve your pronunciation. Get instant feedback on your spoken English and practice tricky sounds."
  },
  th: {
    title: "เครื่องมือสำหรับการเรียนรู้",
    subtitle: "เครื่องมืออินเทอร์แอคทีฟเหล่านี้เหมาะสำหรับการฝึกฝนทักษะภาษาอังกฤษของคุณ นอกจากนี้ยังเป็นตัวอย่างของโปรเจกต์ที่นักเรียนจะได้เรียนรู้ในคลาส Web Kid$ ของฉัน",
    dialogueTitle: "เครื่องมือฝึกบทสนทนา",
    dialogueDesc: "ฝึกฝนทักษะการสนทนาของคุณ เครื่องมือนี้ช่วยให้คุณสร้างและฝึกฝนบทสนทนาในชีวิตจริง",
    pronunciationTitle: "เครื่องมือฝึกการออกเสียง",
    pronunciationDesc: "ปรับปรุงการออกเสียงของคุณ รับผลตอบรับทันทีเกี่ยวกับการพูดภาษาอังกฤษและฝึกฝนเสียงที่ยาก"
  }
};
const t = computed(() => translations[currentLanguage.value]);
</script>

<template>
  <div class="bg-white shadow-lg rounded-xl p-8">
    <h1 class="text-4xl font-extrabold text-gray-900 mb-6 text-center">{{ t.title }}</h1>
    <p class="text-lg text-gray-600 mb-12 text-center max-w-3xl mx-auto">{{ t.subtitle }}</p>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div class="bg-gray-50 rounded-xl p-6 shadow-md border border-gray-200 flex flex-col">
        <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ t.dialogueTitle }}</h3>
        <p class="text-gray-600 mb-4 flex-grow">{{ t.dialogueDesc }}</p>
        <div class="aspect-w-1 aspect-h-1">
          <iframe src="https://dialogue.danmills.dev" title="Dialogue Generation Tool" allow="microphone" class="w-full h-full rounded-lg border border-gray-300"></iframe>
        </div>
      </div>
      <div class="bg-gray-50 rounded-xl p-6 shadow-md border border-gray-200 flex flex-col">
        <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ t.pronunciationTitle }}</h3>
        <p class="text-gray-600 mb-4 flex-grow">{{ t.pronunciationDesc }}</p>
        <div class="aspect-w-1 aspect-h-1">
          <iframe src="https://pronunciation.danmills.dev" title="Pronunciation Practice Tool" allow="microphone" class="w-full h-full rounded-lg border border-gray-300"></iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.aspect-w-1 { position: relative; padding-bottom: 100%; }
.aspect-h-1 > iframe { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }
</style>
