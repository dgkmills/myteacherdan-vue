import { reactive } from 'vue';

export const languageStore = reactive({
  state: {
    language: 'en',
    quiz1_passed: false,
    // THE FIX: Add a new state property to track the second quiz
    quiz2_passed: false 
  },
  
  setLanguage(lang) {
    this.state.language = lang;
  },

  setQuiz1Passed() {
    this.state.quiz1_passed = true;
  },

  // THE FIX: Add a method to set the second quiz as passed
  setQuiz2Passed() {
    this.state.quiz2_passed = true;
  }
});

