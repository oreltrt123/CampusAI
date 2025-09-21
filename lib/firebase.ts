import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; // Added

const firebaseConfig = {
  apiKey: "AIzaSyBqHbElvqa2IX4aPKqwyA9OmUgF5vw_2SQ",
  authDomain: "displan-7ffb7.firebaseapp.com",
  databaseURL: "https://displan-7ffb7-default-rtdb.firebaseio.com",
  projectId: "displan-7ffb7",
  storageBucket: "displan-7ffb7.firebasestorage.app",
  messagingSenderId: "972722004547",
  appId: "1:972722004547:web:5a2b69b94fadfc420deaf6",
  measurementId: "G-HPZ6LT0SV5"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // Firestore
const googleProvider = new GoogleAuthProvider();

export { auth, db, googleProvider };