// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
//import { get } from "http";
import { getAuth } from "@firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAezLZQJVU_WGoxmOKd-kCLjN_56ZEFH_c",
  authDomain: "swipeart-f3b81.firebaseapp.com",
  projectId: "swipeart-f3b81",
  storageBucket: "swipeart-f3b81.appspot.com",
  messagingSenderId: "145272981770",
  appId: "1:145272981770:web:ad9fb31c3d6d2b576112f3",
  measurementId: "G-9B5T539EE8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const firebaseAuth = getAuth(app);