// Import Firebase SDKs (v9+ modular)
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-firestore.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_iE_G8eHzUrikjddhabWEWuwLb1Nx7sU",
  authDomain: "gym-mangement-system-830fc.firebaseapp.com",
  projectId: "gym-mangement-system-830fc",
  storageBucket: "gym-mangement-system-830fc.firebasestorage.app",
  messagingSenderId: "241194075982",
  appId: "1:241194075982:web:1d2634ee918ccefcb0801f",
  measurementId: "G-36ECMF720K"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
