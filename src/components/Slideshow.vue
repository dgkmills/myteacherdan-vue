<script setup>
import { ref, onMounted, nextTick } from 'vue';

const props = defineProps({
  images: {
    type: Array,
    required: true
  }
});

const slideIndex = ref(1);
const slideshowId = `slideshow-${Math.random().toString(36).substr(2, 9)}`;

function showSlides(n) {
  const container = document.getElementById(slideshowId);
  if (!container) return;

  const slides = container.querySelectorAll('.slide');
  const dots = container.querySelectorAll('.dot');
  if (slides.length === 0) return;

  if (n > slides.length) { slideIndex.value = 1 }
  if (n < 1) { slideIndex.value = slides.length }
  
  slides.forEach(slide => slide.style.display = "none");
  dots.forEach(dot => dot.classList.remove("active"));
  
  if (slides[slideIndex.value - 1]) {
    slides[slideIndex.value - 1].style.display = "block";
    if(dots[slideIndex.value - 1]) {
        dots[slideIndex.value - 1].classList.add("active");
    }
  }
}

function plusSlides(n) {
  showSlides(slideIndex.value += n);
}

function currentSlide(n) {
  showSlides(slideIndex.value = n);
}

// THE FIX: Using nextTick is more reliable than setTimeout for waiting on the DOM.
onMounted(async () => {
  await nextTick();
  showSlides(slideIndex.value);
});
</script>

<template>
  <div :id="slideshowId" class="slideshow-container relative max-w-2xl mx-auto my-4 rounded-lg overflow-hidden shadow-lg">
    <div v-for="(image, index) in images" :key="index" class="slide hidden duration-700 ease-in-out">
      <img :src="image" class="w-full h-64 object-cover bg-gray-100">
    </div>

    <a @click.prevent="plusSlides(-1)" class="prev absolute top-1/2 left-0 transform -translate-y-1/2 p-4 text-white font-bold text-lg cursor-pointer hover:bg-black/50">&#10094;</a>
    <a @click.prevent="plusSlides(1)" class="next absolute top-1/2 right-0 transform -translate-y-1/2 p-4 text-white font-bold text-lg cursor-pointer hover:bg-black/50">&#10095;</a>

    <div class="dots absolute bottom-4 left-1/2 transform -translate-x-1/2">
      <span v-for="(image, index) in images" :key="`dot-${index}`" class="dot cursor-pointer h-4 w-4 mx-1 bg-white/50 rounded-full inline-block hover:bg-white" @click="currentSlide(index + 1)"></span>
    </div>
  </div>
</template>

<style scoped>
/* Basic fade animation for the slideshow */
.slide.hidden {
  display: none;
}
.slide {
  animation: fade 0.5s ease-in-out;
}
@keyframes fade {
  from { opacity: 0.4; }
  to { opacity: 1; }
}
.dot.active {
    background-color: white;
}
</style>
