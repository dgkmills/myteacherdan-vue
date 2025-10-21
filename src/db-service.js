import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, signInAnonymously } from 'firebase/auth';

let db = null;
let auth = null;
let isInitialized = false;

// Construct the Firebase configuration object directly from Vite's environment variables.
// Vite exposes variables from .env files via `import.meta.env`.
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

  // Validate the configuration object
  if (!firebaseConfig.projectId) {
    console.error("Firebase configuration is missing or invalid. Please check your .env.local file.");
    isInitialized = true; // Mark as initialized to prevent retries
    return;
  }

  try {
    const app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    auth = getAuth(app);

    // After initialization, authenticate the user anonymously
    await signInAnonymously(auth);
    
    isInitialized = true;
    console.log("Firebase has been initialized and the user is authenticated.");
  } catch (e) {
    console.error("Failed to initialize Firebase:", e);
    isInitialized = true; // Mark as initialized even on failure
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
