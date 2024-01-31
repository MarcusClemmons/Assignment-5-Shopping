// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore"
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQd19JPpXbwXQuV-ACO2NrKOJVBmAQanE",
  authDomain: "ecommerce-app-c5530.firebaseapp.com",
  projectId: "ecommerce-app-c5530",
  storageBucket: "ecommerce-app-c5530.appspot.com",
  messagingSenderId: "614572815080",
  appId: "1:614572815080:web:46f77516059386d91e4f5d"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const database = getDatabase(app);