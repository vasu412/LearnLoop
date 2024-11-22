import { getAuth } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import app from "../Firebase/auth";

const db = getFirestore(app);
const auth = getAuth();

const handleSubmit = async (
  e,
  title,
  description,
  keywords,
  pageType,
  files
) => {
  try {
    e.preventDefault();
    const userProfileRef = doc(db, "users", auth.currentUser.uid);
    const userProfileSnapshot = await getDoc(userProfileRef);

    if (!userProfileSnapshot.exists()) {
      console.error("User profile does not exist.");
      return;
    }

    const userProfileData = userProfileSnapshot.data();

    // Create a reference for the new post
    const postsCollectionRef = collection(db, pageType);
    const newPostRef = doc(postsCollectionRef); // Generate a unique document ID

    files
      ? await setDoc(newPostRef, {
          username: userProfileData.username || "Anonymous", // Fallback if username is missing
          files: files.length > 0 ? files.map((file) => file.name) : [], // Handle files array
          postContent: description.trim(),
          keywords: keywords,
          createdAt: new Date().toISOString(),
          votes: 0,
          comments: [],
          profile: userProfileData.profile,
        })
      : await setDoc(newPostRef, {
          username: userProfileData.username || "Anonymous", // Fallback if username is missing
          title: title,
          postContent: description.trim(),
          keywords: keywords,
          createdAt: new Date().toISOString(),
          votes: 0,
          comments: [],
          profile: userProfileData.profile,
        });

    // Handle form submission logic
    console.log({ title, description, keywords });
  } catch (error) {
    console.error("Error adding document:", error.message);
  }
};

export default handleSubmit;
