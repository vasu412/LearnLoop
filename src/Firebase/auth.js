// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCfGYIA2j1A0gam_pAnTE87lPfMvzs8gME",
  authDomain: "learnloop-48cb2.firebaseapp.com",
  projectId: "learnloop-48cb2",
  storageBucket: "learnloop-48cb2.firebasestorage.app",
  messagingSenderId: "249615346911",
  appId: "1:249615346911:web:fce4181822ab56ef9ecd6a",
  measurementId: "G-662VSEL82B",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app;
