


// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// //import { get } from "http";
// import { getAuth } from "@firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import firebase from 'firebase/compat/app';
import  'firebase/compat/auth';
import  'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAt7cPNnSce0XxIzAP4SlC8Yi0F6pa4-FQ",
  authDomain: "swipeart-b57c8.firebaseapp.com",
  projectId: "swipeart-b57c8",
  storageBucket: "swipeart-b57c8.appspot.com",
  messagingSenderId: "810827365534",
  appId: "1:810827365534:web:2f9ec3aac3f032ad8b4f8f",
  measurementId: "G-NXYF3E2M8V"
};

firebase.initializeApp(firebaseConfig);
export default firebase;