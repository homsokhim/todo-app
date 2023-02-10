import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBcsv1GsK4z5-68hThjBogfsc8KPfrXHbc",
    authDomain: "react-firebase-todo-93254.firebaseapp.com",
    projectId: "react-firebase-todo-93254",
    storageBucket: "react-firebase-todo-93254.appspot.com",
    messagingSenderId: "208436552356",
    appId: "1:208436552356:web:c60dc6f6d8898aaba9bc31"
  };


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);