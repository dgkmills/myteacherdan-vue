<script setup>
import Slideshow from '../components/Slideshow.vue';

// These static imports work perfectly for single images.
import bizKidsLogo from '../assets/images/bk-logo.jpg';
import webKidsLogo from '../assets/images/wk-logo.png';
import proEnglishLogo from '../assets/images/bp-logo.png';
import teacherDanPortrait from '../assets/images/tdan-great-choice.jpg';
import areesPortfolio from '../assets/images/areethumb.png';
import mattsWorld from '../assets/images/mattsworldthumb.png';

// THE FIX: We need to use `new URL()` to tell Vite how to handle these dynamic image paths in our arrays.
const bizKidsImages = [
  new URL('../assets/images/lemonade2.jpg', import.meta.url).href,
  new URL('../assets/images/lemonade3.jpg', import.meta.url).href,
  new URL('../assets/images/snakes-ladders3.jpg', import.meta.url).href,
  new URL('../assets/images/board-setup.jpg', import.meta.url).href,
  new URL('../assets/images/tdanaction1.jpg', import.meta.url).href,
  new URL('../assets/images/teaching-materials.jpg', import.meta.url).href
];

const webKidsImages = [
  new URL('../assets/images/aree-commit.jpg', import.meta.url).href,
  new URL('../assets/images/areethumb.png', import.meta.url).href,
  new URL('../assets/images/mattsworldthumb.png', import.meta.url).href
];

const proEnglishImages = [
  new URL('../assets/images/adult-class-heads-up1.jpg', import.meta.url).href,
  new URL('../assets/images/adult-class-heads-up2.jpg', import.meta.url).href,
  new URL('../assets/images/adult-class-selfie.jpg', import.meta.url).href,
  new URL('../assets/images/adult-talk.jpg', import.meta.url).href
];


// Emitter to navigate to other pages
const emit = defineEmits(['navigate']);
</script>

<template>
  <div class="bg-white shadow-lg rounded-xl p-8 mb-8 space-y-12">
    <div>
      <h1 class="text-4xl font-extrabold text-gray-900 mb-4 text-center">Your Journey to Fluency Starts Here</h1>
      <p class="text-lg text-gray-600 mb-8 text-center max-w-3xl mx-auto">Achieve your language goals with fun, personalized lessons. Click a card below to find the perfect class for you!</p>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <!-- Biz Kids Card -->
        <div class="flex flex-col bg-white rounded-xl shadow-lg hover:shadow-xl hover:shadow-blue-500/30 border-2 border-blue-200 hover:border-blue-400 transition-all transform hover:-translate-y-1 overflow-hidden">
            <div class="p-4 flex-grow flex items-center justify-center">
                <img :src="bizKidsLogo" alt="Biz Kid$ Logo" class="h-48 md:h-56 object-contain">
            </div>
            <div class="bg-blue-50 text-blue-800 p-4 text-left text-sm space-y-1">
                <p><strong>Age Range:</strong> 4-16</p>
                <p><strong>English Level:</strong> Basic</p>
                <p><strong>Learning Goal:</strong> Everyday & business language</p>
                <p><strong>Feature:</strong> Pop-up stand to practice real sales and make real money.</p>
            </div>
        </div>
        <!-- Web Kids Card -->
        <div class="flex flex-col bg-white rounded-xl shadow-lg hover:shadow-xl hover:shadow-green-500/30 border-2 border-green-200 hover:border-green-400 transition-all transform hover:-translate-y-1 overflow-hidden">
            <div class="p-4 flex-grow flex items-center justify-center">
                <img :src="webKidsLogo" alt="Web Kid$ Logo" class="h-48 md:h-56 object-contain">
            </div>
            <div class="bg-green-50 text-green-800 p-4 text-left text-sm space-y-1">
                <p><strong>Age Range:</strong> 8+</p>
                <p><strong>English Level:</strong> Intermediate</p>
                <p><strong>Learning Goal:</strong> Everyday language & web development</p>
                <p><strong>Feature:</strong> Students build their own website portfolio while learning English.</p>
            </div>
        </div>
        <!-- Pro English Card -->
        <div class="flex flex-col bg-white rounded-xl shadow-lg hover:shadow-xl hover:shadow-purple-500/30 border-2 border-purple-200 hover:border-purple-400 transition-all transform hover:-translate-y-1 overflow-hidden">
            <div class="p-4 flex-grow flex items-center justify-center">
                <img :src="proEnglishLogo" alt="Professional English Logo" class="h-48 md:h-56 object-contain">
            </div>
            <div class="bg-purple-50 text-purple-800 p-4 text-left text-sm space-y-1">
                <p><strong>Age Range:</strong> 18+</p>
                <p><strong>English Level:</strong> Advanced</p>
                <p><strong>Learning Goal:</strong> Business communication</p>
                <p><strong>Feature:</strong> Customized tools for your industry-specific language.</p>
            </div>
        </div>
      </div>

      <div class="bg-gray-200 p-4 rounded-lg border border-gray-300">
        <h2 class="text-xl font-bold text-gray-800 mb-2">Latest Notice</h2>
        <p class="text-gray-700">New student slots are now open! Visit the Schedule page to request a time slot for a free consultation. I look forward to working with you!</p>
      </div>
    </div>
    
    <div class="pt-8 border-t border-gray-200 space-y-12">
      <h1 class="text-4xl font-extrabold text-gray-900 mb-6 text-center">About My Classes & Projects</h1>
      
      <div class="mb-12">
        <h2 class="text-2xl font-bold text-gray-900 mb-4 text-center">About Teacher Dan</h2>
        <div class="flex flex-col md:flex-row items-center md:items-start gap-8 max-w-4xl mx-auto">
            <img :src="teacherDanPortrait" alt="Teacher Dan's Portrait" class="rounded-full shadow-md w-48 h-48 object-cover flex-shrink-0">
            <div class="text-lg text-gray-600 space-y-4">
               <p><strong>Passionate ESL Instructor:</strong> With over 10 years of experience, I create dynamic and engaging learning environments.</p>
               <p><strong>Holistic Approach:</strong> I combine core language practice with creative, project-based learning to empower students and build confidence.</p>
               <p><strong>Tech-Integrated Learning:</strong> My background in web development and AI allows me to integrate modern tools into language education, building future-ready skills for every student.</p>
            </div>
        </div>
      </div>
      
      <div class="space-y-8 max-w-4xl mx-auto">
        <!-- Biz Kid$ Description -->
        <div id="about-bizkids" class="bg-blue-50 rounded-lg p-6 shadow-md border border-blue-200">
            <h3 class="text-xl font-bold text-blue-800 mb-2">Biz Kid$</h3>
            <p class="text-blue-700 mb-4">My flagship business-focused ESL class makes learning English both fun and practical. Students are immersed in a gamified learning environment where they start their own pretend businesses.</p>
            <Slideshow :images="bizKidsImages" />
        </div>
        <!-- Web Kid$ Description -->
        <div id="about-webkids" class="bg-green-50 rounded-lg p-6 shadow-md border border-green-200">
            <h3 class="text-xl font-bold text-green-800 mb-2">Web Kid$</h3>
            <p class="text-green-700 mb-4">An innovative course where students combine English language skills with modern web development. Using platforms like Gemini for assistance, students learn to build a professional online portfolio.</p>
            <Slideshow :images="webKidsImages" />
        </div>
        <!-- Professional English Description -->
        <div id="about-proenglish" class="bg-purple-50 rounded-lg p-6 shadow-md border border-purple-200">
            <h3 class="text-xl font-bold text-purple-800 mb-2">Professional English</h3>
            <p class="text-purple-700 mb-4">This curriculum is designed for businesses and adults seeking to improve workplace communication, tailored to your company's needs.</p>
            <Slideshow :images="proEnglishImages" />
        </div>
      </div>
      
      <div id="student-projects" class="pt-8 border-t border-gray-200">
        <h2 class="text-2xl font-bold text-gray-900 mb-4 text-center">Student Projects</h2>
        <p class="text-lg text-gray-600 mb-8 text-center max-w-3xl mx-auto">I'm incredibly proud of my students' work. Here are some of their websites, created to apply skills in a real-world, creative way.</p>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <a href="https://dgkmills.github.io/Aree/" target="_blank" class="block bg-gray-50 rounded-lg p-6 shadow-md border border-gray-200 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                <img :src="areesPortfolio" alt="Aree's Portfolio" class="rounded-md mb-4 w-full h-48 object-cover">
                <h3 class="text-xl font-semibold text-gray-900 mb-2">Aree's Website</h3>
                <p class="text-gray-600">A personal website showcasing Aree's new skills and interests.</p>
            </a>
            <a href="https://mattsworld.dgkmills.com" target="_blank" class="block bg-gray-50 rounded-lg p-6 shadow-md border border-gray-200 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                <img :src="mattsWorld" alt="Matt's World Project" class="rounded-md mb-4 w-full h-48 object-cover">
                <h3 class="text-xl font-semibold text-gray-900 mb-2">Matt's World</h3>
                <p class="text-gray-600">An interactive world for practicing English vocabulary.</p>
            </a>
            <div class="bg-gray-50 rounded-lg p-6 shadow-md border border-gray-200">
                <img src="https://placehold.co/400x250/D1D5DB/9CA3AF?text=Coming+Soon" alt="Student Project Coming Soon" class="rounded-md mb-4 w-full h-48 object-cover">
                <h3 class="text-xl font-semibold text-gray-900 mb-2">More Projects Coming Soon!</h3>
                <p class="text-gray-600">Check back later to see more amazing work from my students.</p>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

