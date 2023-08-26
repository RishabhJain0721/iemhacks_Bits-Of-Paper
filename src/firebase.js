import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "study-mate-817fc.firebaseapp.com",
  projectId: "study-mate-817fc",
  storageBucket: "study-mate-817fc.appspot.com",
  messagingSenderId: "151029079742",
  appId: "1:151029079742:web:f8c3e3a59914474328c8ef",
  measurementId: "G-N9ZPL6JHWH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

export { app,auth,db };