<template>
  <div class="bg-gray-50 text-gray-800 p-4 sm:p-6 lg:p-8">
    <!-- Header -->
    <header class="bg-white shadow-sm rounded-lg mb-8">
      <div class="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 class="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <div class="flex items-center gap-4">
          <router-link to="/tracker" class="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition">
            Go to Student Tracker →
          </router-link>
        </div>
      </div>
    </header>

    <div v-if="isLoading" class="text-center py-12">
      <p class="text-lg text-gray-600">Connecting to the database...</p>
    </div>

    <main v-else class="max-w-7xl mx-auto">
      <!-- Grid Layout -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Students Column -->
        <div class="bg-white p-6 rounded-lg shadow">
          <div class="flex flex-wrap justify-between items-center mb-4 gap-4">
            <h2 class="text-xl font-semibold">Students</h2>
            <div class="flex gap-2">
              <button @click="exportStudents" class="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition shadow-sm text-sm">Export Students</button>
              <button @click="isAddStudentModalOpen = true" class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition shadow-sm text-sm">Add Student</button>
            </div>
          </div>
          <div class="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
             <div v-if="students.length === 0" class="text-gray-500 text-center py-4">No students added yet.</div>
             <div v-for="student in students" :key="student.id" class="p-3 border rounded-md">
                <div class="flex justify-between items-start">
                    <div>
                        <p class="font-medium">{{ student.name }}</p>
                        <p class="text-xs text-gray-500 font-mono break-all">ID: {{ student.id }}</p>
                        <p class="text-sm" :class="getBundleColor(student.bundleClassesRemaining)">Bundle Classes: {{ student.bundleClassesRemaining || 0 }}</p>
                    </div>
                    <div class="flex items-center space-x-2 flex-shrink-0">
                        <button @click="addBundle(student)" class="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full hover:bg-blue-200">Add 10</button>
                        <button @click="confirmDeleteStudent(student)" class="bg-red-100 text-red-800 text-xs font-medium px-3 py-1 rounded-full hover:bg-red-200">Delete</button>
                    </div>
                </div>
                <!-- Notes Section -->
                <div class="mt-2 pt-2 border-t border-gray-100">
                    <p class="text-xs text-gray-600 font-medium mb-1">Notes:</p>
                    <p v-if="student.notes" class="text-sm text-gray-700 whitespace-pre-wrap">{{ student.notes }}</p>
                    <p v-else class="text-sm text-gray-400 italic">No notes for this student.</p>
                    <button @click="openEditNotesModal(student)" class="text-indigo-600 hover:text-indigo-800 text-xs font-medium mt-1">Edit Notes</button>
                </div>
            </div>
          </div>
        </div>

        <!-- Classes Column -->
        <div class="bg-white p-6 rounded-lg shadow">
          <div class="flex flex-wrap justify-between items-center mb-4 gap-4">
            <h2 class="text-xl font-semibold">Upcoming Classes</h2>
            <div class="flex gap-2">
                <button @click="exportClasses" class="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition shadow-sm text-sm">Export Classes</button>
                <button @click="isAddClassModalOpen = true" class="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition shadow-sm text-sm">Schedule Class</button>
            </div>
          </div>
          <div class="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
            <div v-if="classes.length === 0" class="text-gray-500 text-center py-4">No classes scheduled.</div>
            <div v-for="cls in classes" :key="cls.id" class="p-3 border rounded-md">
                 <div class="flex justify-between items-start">
                    <div>
                        <p class="font-medium">{{ formatDate(cls.date) }}</p>
                        <p class="text-sm text-gray-600">Time: {{ cls.time }}</p>
                         <div class="flex items-center mt-1">
                            <span class="text-sm text-gray-600 mr-2">Attendees: {{ cls.attendees ? cls.attendees.length : 0 }}</span>
                            <span class="text-sm font-semibold text-blue-700">Gross: {{ calculateGrossSales(cls).toLocaleString() }} THB</span>
                        </div>
                    </div>
                    <div class="text-right">
                         <div class="flex items-center justify-end space-x-2 mb-2">
                            <span class="text-xs font-semibold px-2 py-1 rounded-full" :class="getClassTypeColor(cls.classType)">{{ cls.classType === 'private' ? 'Private' : 'Group' }}</span>
                            <button @click="confirmDeleteClass(cls)" class="bg-red-600 text-white text-xs px-2 py-1 rounded-md hover:bg-red-700">Delete</button>
                        </div>
                        <button @click="openAttendanceModal(cls)" class="bg-gray-600 text-white text-sm px-3 py-2 rounded-md hover:bg-gray-700 w-full">Manage Attendance</button>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Modals -->
    <Teleport to="body">
        <!-- Add Student Modal -->
        <div v-if="isAddStudentModalOpen" @click.self="isAddStudentModalOpen = false" class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div class="bg-white w-full max-w-md p-6 rounded-lg shadow-xl">
                <h3 class="text-lg font-medium mb-4">Add New Student</h3>
                <form @submit.prevent="handleAddStudent">
                    <input v-model="newStudent.name" type="text" placeholder="Student Name" class="w-full border-gray-300 rounded-md shadow-sm mb-4" required>
                    <input v-model.number="newStudent.bundleClasses" type="number" placeholder="Initial Bundle Classes (e.g., 10)" class="w-full border-gray-300 rounded-md shadow-sm mb-4" required>
                    <textarea v-model="newStudent.notes" placeholder="Add notes (e.g., parent contact, allergies, etc.)" rows="3" class="w-full border-gray-300 rounded-md shadow-sm mb-4"></textarea>
                    <div class="flex justify-end space-x-2">
                        <button type="button" @click="isAddStudentModalOpen = false" class="bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300">Cancel</button>
                        <button type="submit" class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">Save</button>
                    </div>
                </form>
            </div>
        </div>
        
        <!-- Edit Notes Modal -->
        <div v-if="isEditNotesModalOpen" @click.self="isEditNotesModalOpen = false" class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div class="bg-white w-full max-w-md p-6 rounded-lg shadow-xl">
                <h3 class="text-lg font-medium mb-4">Edit Notes for {{ editingStudentName }}</h3>
                <form @submit.prevent="handleUpdateNotes">
                    <textarea v-model="editingNotesText" rows="5" class="w-full border-gray-300 rounded-md shadow-sm mb-4"></textarea>
                    <div class="flex justify-end space-x-2">
                        <button type="button" @click="isEditNotesModalOpen = false" class="bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300">Cancel</button>
                        <button type="submit" class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">Save Notes</button>
                    </div>
                </form>
            </div>
        </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { getDB, initFirebase } from '../db-service.js';
import { collection, onSnapshot, doc, addDoc, updateDoc, getDoc, query, orderBy, deleteDoc, writeBatch } from 'firebase/firestore';
import dayjs from 'dayjs';

// --- State ---
const isLoading = ref(true);
const students = ref([]);
const classes = ref([]);
const isAddStudentModalOpen = ref(false);
const newStudent = ref({ name: '', bundleClasses: 0, notes: '' });
const isEditNotesModalOpen = ref(false);
const editingStudentId = ref(null);
const editingNotesText = ref('');
const editingStudentName = computed(() => students.value.find(s => s.id === editingStudentId.value)?.name || '');

// --- Firebase ---
let db;
const appId = 'my-teacher-dan-schedule-9bd19';
const prices = { groupBundle: 425, groupNoBundle: 500, private: 650 };
let studentsCol, classesCol;

onMounted(async () => {
    await initFirebase();
    db = getDB();
    if (db) {
        studentsCol = collection(db, `students`);
        classesCol = collection(db, `classes`);
        setupListeners();
    } else {
        console.error("Firestore not initialized");
        isLoading.value = false;
    }
});

function setupListeners() {
    const studentsQuery = query(studentsCol, orderBy("name"));
    onSnapshot(studentsQuery, snapshot => {
        students.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        isLoading.value = false;
    }, error => console.error("Error fetching students:", error));

    const classesQuery = query(classesCol, orderBy("date", "desc"));
    onSnapshot(classesQuery, snapshot => {
        classes.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }, error => console.error("Error fetching classes:", error));
}


// --- Student Methods ---
const handleAddStudent = async () => {
    if (newStudent.value.name.trim()) {
        try {
            await addDoc(studentsCol, { 
                name: newStudent.value.name, 
                bundleClassesRemaining: newStudent.value.bundleClasses || 0,
                notes: newStudent.value.notes || ''
            });
            newStudent.value = { name: '', bundleClasses: 0, notes: '' };
            isAddStudentModalOpen.value = false;
        } catch (error) {
            console.error("Error adding student:", error);
            alert("Could not add student.");
        }
    }
};

const addBundle = async (student) => {
    const studentRef = doc(db, studentsCol.path, student.id);
    const currentBundles = student.bundleClassesRemaining || 0;
    try {
        await updateDoc(studentRef, { bundleClassesRemaining: currentBundles + 10 });
    } catch (error) {
        console.error("Error adding bundle:", error);
        alert("Could not add bundle classes.");
    }
};

const confirmDeleteStudent = (student) => {
    if (confirm(`This will permanently delete ${student.name}. Are you sure?`)) {
        deleteStudent(student.id);
    }
};

const deleteStudent = async (studentId) => {
    try {
        await deleteDoc(doc(db, studentsCol.path, studentId));
    } catch (error) {
        console.error("Error deleting student:", error);
        alert("Could not delete student.");
    }
};

// --- Notes Methods ---
const openEditNotesModal = (student) => {
    editingStudentId.value = student.id;
    editingNotesText.value = student.notes || '';
    isEditNotesModalOpen.value = true;
};

const handleUpdateNotes = async () => {
    if (editingStudentId.value === null) return;
    const studentRef = doc(db, studentsCol.path, editingStudentId.value);
    try {
        await updateDoc(studentRef, { notes: editingNotesText.value });
        isEditNotesModalOpen.value = false;
        editingStudentId.value = null;
        editingNotesText.value = '';
    } catch (error) {
        console.error("Error updating notes:", error);
        alert("Could not update notes.");
    }
};


// --- Class Methods ---
const confirmDeleteClass = (cls) => {
    if (confirm(`This will delete the class on ${formatDate(cls.date)} and refund any used bundle credits. Are you sure?`)) {
        deleteClass(cls);
    }
}

const deleteClass = async (cls) => {
    const classRef = doc(db, classesCol.path, cls.id);
    const attendees = cls.attendees || [];
    const batch = writeBatch(db);
    
    attendees.forEach(attendee => {
        if (attendee.paymentMethod === 'groupBundle') {
            const student = students.value.find(s => s.id === attendee.studentId);
            if (student) {
                const studentRef = doc(db, studentsCol.path, student.id);
                batch.update(studentRef, { bundleClassesRemaining: (student.bundleClassesRemaining || 0) + 1 });
            }
        }
    });

    batch.delete(classRef);
    
    try {
        await batch.commit();
    } catch (error) {
        console.error("Error deleting class:", error);
        alert("Could not delete class.");
    }
};


// --- Export Methods ---
const exportStudents = () => {
    if(students.value.length === 0) return alert("No students to export.");
    const headers = ["Student ID", "Student Name", "Remaining Bundle Classes", "Notes"];
    const data = students.value.map(s => {
        const notes = `"${(s.notes || '').replace(/"/g, '""')}"`;
        return [s.id, `"${s.name}"`, s.bundleClassesRemaining || 0, notes];
    });
    exportCsv(headers, data, "students_export");
}

const exportClasses = () => {
    if(classes.value.length === 0) return alert("No classes to export.");
    const headers = ["Class Date", "Class Time", "Class Type", "Student Name", "Payment Method", "Amount Paid (THB)"];
    const data = [];

    classes.value.forEach(cls => {
        if (cls.attendees && cls.attendees.length > 0) {
            cls.attendees.forEach(attendee => {
                const student = students.value.find(s => s.id === attendee.studentId);
                const studentName = student ? student.name : 'Unknown Student';
                let paymentMethodDisplay = 'N/A', amountPaid = 0;
                
                switch (attendee.paymentMethod) {
                    case 'groupBundle': paymentMethodDisplay = 'Bundle'; amountPaid = prices.groupBundle; break;
                    case 'groupNoBundle': paymentMethodDisplay = 'No Bundle'; amountPaid = prices.groupNoBundle; break;
                    case 'private': paymentMethodDisplay = 'Private'; amountPaid = prices.private; break;
                }
                const classTypeDisplay = cls.classType === 'private' ? 'Private' : 'Group';
                data.push([`"${dayjs(cls.date).format('YYYY-MM-DD')}"`, `"${cls.time}"`, `"${classTypeDisplay}"`, `"${studentName}"`, `"${paymentMethodDisplay}"`, amountPaid]);
            });
        }
    });
    exportCsv(headers, data, "class_attendance_export");
}

function exportCsv(headers, data, filename) {
    let csvContent = "data:text/csv;charset=utf-8," + headers.join(",") + "\r\n";
    csvContent += data.map(row => row.join(",")).join("\r\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${filename}_${dayjs().format('YYYY-MM-DD')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}


// --- Computed & Helpers ---
const getBundleColor = (count) => {
    const classesLeft = count || 0;
    if (classesLeft > 3) return 'text-green-600';
    if (classesLeft > 0) return 'text-yellow-600';
    return 'text-red-600';
};

const getClassTypeColor = (type) => {
    return type === 'private' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800';
}

const formatDate = (dateString) => {
    return dayjs(dateString).format('dddd, MMMM D, YYYY');
}

const calculateGrossSales = (cls) => {
    if (!cls.attendees) return 0;
    return cls.attendees.reduce((total, attendee) => {
        if(attendee.paymentMethod === 'groupBundle') return total + prices.groupBundle;
        if(attendee.paymentMethod === 'groupNoBundle') return total + prices.groupNoBundle;
        if(attendee.paymentMethod === 'private') return total + prices.private;
        return total;
    }, 0);
};

// Placeholder for future implementation
const isAddClassModalOpen = ref(false);
const openAttendanceModal = (cls) => alert(`Managing attendance for ${formatDate(cls.date)}... \n(Full modal functionality to be built)`);
</script>

