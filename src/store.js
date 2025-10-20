import { reactive, readonly } from 'vue';

// The 'state' object holds the application's global data.
// It is reactive, so any component using it will update when the data changes.
const state = reactive({
  language: 'en', // Default language is English ('en')
});

// The 'setLanguage' function allows other components to change the current language.
const setLanguage = (lang) => {
  if (['en', 'th'].includes(lang)) {
    state.language = lang;
  } else {
    console.warn(`Language '${lang}' is not supported.`);
  }
};

// We export a readonly version of the state to prevent direct mutations from components,
// along with the function to safely update it. This is a best practice.
export const languageStore = {
  state: readonly(state),
  setLanguage,
};
