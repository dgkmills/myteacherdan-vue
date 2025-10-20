<script setup>
import { computed } from 'vue';
import Slideshow from '../components/Slideshow.vue';
import { languageStore } from '../store.js';

// Image imports
import bizKidsLogo from '../assets/images/bk-logo.jpg';
import webKidsLogo from '../assets/images/wk-logo.png';
import proEnglishLogo from '../assets/images/bp-logo.png';
import teacherDanPortrait from '../assets/images/tdan-great-choice.jpg';
import areesPortfolio from '../assets/images/areethumb.png';
import mattsWorld from '../assets/images/mattsworldthumb.png';

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

const currentLanguage = computed(() => languageStore.state.language);

const translations = {
  en: {
    title: "Your Journey to Fluency Starts Here",
    subtitle: "Achieve your language goals with fun, personalized lessons. Click a card below to find the perfect class for you!",
    bizKids: {
        age: "4-16",
        level: "Basic",
        goal: "Everyday & business language",
        feature: "Pop-up stand to practice real sales and make real money."
    },
    webKids: {
        age: "8+",
        level: "Intermediate",
        goal: "Everyday language & web development",
        feature: "Students build their own website portfolio while learning English."
    },
    proEnglish: {
        age: "18+",
        level: "Advanced",
        goal: "Business communication",
        feature: "Customized tools for your industry-specific language."
    },
    noticeTitle: "Latest Notice",
    noticeText: "New student slots are now open! Visit the Schedule page to request a time slot for a free consultation. I look forward to working with you!",
    aboutTitle: "About My Classes & Projects",
    aboutDanTitle: "About Teacher Dan",
    danDesc1: "<strong>Passionate ESL Instructor:</strong> With over 10 years of experience, I create dynamic and engaging learning environments.",
    danDesc2: "<strong>Holistic Approach:</strong> I combine core language practice with creative, project-based learning to empower students and build confidence.",
    danDesc3: "<strong>Tech-Integrated Learning:</strong> My background in web development and AI allows me to integrate modern tools into language education, building future-ready skills for every student.",
    bizKidsTitle: "Biz Kid$",
    bizKidsDesc: "My flagship business-focused ESL class makes learning English both fun and practical. Students are immersed in a gamified learning environment where they start their own pretend businesses.",
    webKidsTitle: "Web Kid$",
    webKidsDesc: "An innovative course where students combine English language skills with modern web development. Using platforms like Gemini for assistance, students learn to build a professional online portfolio.",
    proEnglishTitle: "Professional English",
    proEnglishDesc: "This curriculum is designed for businesses and adults seeking to improve workplace communication, tailored to your company's needs.",
    studentProjectsTitle: "Student Projects",
    studentProjectsDesc: "I'm incredibly proud of my students' work. Here are some of their websites, created to apply skills in a real-world, creative way.",
    areeProjectTitle: "Aree's Website",
    areeProjectDesc: "A personal website showcasing Aree's new skills and interests.",
    mattsProjectTitle: "Matt's World",
    mattsProjectDesc: "An interactive world for practicing English vocabulary.",
    comingSoonTitle: "More Projects Coming Soon!",
    comingSoonDesc: "Check back later to see more amazing work from my students."
  },
  th: {
    title: "เส้นทางสู่ความคล่องแคล่วเริ่มต้นที่นี่",
    subtitle: "บรรลุเป้าหมายทางภาษาของคุณด้วยบทเรียนที่สนุกและเป็นส่วนตัว คลิกการ์ดด้านล่างเพื่อค้นหาคลาสที่สมบูรณ์แบบสำหรับคุณ!",
    bizKids: {
        age: "4-16",
        level: "พื้นฐาน",
        goal: "ภาษาในชีวิตประจำวันและธุรกิจ",
        feature: "มีร้านค้า Pop-up เพื่อฝึกการขายจริงและสร้างรายได้จริง"
    },
    webKids: {
        age: "8+",
        level: "ระดับกลาง",
        goal: "ภาษาในชีวิตประจำวันและการพัฒนาเว็บ",
        feature: "นักเรียนสร้างพอร์ตโฟลิโอเว็บไซต์ของตนเองพร้อมเรียนภาษาอังกฤษ"
    },
    proEnglish: {
        age: "18+",
        level: "ขั้นสูง",
        goal: "การสื่อสารทางธุรกิจ",
        feature: "เครื่องมือที่ปรับให้เหมาะกับภาษาเฉพาะทางในอุตสาหกรรมของคุณ"
    },
    noticeTitle: "ประกาศล่าสุด",
    noticeText: "เปิดรับนักเรียนใหม่แล้ว! ไปที่หน้าตารางเรียนเพื่อขอนัดเวลาให้คำปรึกษาฟรี 15 นาที ผมหวังว่าจะได้ร่วมงานกับคุณ!",
    aboutTitle: "เกี่ยวกับคลาสและโปรเจกต์ของฉัน",
    aboutDanTitle: "เกี่ยวกับครูแดน",
    danDesc1: "<strong>ผู้สอน ESL ที่มีความกระตือรือร้น:</strong> ด้วยประสบการณ์กว่า 10 ปี ผมสร้างสภาพแวดล้อมการเรียนรู้ที่มีชีวิตชีวาและน่าสนใจ",
    danDesc2: "<strong>แนวทางแบบองค์รวม:</strong> ผมผสมผสานการฝึกฝนภาษาหลักเข้ากับการเรียนรู้ผ่านโปรเจกต์ที่สร้างสรรค์เพื่อเสริมสร้างศักยภาพและความมั่นใจของนักเรียน",
    danDesc3: "<strong>การเรียนรู้ที่ผสมผสานเทคโนโลยี:</strong> ประสบการณ์ด้านการพัฒนาเว็บและ AI ช่วยให้ผมสามารถนำเครื่องมือที่ทันสมัยมาใช้ในการสอนภาษา เพื่อสร้างทักษะที่พร้อมสำหรับอนาคตให้กับนักเรียนทุกคน",
    bizKidsTitle: "บิซ คิดส์",
    bizKidsDesc: "คลาสเรียน ESL ที่เน้นธุรกิจซึ่งเป็นหลักสูตรเด่นของผม ทำให้การเรียนภาษาอังกฤษเป็นเรื่องสนุกและใช้ได้จริง นักเรียนจะได้ดำดิ่งสู่สภาพแวดล้อมการเรียนรู้แบบเกมที่พวกเขาสร้างธุรกิจจำลองของตัวเอง",
    webKidsTitle: "เว็บ คิดส์",
    webKidsDesc: "หลักสูตรนวัตกรรมที่นักเรียนจะได้ผสมผสานทักษะภาษาอังกฤษเข้ากับการพัฒนาเว็บสมัยใหม่ โดยใช้แพลตฟอร์มอย่าง Gemini เป็นผู้ช่วย นักเรียนจะได้เรียนรู้การสร้างพอร์ตฟอลิโอออนไลน์อย่างมืออาชีพ",
    proEnglishTitle: "ภาษาอังกฤษเพื่อธุรกิจ",
    proEnglishDesc: "หลักสูตรนี้ออกแบบมาสำหรับธุรกิจและผู้ใหญ่ที่ต้องการพัฒนาการสื่อสารในที่ทำงาน โดยปรับให้เข้ากับความต้องการของบริษัทของคุณ",
    studentProjectsTitle: "โปรเจกต์ของนักเรียน",
    studentProjectsDesc: "ผมภูมิใจในผลงานของนักเรียนมาก นี่คือส่วนหนึ่งของเว็บไซต์ที่พวกเขาสร้างขึ้นเพื่อนำทักษะไปใช้ในโลกแห่งความเป็นจริงอย่างสร้างสรรค์",
    areeProjectTitle: "เว็บไซต์ของอารี",
    areeProjectDesc: "เว็บไซต์ส่วนตัวที่จัดแสดงทักษะและความสนใจใหม่ๆ ของอารี",
    mattsProjectTitle: "โลกของแมตต์",
    mattsProjectDesc: "โลกอินเทอร์แอคทีฟสำหรับการฝึกคำศัพท์ภาษาอังกฤษ",
    comingSoonTitle: "โปรเจกต์เพิ่มเติมเร็วๆ นี้!",
    comingSoonDesc: "กลับมาตรวจสอบอีกครั้งเพื่อดูผลงานที่น่าทึ่งของนักเรียนของฉัน"
  }
};

const t = computed(() => translations[currentLanguage.value]);
</script>

<template>
  <div class="bg-white shadow-lg rounded-xl p-8 mb-8 space-y-12">
    <div>
      <h1 class="text-4xl font-extrabold text-gray-900 mb-4 text-center">{{ t.title }}</h1>
      <p class="text-lg text-gray-600 mb-8 text-center max-w-3xl mx-auto">{{ t.subtitle }}</p>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <!-- Biz Kids Card -->
        <div class="flex flex-col bg-white rounded-xl shadow-lg hover:shadow-xl hover:shadow-blue-500/30 border-2 border-blue-200 hover:border-blue-400 transition-all transform hover:-translate-y-1 overflow-hidden">
            <div class="p-4 flex-grow flex items-center justify-center">
                <img :src="bizKidsLogo" alt="Biz Kid$ Logo" class="h-48 md:h-56 object-contain">
            </div>
            <div class="bg-blue-50 text-blue-800 p-4 text-left text-sm space-y-1">
                <p><strong>{{ currentLanguage === 'en' ? 'Age Range' : 'ช่วงอายุ' }}:</strong> {{ t.bizKids.age }}</p>
                <p><strong>{{ currentLanguage === 'en' ? 'English Level' : 'ระดับภาษาอังกฤษ' }}:</strong> {{ t.bizKids.level }}</p>
                <p><strong>{{ currentLanguage === 'en' ? 'Learning Goal' : 'เป้าหมายการเรียนรู้' }}:</strong> {{ t.bizKids.goal }}</p>
                <p><strong>{{ currentLanguage === 'en' ? 'Feature' : 'จุดเด่น' }}:</strong> {{ t.bizKids.feature }}</p>
            </div>
        </div>
        <!-- Web Kids Card -->
        <div class="flex flex-col bg-white rounded-xl shadow-lg hover:shadow-xl hover:shadow-green-500/30 border-2 border-green-200 hover:border-green-400 transition-all transform hover:-translate-y-1 overflow-hidden">
            <div class="p-4 flex-grow flex items-center justify-center">
                <img :src="webKidsLogo" alt="Web Kid$ Logo" class="h-48 md:h-56 object-contain">
            </div>
            <div class="bg-green-50 text-green-800 p-4 text-left text-sm space-y-1">
                <p><strong>{{ currentLanguage === 'en' ? 'Age Range' : 'ช่วงอายุ' }}:</strong> {{ t.webKids.age }}</p>
                <p><strong>{{ currentLanguage === 'en' ? 'English Level' : 'ระดับภาษาอังกฤษ' }}:</strong> {{ t.webKids.level }}</p>
                <p><strong>{{ currentLanguage === 'en' ? 'Learning Goal' : 'เป้าหมายการเรียนรู้' }}:</strong> {{ t.webKids.goal }}</p>
                <p><strong>{{ currentLanguage === 'en' ? 'Feature' : 'จุดเด่น' }}:</strong> {{ t.webKids.feature }}</p>
            </div>
        </div>
        <!-- Pro English Card -->
        <div class="flex flex-col bg-white rounded-xl shadow-lg hover:shadow-xl hover:shadow-purple-500/30 border-2 border-purple-200 hover:border-purple-400 transition-all transform hover:-translate-y-1 overflow-hidden">
            <div class="p-4 flex-grow flex items-center justify-center">
                <img :src="proEnglishLogo" alt="Professional English Logo" class="h-48 md:h-56 object-contain">
            </div>
            <div class="bg-purple-50 text-purple-800 p-4 text-left text-sm space-y-1">
                <p><strong>{{ currentLanguage === 'en' ? 'Age Range' : 'ช่วงอายุ' }}:</strong> {{ t.proEnglish.age }}</p>
                <p><strong>{{ currentLanguage === 'en' ? 'English Level' : 'ระดับภาษาอังกฤษ' }}:</strong> {{ t.proEnglish.level }}</p>
                <p><strong>{{ currentLanguage === 'en' ? 'Learning Goal' : 'เป้าหมายการเรียนรู้' }}:</strong> {{ t.proEnglish.goal }}</p>
                <p><strong>{{ currentLanguage === 'en' ? 'Feature' : 'จุดเด่น' }}:</strong> {{ t.proEnglish.feature }}</p>
            </div>
        </div>
      </div>

      <div class="bg-gray-200 p-4 rounded-lg border border-gray-300">
        <h2 class="text-xl font-bold text-gray-800 mb-2">{{ t.noticeTitle }}</h2>
        <p class="text-gray-700">{{ t.noticeText }}</p>
      </div>
    </div>
    
    <div class="pt-8 border-t border-gray-200 space-y-12">
      <h1 class="text-4xl font-extrabold text-gray-900 mb-6 text-center">{{ t.aboutTitle }}</h1>
      
      <div class="mb-12">
        <h2 class="text-2xl font-bold text-gray-900 mb-4 text-center">{{ t.aboutDanTitle }}</h2>
        <div class="flex flex-col md:flex-row items-center md:items-start gap-8 max-w-4xl mx-auto">
            <img :src="teacherDanPortrait" alt="Teacher Dan's Portrait" class="rounded-full shadow-md w-48 h-48 object-cover flex-shrink-0">
            <div class="text-lg text-gray-600 space-y-4">
               <p v-html="t.danDesc1"></p>
               <p v-html="t.danDesc2"></p>
               <p v-html="t.danDesc3"></p>
            </div>
        </div>
      </div>
      
      <div class="space-y-8 max-w-4xl mx-auto">
        <div id="about-bizkids" class="bg-blue-50 rounded-lg p-6 shadow-md border border-blue-200">
            <h3 class="text-xl font-bold text-blue-800 mb-2">{{ t.bizKidsTitle }}</h3>
            <p class="text-blue-700 mb-4">{{ t.bizKidsDesc }}</p>
            <Slideshow :images="bizKidsImages" />
        </div>
        <div id="about-webkids" class="bg-green-50 rounded-lg p-6 shadow-md border border-green-200">
            <h3 class="text-xl font-bold text-green-800 mb-2">{{ t.webKidsTitle }}</h3>
            <p class="text-green-700 mb-4">{{ t.webKidsDesc }}</p>
            <Slideshow :images="webKidsImages" />
        </div>
        <div id="about-proenglish" class="bg-purple-50 rounded-lg p-6 shadow-md border border-purple-200">
            <h3 class="text-xl font-bold text-purple-800 mb-2">{{ t.proEnglishTitle }}</h3>
            <p class="text-purple-700 mb-4">{{ t.proEnglishDesc }}</p>
            <Slideshow :images="proEnglishImages" />
        </div>
      </div>
      
      <div id="student-projects" class="pt-8 border-t border-gray-200">
        <h2 class="text-2xl font-bold text-gray-900 mb-4 text-center">{{ t.studentProjectsTitle }}</h2>
        <p class="text-lg text-gray-600 mb-8 text-center max-w-3xl mx-auto">{{ t.studentProjectsDesc }}</p>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <a href="https://dgkmills.github.io/Aree/" target="_blank" class="block bg-gray-50 rounded-lg p-6 shadow-md border border-gray-200 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                <img :src="areesPortfolio" alt="Aree's Portfolio" class="rounded-md mb-4 w-full h-48 object-cover">
                <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ t.areeProjectTitle }}</h3>
                <p class="text-gray-600">{{ t.areeProjectDesc }}</p>
            </a>
            <a href="https://mattsworld.dgkmills.com" target="_blank" class="block bg-gray-50 rounded-lg p-6 shadow-md border border-gray-200 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                <img :src="mattsWorld" alt="Matt's World Project" class="rounded-md mb-4 w-full h-48 object-cover">
                <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ t.mattsProjectTitle }}</h3>
                <p class="text-gray-600">{{ t.mattsProjectDesc }}</p>
            </a>
            <div class="bg-gray-50 rounded-lg p-6 shadow-md border border-gray-200">
                <img src="https://placehold.co/400x250/D1D5DB/9CA3AF?text=Coming+Soon" alt="Student Project Coming Soon" class="rounded-md mb-4 w-full h-48 object-cover">
                <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ t.comingSoonTitle }}</h3>
                <p class="text-gray-600">{{ t.comingSoonDesc }}</p>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

