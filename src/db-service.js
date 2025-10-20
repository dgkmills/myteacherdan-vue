import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, signInAnonymously, signInWithCustomToken } from 'firebase/auth';

let db = null;
let auth = null;
let isInitialized = false;

// Helper to safely access environment variables injected by Vite
const getEnvVar = (name) => {
  // Vite injects env vars into process.env
  if (process.env[name]) {
    try {
      // Try parsing if it's a JSON string
      return JSON.parse(process.env[name]);
    } catch {
      // Return as is if it's not JSON
      return process.env[name];
    }
  }
  return undefined;
}

/**
 * Initializes the Firebase application and authenticates the user.
 * This function is designed to be called once when the application starts.
 */
const initFirebase = async () => {
  if (isInitialized) return;

  // Retrieve Firebase config from environment variables
  const firebaseConfig = getEnvVar('__firebase_config');

  // Validate the configuration object
  if (!firebaseConfig || typeof firebaseConfig !== 'object' || !firebaseConfig.projectId) {
    console.error("Firebase configuration is missing or invalid. Please check your environment variables.");
    isInitialized = true; // Mark as initialized to prevent retries
    return;
  }

  try {
    const app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    auth = getAuth(app);

    // After initialization, authenticate the user
    await authenticateUser();
    
    isInitialized = true;
    console.log("Firebase has been initialized and the user is authenticated.");
  } catch (e) {
    console.error("Failed to initialize Firebase:", e);
    isInitialized = true; // Mark as initialized even on failure
  }
};

/**
 * Handles user authentication, signing in with a custom token if available,
 * otherwise falling back to anonymous sign-in.
 */
const authenticateUser = async () => {
  if (!auth) {
    console.error("Authentication cannot proceed: Firebase Auth is not available.");
    return;
  }

  const initialAuthToken = getEnvVar('__initial_auth_token');

  try {
    if (initialAuthToken && initialAuthToken !== '""') {
       await signInWithCustomToken(auth, initialAuthToken.replace(/"/g, ''));
    } else {
      await signInAnonymously(auth);
    }
  } catch (error) {
    console.error("An error occurred during Firebase authentication:", error);
  }
};

// Getter function to access the database instance
const getDB = () => db;

export { initFirebase, getDB };
