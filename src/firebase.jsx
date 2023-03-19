import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase konfiguracija
const firebaseConfig = {
  apiKey: "AIzaSyACb9-21Xy9Y3EEDY88PQArhjnMe0nxLuk",
  authDomain: "allinchat-f0a21.firebaseapp.com",
  projectId: "allinchat-f0a21",
  storageBucket: "allinchat-f0a21.appspot.com",
  messagingSenderId: "353044969369",
  appId: "1:353044969369:web:906e21a33a1753b0a18508",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); //dolazi sa Firebase-a
export const db = getFirestore(app); // inicijalizacija firestore db-a sa firebase-a
