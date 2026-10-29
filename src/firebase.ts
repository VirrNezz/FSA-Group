import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAXotXiM8nAs3XJ20h-w6AORyjGla5aemw",
  authDomain: "fsa-group-eaaab.firebaseapp.com",
  projectId: "fsa-group-eaaab",
  storageBucket: "fsa-group-eaaab.firebasestorage.app",
  messagingSenderId: "853311892855",
  appId: "1:853311892855:web:05bbd07fa076fa5a92c572",
  measurementId: "G-PR09E32WKN"
};

const app = initializeApp(firebaseConfig);

// EXPORT AUTH DAN DB (Wajib ada biar gak error missing export)
export const auth = getAuth(app);
export const db = getFirestore(app);
