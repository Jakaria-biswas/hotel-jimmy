// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQaOsR76f_IuINzaboyhtnCEodBhNqthA",
  authDomain: "hotel-jimmy.firebaseapp.com",
  projectId: "hotel-jimmy",
  storageBucket: "hotel-jimmy.appspot.com",
  messagingSenderId: "467219899443",
  appId: "1:467219899443:web:66695b235851dd4dafaf46"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;