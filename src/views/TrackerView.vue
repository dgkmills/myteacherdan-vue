<template>
  <div class="bg-white shadow-lg rounded-xl p-8 max-w-2xl mx-auto">
    <h1 class="text-4xl font-extrabold text-gray-900 mb-6 text-center">Class Package Tracker</h1>
    <p class="text-lg text-gray-600 mb-8 text-center">
      Enter the unique Student ID provided by Teacher Dan to view your class package progress.
    </p>
    <form @submit.prevent="checkProgress" class="space-y-4 max-w-lg mx-auto mb-8">
      <div>
        <label for="studentIdInput" class="block text-sm font-medium text-gray-700">Your Student ID</label>
        <input v-model="studentIdInput" type="text" id="studentIdInput" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border" required>
      </div>
      <button type="submit" :disabled="isLoading" class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:bg-blue-300">
        <span v-if="!isLoading">Check Progress</span>
        <span v-else>Loading...</span>
      </button>
    </form>
    
    <p v-if="statusMessage" class="text-center font-medium" :class="statusIsError ? 'text-red-600' : 'text-green-600'">
        {{ statusMessage }}
    </p>

    <div v-if="studentData" class="mt-8 pt-8 border-t border-gray-200">
      <h2 class="text-2xl font-bold text-gray-900 mb-4 text-center">{{ studentData.name }}</h2>
      <div class="space-y-4">
        <div class="p-4 rounded-lg bg-green-100 text-center">
          <p class="font-medium text-green-800">Classes Remaining</p>
          <p class="text-4xl font-bold text-green-700 mt-2">{{ studentData.bundleClassesRemaining || 0 }}</p>
        </div>
        <div v-if="classHistory.length > 0" class="p-4 rounded-lg bg-gray-100">
          <p class="font-medium text-gray-800">Class History</p>
          <ul class="text-sm text-gray-700 mt-2 list-disc list-inside space-y-1">
            <li v-for="(cls, index) in classHistory" :key="index">
              {{ formatDate(cls.date) }} - {{ cls.time }} ({{ cls.classType }})
            </li>
          </ul>
        </div>
        <div v-else class="p-4 rounded-lg bg-gray-100 text-center">
            <p class="italic text-gray-500">No class history found.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { getDB, initFirebase } from '../db-service.js';
import { doc, getDoc, collection, getDocs, query, where } from 'firebase/firestore';
import dayjs from 'dayjs';

const studentIdInput = ref('');
const isLoading = ref(false);
const statusMessage = ref('');
const statusIsError = ref(false);
const studentData = ref(null);
const classHistory = ref([]);

let db;

const checkProgress = async () => {
    isLoading.value = true;
    statusMessage.value = '';
    statusIsError.value = false;
    studentData.value = null;
    classHistory.value = [];

    if (!studentIdInput.value.trim()) {
        statusMessage.value = "Please enter a Student ID.";
        statusIsError.value = true;
        isLoading.value = false;
        return;
    }

    try {
        if (!db) {
            await initFirebase();
            db = getDB();
        }
        
        const studentRef = doc(db, 'students', studentIdInput.value.trim());
        const studentSnap = await getDoc(studentRef);

        if (studentSnap.exists()) {
            studentData.value = studentSnap.data();
            
            // Fetch class history
            const classesCol = collection(db, 'classes');
            const q = query(classesCol, where("attendees", "array-contains", { studentId: studentIdInput.value.trim(), paymentMethod: 'groupBundle'}));
            const querySnapshot = await getDocs(q);
            const history = [];
            querySnapshot.forEach((doc) => {
                history.push(doc.data());
            });
            // Also check for other payment methods if needed
            classHistory.value = history.sort((a,b) => new Date(b.date) - new Date(a.date));

        } else {
            statusMessage.value = "Student ID not found. Please check the ID and try again.";
            statusIsError.value = true;
        }

    } catch (error) {
        console.error("Error fetching student data:", error);
        statusMessage.value = "An error occurred while fetching your data. Please try again later.";
        statusIsError.value = true;
    } finally {
        isLoading.value = false;
    }
};

const formatDate = (dateString) => {
    return dayjs(dateString).format('MMMM D, YYYY');
}
</script>
```
