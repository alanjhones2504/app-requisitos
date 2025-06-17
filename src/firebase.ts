import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBZ687WWJF_T_4zoYE6YSMpjELuh8dhPTY",
  authDomain: "apps-requisitos.firebaseapp.com",
  projectId: "apps-requisitos",
  storageBucket: "apps-requisitos.firebasestorage.app",
  messagingSenderId: "667521546193",
  appId: "1:667521546193:web:cd974c2df80c7f204b52f0",
  measurementId: "G-D0MPC87W06"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db }; 