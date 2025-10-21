import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, signInAnonymously } from 'firebase/auth';

let db = null;
let auth = null;
let isInitialized = false;

// THE FIX: Simplified to read environment variables directly from import.meta.env
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

/**
 * Initializes the Firebase application and authenticates the user.
 * This function is designed to be called once when the application starts.
 */
export const initFirebase = async () => {
  if (isInitialized) return;

  if (!firebaseConfig.projectId) {
    console.error("Firebase configuration is missing or invalid. Please check your .env.local file and vite.config.js.");
    isInitialized = true;
    return;
  }

  try {
    const app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    auth = getAuth(app);

    await signInAnonymously(auth);
    
    isInitialized = true;
    console.log("Firebase has been initialized and the user is authenticated.");
  } catch (e) {
    console.error("Failed to initialize Firebase:", e);
    isInitialized = true;
  }
};

/**
 * Returns the Firestore database instance.
 * @returns {Firestore} The Firestore database instance.
 */
export const getDB = () => db;

/**
 * Returns the Firebase Auth instance.
 * @returns {Auth} The Firebase Auth instance.
 */
export const getAuthInstance = () => auth;

