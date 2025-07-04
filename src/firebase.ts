// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAfc8tlm8G_CnocRzwLiRr8UUZJz5V-ABY",
  authDomain: "replay-d8180.firebaseapp.com",
  projectId: "replay-d8180",
  storageBucket: "replay-d8180.appspot.com", // Исправлено с .app на .app**s**
  messagingSenderId: "1030263540049",
  appId: "1:1030263540049:web:5e9766994df6018a1e2b70",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
export default app;