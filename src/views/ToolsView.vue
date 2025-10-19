<template>
  <div class="bg-white shadow-lg rounded-xl p-8">
    <h1 class="text-4xl font-extrabold text-gray-900 mb-6 text-center">Tools for Learning</h1>
    <p class="text-lg text-gray-600 mb-12 text-center max-w-3xl mx-auto">
      These interactive tools are great for practicing your English skills. They also demonstrate the type of projects students learn to build in my Web Kid$ class.
    </p>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Dialogue Practice Tool -->
      <div class="bg-gray-50 rounded-xl p-6 shadow-md border border-gray-200 flex flex-col">
        <h3 class="text-xl font-semibold text-gray-900 mb-2">Dialogue Practice Tool</h3>
        <p class="text-gray-600 mb-4 flex-grow">
          Practice your conversation skills. This tool helps you generate and practice real-world dialogues.
        </p>
        <div class="aspect-w-1 aspect-h-1">
          <iframe src="https://dialogue.danmills.dev" title="Dialogue Generation Tool" allow="microphone" class="w-full h-full rounded-lg border border-gray-300"></iframe>
        </div>
      </div>
      <!-- Pronunciation Practice Tool -->
      <div class="bg-gray-50 rounded-xl p-6 shadow-md border border-gray-200 flex flex-col">
        <h3 class="text-xl font-semibold text-gray-900 mb-2">Pronunciation Practice Tool</h3>
        <p class="text-gray-600 mb-4 flex-grow">
          Improve your pronunciation. Get instant feedback on your spoken English and practice tricky sounds.
        </p>
        <div class="aspect-w-1 aspect-h-1">
          <iframe src="https://pronunciation.danmills.dev" title="Pronunciation Practice Tool" allow="microphone" class="w-full h-full rounded-lg border border-gray-300"></iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Scoped styles for this component only */
.aspect-w-1 {
  position: relative;
  padding-bottom: 100%; /* 1:1 Aspect Ratio */
}
.aspect-h-1 > iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>

