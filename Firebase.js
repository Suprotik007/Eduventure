// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDmE6I36MsKib7aEAGdTSoYKTKroqmSlaM",
  authDomain: "eduventure-fcb06.firebaseapp.com",
  projectId: "eduventure-fcb06",
  storageBucket: "eduventure-fcb06.firebasestorage.app",
  messagingSenderId: "419436090581",
  appId: "1:419436090581:web:1aadf8531913be922ebe5c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth =getAuth(app)