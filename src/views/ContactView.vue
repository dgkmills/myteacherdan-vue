<script setup>
import { computed } from 'vue';
import { languageStore } from '../store.js';

const currentLanguage = computed(() => languageStore.state.language);
const translations = {
  en: {
    title: "Get in Touch",
    subtitle: "I'm always happy to hear from prospective students and parents. Feel free to reach out with any questions.",
    contactDetails: "Contact Details",
    address: "Address",
    phone: "Phone",
    email: "Email",
    lineId: "Line ID",
    location: "Location",
  },
  th: {
    title: "ติดต่อเรา",
    subtitle: "ฉันยินดีเสมอที่จะรับฟังจากนักเรียนและผู้ปกครองที่สนใจ อย่าลังเลที่จะติดต่อสอบถามได้ตลอดเวลา",
    contactDetails: "รายละเอียดการติดต่อ",
    address: "ที่อยู่",
    phone: "โทรศัพท์",
    email: "อีเมล",
    lineId: "ไลน์ไอดี",
    location: "ที่ตั้ง",
  }
};
const t = computed(() => translations[currentLanguage.value]);
</script>

<template>
  <div class="bg-white shadow-lg rounded-xl p-8 max-w-4xl mx-auto">
    <h1 class="text-4xl font-extrabold text-gray-900 mb-6 text-center">{{ t.title }}</h1>
    <p class="text-lg text-gray-600 mb-12 text-center">{{ t.subtitle }}</p>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
      <div class="space-y-6">
        <h2 class="text-2xl font-bold text-gray-800 border-b pb-2">{{ t.contactDetails }}</h2>
        
        <div class="flex items-start space-x-4">
          <div class="flex-shrink-0 h-8 w-8 mt-1 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center">
            <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          </div>
          <div>
            <h3 class="font-semibold text-gray-700">{{ t.address }}</h3>
            <p class="text-gray-800">237-241 Kai-Laung Road</p>
            <p class="text-gray-800">Banpong, Ratchaburi 70110</p>
          </div>
        </div>

        <div class="flex items-start space-x-4">
          <div class="flex-shrink-0 h-8 w-8 mt-1 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
            <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
          </div>
          <div>
            <h3 class="font-semibold text-gray-700">{{ t.phone }}</h3>
            <a href="tel:+66863331493" class="text-blue-600 hover:underline">+66 86 333 1493</a>
          </div>
        </div>

        <div class="flex items-start space-x-4">
          <div class="flex-shrink-0 h-8 w-8 mt-1 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
            <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
          </div>
          <div>
            <h3 class="font-semibold text-gray-700">{{ t.email }}</h3>
            <a href="mailto:dan@myteacherdan.com" class="text-blue-600 hover:underline">dan@myteacherdan.com</a>
          </div>
        </div>

        <div class="flex items-start space-x-4">
           <div class="flex-shrink-0 h-8 w-8 mt-1 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
             <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 128 128"><path d="M117.33 11.85c-3.1-3.3-7.2-5.1-11.5-5.1-4.3 0-8.4 1.8-11.5 5.1l-6.8 6.8c-1 .9-1.5 2.2-1.5 3.5v2.8h-2.1v-2.8c0-2.3 1-4.6 2.6-6.2l6.8-6.8c4-4.2 9.4-6.5 15.1-6.5s11.1 2.3 15.1 6.5c8.3 8.8 8.3 23.1 0 31.9l-22.1 22.1c-1.6 1.6-3.8 2.6-6.2 2.6H78.8v-2.1h2.8c1.3 0 2.6-.5 3.5-1.5l22.1-22.1c6.5-6.9 6.5-18.1.1-25zM64.43 103.55c-1.6 1.6-3.8 2.6-6.2 2.6h-2.8v2.1h2.8c2.3 0 4.6-1 6.2-2.6l22.1-22.1c8.3-8.8 8.3-23.1 0-31.9-4-4.2-9.4-6.5-15.1-6.5s-11.1 2.3-15.1 6.5l-6.8 6.8c-1.6 1.6-2.6 3.8-2.6 6.2v2.8h2.1v-2.8c0-1.3.5-2.6 1.5-3.5l6.8-6.8c3.1-3.3 7.2-5.1 11.5-5.1s8.4 1.8 11.5 5.1c6.5 6.9 6.5 18.1 0 25l-22.1 22.1zM48.83 62.45c0 1.1-.9 2-2 2h-2.8v-2.1h2.8c.1 0 .2.1.2.1zM34.93 62.45c0 1.1-.9 2-2 2h-2.8v-2.1h2.8c.1 0 .2.1.2.1zM21.13 62.45c0 1.1-.9 2-2 2h-2.8v-2.1h2.8c.1 0 .2.1.2.1z"></path></svg>
           </div>
           <div>
            <h3 class="font-semibold text-gray-700">{{ t.lineId }}</h3>
            <p class="text-gray-800">dgkmills2020</p>
          </div>
        </div>
      </div>
      
      <div>
        <h2 class="text-2xl font-bold text-gray-800 border-b pb-2 mb-6">{{ t.location }}</h2>
        <div class="aspect-w-1 aspect-h-1 rounded-xl overflow-hidden shadow-md border border-gray-200">
          <!-- THE FIX: Updated the Google Maps embed URL to the correct location. -->
           <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3876.81971616425!2d99.8001608148296!3d13.661656790396048!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e31c1f762f0259%3A0x23f7d312989c362d!2s237%20Kai%20Luong%20Rd%2C%20Na%20Mueang%2C%20Ban%20Pong%20District%2C%20Ratchaburi%2070110!5e0!3m2!1sen!2sth"
            width="100%"
            height="100%"
            style="border:0;"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.aspect-w-1 { position: relative; padding-bottom: 75%; }
.aspect-h-1 > iframe { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }
</style>

