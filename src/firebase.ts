// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA-ZM4aBxo_mrZ27R7aSXWiIjhBXqmNkRU", // Firebase 콘솔에서 복사한 값을 여기에 붙여넣으세요.
  authDomain: "class-website-b429c.firebaseapp.com",
  projectId: "class-website-b429c",
  storageBucket: "class-website-b429c.firebasestorage.app",
  messagingSenderId: "857207798965",
  appId: "1:857207798965:web:2b6885a56155a4b45412fc",
  measurementId: "G-4KH3MFXZ3J" // 선택 사항
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase 서비스 초기화
export const auth = getAuth(app);
export const db = getFirestore(app);
export const realtimeDB = getDatabase(app);
