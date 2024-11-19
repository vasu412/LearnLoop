// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyB52hcq2u3pYtMF5nS70NztSlLLY_JdBFQ",
  authDomain: "learnloop-9b246.firebaseapp.com",
  projectId: "learnloop-9b246",
  storageBucket: "learnloop-9b246.firebasestorage.app",
  messagingSenderId: "272673135737",
  appId: "1:272673135737:web:6ce98ccd3dced2634088a8",
  measurementId: "G-VX15918FCP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app;
