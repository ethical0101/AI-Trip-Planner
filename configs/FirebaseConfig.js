// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCoYw2HG9ehZelM9kMb2vFuj3htsXBeKSc",
  authDomain: "ai-trip-planner-fe11e.firebaseapp.com",
  projectId: "ai-trip-planner-fe11e",
  storageBucket: "ai-trip-planner-fe11e.firebasestorage.app",
  messagingSenderId: "1057106373798",
  appId: "1:1057106373798:web:802c5216ecfbff58915867",
  measurementId: "G-D6JCD5RK2J"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
