<script setup>
import { ref, computed } from 'vue';
import { getDB, initFirebase } from '../db-service.js';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { languageStore } from '../store.js';

const formData = ref({
  name: '',
  email: '',
  classInterest: '',
  message: '',
});

const isSubmitting = ref(false);
const statusMessage = ref('');
const statusIsError = ref(false);

const currentLanguage = computed(() => languageStore.state.language);

const translations = {
  en: {
    title: 'Request a Free Consultation',
    subtitle: 'Ready to start? Fill out the form below to request a free 15-minute consultation to discuss your learning goals.',
    nameLabel: 'Your Name',
    emailLabel: 'Your Email',
    interestLabel: 'Which class are you interested in?',
    selectOption: 'Please select one',
    notSureOption: 'Not Sure Yet',
    messageLabel: 'Message (Optional)',
    submitButton: 'Submit Request',
    submittingButton: 'Submitting...',
    successMessage: "Thank you! Your request has been sent. I'll get back to you shortly.",
    errorMessage: "Sorry, there was an error sending your request. Please try again."
  },
  th: {
    title: 'ขอนัดเวลาปรึกษาฟรี',
    subtitle: 'พร้อมที่จะเริ่มหรือยัง? กรอกแบบฟอร์มด้านล่างเพื่อขอนัดเวลาปรึกษาฟรี 15 นาทีเพื่อพูดคุยเกี่ยวกับเป้าหมายการเรียนรู้ของคุณ',
    nameLabel: 'ชื่อของคุณ',
    emailLabel: 'อีเมลของคุณ',
    interestLabel: 'คุณสนใจคลาสเรียนใด?',
    selectOption: 'กรุณาเลือก',
    notSureOption: 'ยังไม่แน่ใจ',
    messageLabel: 'ข้อความ (ถ้ามี)',
    submitButton: 'ส่งคำขอ',
    submittingButton: 'กำลังส่ง...',
    successMessage: 'ขอบคุณครับ! คำขอของคุณถูกส่งเรียบร้อยแล้ว ผมจะติดต่อกลับไปเร็วๆ นี้',
    errorMessage: 'ขออภัย เกิดข้อผิดพลาดในการส่งคำขอของคุณ กรุณาลองใหม่อีกครั้ง'
  }
};
const t = computed(() => translations[currentLanguage.value]);

const submitForm = async () => {
  isSubmitting.value = true;
  statusMessage.value = '';
  statusIsError.value = false;

  try {
    await initFirebase();
    const db = getDB();
    if (!db) throw new Error("Database not initialized.");

    const consultationsCol = collection(db, 'consultations');
    await addDoc(consultationsCol, {
      ...formData.value,
      createdAt: serverTimestamp(),
      status: 'new'
    });

    statusMessage.value = t.value.successMessage;
    formData.value = { name: '', email: '', classInterest: '', message: '' };

  } catch (error) {
    console.error("Error submitting consultation:", error);
    statusMessage.value = t.value.errorMessage;
    statusIsError.value = true;
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <div class="bg-white shadow-lg rounded-xl p-8 mt-12">
    <h2 class="text-3xl font-extrabold text-gray-900 mb-6 text-center">{{ t.title }}</h2>
    <p class="text-lg text-gray-600 mb-8 text-center max-w-2xl mx-auto">{{ t.subtitle }}</p>

    <form @submit.prevent="submitForm" class="max-w-xl mx-auto space-y-6">
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700">{{ t.nameLabel }}</label>
        <input v-model="formData.name" type="text" id="name" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 border" required>
      </div>

      <div>
        <label for="email" class="block text-sm font-medium text-gray-700">{{ t.emailLabel }}</label>
        <input v-model="formData.email" type="email" id="email" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 border" required>
      </div>

      <div>
        <label for="classInterest" class="block text-sm font-medium text-gray-700">{{ t.interestLabel }}</label>
        <select v-model="formData.classInterest" id="classInterest" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 border bg-white" required>
          <option disabled value="">{{ t.selectOption }}</option>
          <option>Biz Kid$</option>
          <option>Web Kid$</option>
          <option>Professional English</option>
          <option>{{ t.notSureOption }}</option>
        </select>
      </div>

      <div>
        <label for="message" class="block text-sm font-medium text-gray-700">{{ t.messageLabel }}</label>
        <textarea v-model="formData.message" id="message" rows="4" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 border"></textarea>
      </div>

      <button type="submit" :disabled="isSubmitting" class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:bg-blue-300">
        <span v-if="!isSubmitting">{{ t.submitButton }}</span>
        <span v-else>{{ t.submittingButton }}</span>
      </button>

      <p v-if="statusMessage" class="text-center font-medium" :class="statusIsError ? 'text-red-600' : 'text-green-600'">
        {{ statusMessage }}
      </p>
    </form>
  </div>
</template>
