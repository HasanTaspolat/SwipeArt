// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAt7cPNnSce0XxIzAP4SlC8Yi0F6pa4-FQ",
  authDomain: "swipeart-b57c8.firebaseapp.com",
  projectId: "swipeart-b57c8",
  storageBucket: "swipeart-b57c8.appspot.com",
  messagingSenderId: "810827365534",
  appId: "1:810827365534:web:2f9ec3aac3f032ad8b4f8f",
  measurementId: "G-NXYF3E2M8V",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export const db = getFirestore(app);
export default storage;
