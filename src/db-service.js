import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, signInAnonymously, signInWithCustomToken } from 'firebase/auth';

let db = null;
let auth = null;
let isInitialized = false;

// Helper to safely access environment variables
const getEnvVar = (name) => {
  // Vite injects env vars from .env files into import.meta.env
  // For other contexts, it might be directly on a global object.
  // This checks multiple locations.
  const env = (typeof import.meta !== 'undefined' && import.meta.env) ? import.meta.env : (typeof process !== 'undefined' ? process.env : {});
  
  if (env[name]) {
    try {
      // Try parsing if it's a JSON string (like __firebase_config)
      return JSON.parse(env[name]);
    } catch {
      // Return as is if it's not JSON (like __initial_auth_token)
      return env[name];
    }
  }
  // Fallback for when variables are injected globally, e.g., in the Canvas environment
  if (typeof window !== 'undefined' && window[name]) {
      return window[name];
  }
  return undefined;
}

/**
 * Initializes the Firebase application and authenticates the user.
 * This function is designed to be called once when the application starts.
 */
export const initFirebase = async () => {
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
       // The token might be stringified, so remove quotes if they exist
       const token = initialAuthToken.replace(/^"|"$/g, '');
       await signInWithCustomToken(auth, token);
    } else {
      await signInAnonymously(auth);
    }
  } catch (error) {
    console.error("An error occurred during Firebase authentication:", error);
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
