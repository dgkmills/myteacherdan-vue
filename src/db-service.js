import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, signInWithCustomToken, signInAnonymously } from 'firebase/auth';

let db = null;
let auth = null;
let isInitialized = false;

// This helper function is now simplified.
const getEnvVar = (name) => {
    if (typeof window !== 'undefined' && typeof window[name] !== 'undefined') {
        return window[name];
    }
    // THE FIX: We no longer need to parse the JSON here.
    // Vite's 'define' feature handles this for us. We just return the variable directly.
    if (typeof globalThis[name] !== 'undefined') {
        return globalThis[name];
    }
    return undefined;
}

// FIX: initFirebase is now an async function
const initFirebase = async () => {
  if (isInitialized) return;

  const firebaseConfig = getEnvVar('__firebase_config');

  if (!firebaseConfig || Object.keys(firebaseConfig).length === 0 || !firebaseConfig.projectId) {
    console.error("Firebase Configuration Missing: Cannot initialize.");
    isInitialized = true;
    return;
  }

  try {
    // Firebase's initializeApp function expects the config object directly.
    const app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    auth = getAuth(app);
    
    await authenticateUser(); 
    isInitialized = true;
    console.log("Firebase Initialized and Authenticated Successfully.");
  } catch (e) {
    console.error("Firebase Initialization Failed:", e);
    isInitialized = true;
  }
};

// This function is now called internally by initFirebase.
const authenticateUser = async () => {
  if (!auth) {
    console.error("Authentication failed: Auth service not available.");
    return;
  }
  
  const initialAuthToken = getEnvVar('__initial_auth_token');

  try {
    if (initialAuthToken && initialAuthToken !== '""') {
      await signInWithCustomToken(auth, initialAuthToken);
    } else {
      await signInAnonymously(auth);
    }
  } catch (error) {
    console.error("Firebase Auth Error:", error);
  }
};

const getDB = () => db;

// We only need to export these two functions for the app now.
export { initFirebase, getDB };

