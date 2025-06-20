// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getEnv } from "./getEnv";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:getEnv('VITE_FIREBASE_API_KEY'),
  authDomain: "blogbrew-9c1e9.firebaseapp.com",
  projectId: "blogbrew-9c1e9",
  storageBucket: "blogbrew-9c1e9.appspot.com",
  messagingSenderId: "47640245470",
  appId: "1:47640245470:web:2ed1a63ba68a18ded07e4f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {auth, provider};