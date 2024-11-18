import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  OAuthProvider,
} from "firebase/auth";
import app from "./auth";
const auth = getAuth();

export const handleGoogleSignIn = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log("Google User:", user);
  } catch (error) {
    console.error("Google Sign-In Error:", error);
  }
};

export const handleFacebookSignIn = async () => {
  const provider = new FacebookAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log("Facebook User:", user);
  } catch (error) {
    console.error("Facebook Sign-In Error:", error);
  }
};

export const handleAppleSignIn = async () => {
  const provider = new OAuthProvider("apple.com");
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log("Apple User:", user);
  } catch (error) {
    console.error("Apple Sign-In Error:", error);
  }
};
