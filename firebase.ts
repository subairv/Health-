// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCoX4RT3aJW-frI0y-Re8anJ27iMxdZpmE",
  authDomain: "healthvalue-14223.firebaseapp.com",
  projectId: "healthvalue-14223",
  storageBucket: "healthvalue-14223.firebasestorage.app",
  messagingSenderId: "534128607346",
  appId: "1:534128607346:web:5040b70ae50c08656302eb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);