<template>
  <div class="bg-white shadow-lg rounded-xl p-8 mt-12">
    <h2 class="text-3xl font-extrabold text-gray-900 mb-6 text-center">Request a Free Consultation</h2>
    <p class="text-lg text-gray-600 mb-8 text-center max-w-2xl mx-auto">
      Ready to start? Fill out the form below to request a free 15-minute consultation to discuss your learning goals.
    </p>

    <form @submit.prevent="submitForm" class="max-w-xl mx-auto space-y-6">
      <!-- Name Input -->
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700">Your Name</label>
        <input v-model="formData.name" type="text" id="name" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 border" required>
      </div>

      <!-- Email Input -->
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700">Your Email</label>
        <input v-model="formData.email" type="email" id="email" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 border" required>
      </div>

      <!-- Class Selection -->
      <div>
        <label for="classInterest" class="block text-sm font-medium text-gray-700">Which class are you interested in?</label>
        <select v-model="formData.classInterest" id="classInterest" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 border bg-white" required>
          <option disabled value="">Please select one</option>
          <option>Biz Kid$</option>
          <option>Web Kid$</option>
          <option>Professional English</option>
          <option>Not Sure Yet</option>
        </select>
      </div>

      <!-- Message Textarea -->
      <div>
        <label for="message" class="block text-sm font-medium text-gray-700">Message (Optional)</label>
        <textarea v-model="formData.message" id="message" rows="4" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 border"></textarea>
      </div>

      <!-- Submit Button -->
      <button type="submit" :disabled="isSubmitting" class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:bg-blue-300">
        <span v-if="!isSubmitting">Submit Request</span>
        <span v-else>Submitting...</span>
      </button>

      <!-- Status Message -->
      <p v-if="statusMessage" class="text-center font-medium" :class="statusIsError ? 'text-red-600' : 'text-green-600'">
        {{ statusMessage }}
      </p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { getDB, initFirebase } from '../db-service.js';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const formData = ref({
  name: '',
  email: '',
  classInterest: '',
  message: '',
});

const isSubmitting = ref(false);
const statusMessage = ref('');
const statusIsError = ref(false);

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
      status: 'new' // To help you track requests in the admin panel
    });

    statusMessage.value = "Thank you! Your request has been sent. I'll get back to you shortly.";
    // Reset form
    formData.value = { name: '', email: '', classInterest: '', message: '' };

  } catch (error) {
    console.error("Error submitting consultation:", error);
    statusMessage.value = "Sorry, there was an error sending your request. Please try again.";
    statusIsError.value = true;
  } finally {
    isSubmitting.value = false;
  }
};
</script>
