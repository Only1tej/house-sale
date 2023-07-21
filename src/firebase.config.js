import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCkHXWvSUEgELf9CeQ4lYbu7AHOA06xEoU",
  authDomain: "house-marketplace-7dd84.firebaseapp.com",
  projectId: "house-marketplace-7dd84",
  storageBucket: "house-marketplace-7dd84.appspot.com",
  messagingSenderId: "597551713141",
  appId: "1:597551713141:web:d3736215e5b7260850613c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore()