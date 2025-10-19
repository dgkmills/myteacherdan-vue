<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
  images: {
    type: Array,
    required: true
  }
});

const slideIndex = ref(1);

// A unique identifier for this slideshow instance to avoid conflicts
const slideshowId = `slideshow-${Math.random().toString(36).substr(2, 9)}`;

function showSlides(n) {
  // THE FIX: We now query within the specific slideshow container, not the whole document
  const container = document.getElementById(slideshowId);
  if (!container) return; // If the slideshow isn't on the page, do nothing.

  const slides = container.querySelectorAll('.slide');
  const dots = container.querySelectorAll('.dot');

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

onMounted(() => {
  // We need to wait for the DOM to be fully ready
  setTimeout(() => showSlides(slideIndex.value), 0);
});
</script>

<template>
  <!-- THE FIX: Added a unique ID to the container -->
  <div :id="slideshowId" class="slideshow-container relative max-w-2xl mx-auto my-4 rounded-lg overflow-hidden shadow-lg">
    <!-- The 'key' helps Vue efficiently update the list. The class is for styling. -->
    <div v-for="(image, index) in images" :key="index" class="slide hidden duration-700 ease-in-out">
      <img :src="image" class="w-full h-64 object-contain bg-gray-100">
    </div>

    <!-- Controls -->
    <a @click.prevent="plusSlides(-1)" class="prev absolute top-1/2 left-0 transform -translate-y-1/2 p-4 text-white font-bold text-lg cursor-pointer hover:bg-black/50">&#10094;</a>
    <a @click.prevent="plusSlides(1)" class="next absolute top-1/2 right-0 transform -translate-y-1/2 p-4 text-white font-bold text-lg cursor-pointer hover:bg-black/50">&#10095;</a>

    <!-- Dots -->
    <div class="dots absolute bottom-4 left-1/2 transform -translate-x-1/2">
      <span v-for="(image, index) in images" :key="`dot-${index}`" class="dot cursor-pointer h-4 w-4 mx-1 bg-white/50 rounded-full inline-block hover:bg-white" @click="currentSlide(index + 1)"></span>
    </div>
  </div>
</template>

