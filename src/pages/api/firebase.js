// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAS1g9kDHR1jPowCt7MIXp2f1FnvULL_EQ",
  authDomain: "adcidatabase.firebaseapp.com",
  projectId: "adcidatabase",
  storageBucket: "adcidatabase.firebasestorage.app",
  messagingSenderId: "838120462510",
  appId: "1:838120462510:web:416786552d41a4a713353f",
  measurementId: "G-LZQWSPESGL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
