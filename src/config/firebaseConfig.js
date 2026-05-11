import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBA1nUeJoqc2tWPbtvucnmbtUcWoBMoUZk",
  authDomain: "fruitbox-4319c.firebaseapp.com",
  projectId: "fruitbox-4319c",
  storageBucket: "fruitbox-4319c.firebasestorage.app",
  messagingSenderId: "488925576174",
  appId: "1:488925576174:web:5e46b0a4220407999decff",
  measurementId: "G-0N9Z7RQWJF"
};

const app = initializeApp(firebaseConfig);
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
const db = getFirestore(app);

export { db, app };
