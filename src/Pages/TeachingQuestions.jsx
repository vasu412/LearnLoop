import React, { useContext, useEffect, useState } from "react";
import context from "../Context/context";
import TeachingPopup from "../Components/TeachingPopup";
import PostsPage from "../Components/PostPage";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// Main Component for Teaching Questions and Tips Page
const TeachingQuestions = () => {
  const [showPopup, setShowPopup] = useState(false);
  const { darkMode } = useContext(context);
  const [userProfile, setUserProfile] = useState("");
  const db = getFirestore();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userProfileRef = doc(db, "users", user.uid);
        getDoc(userProfileRef).then((userProfileSnapshot) => {
          if (userProfileSnapshot.exists()) {
            setUserProfile(userProfileSnapshot.data().profile);
          }
        });
      }
    });
    return unsubscribe;
  }, []);

  return (
    <div className="flex flex-col h-[90.6vh] overflow-scroll">
      <div
        className={` text-gray-50 p-6 px-16 ${
          darkMode ? "bg-blue-900" : "bg-blue-500"
        } rounded-sm shadow-lg m-6`}>
        <h1 className="text-3xl font-bold">Teaching Questions and Tips 💡</h1>
        <p className="text-lg mt-2">
          Share and explore tips, tricks, and questions to enhance your teaching
          journey!
        </p>
      </div>

      <div
        className={`w-[calc(100vw-275px)] p-6 ${
          darkMode
            ? "border-gray-700 bg-gray-900"
            : "border-gray-200 bg-gray-100"
        }`}>
        {/* User's Profile Image & Placeholder */}
        <div
          className={`w-full sm:w-[500px] h-fit px-10 ml-2 py-5 rounded-sm ${
            darkMode ? "bg-gray-800" : "bg-gray-200"
          }`}
          style={{ width: "1100px" }}>
          <div className="flex items-center">
            {/* User Profile Image */}
            {(auth?.currentUser?.photoURL || userProfile) && (
              <img
                src={auth?.currentUser?.photoURL || userProfile} // Use a sample image or the user's image
                alt="User"
                className="w-12 h-12 mr-3 rounded-md object-cover"
              />
            )}
            {/* Placeholder to click */}
            <div
              onClick={() => setShowPopup(true)}
              className={`flex-1 cursor-pointer p-4 ${
                darkMode
                  ? "text-white bg-gray-700"
                  : "text-gray-600 bg-gray-100"
              } rounded-md border ${
                darkMode ? "border-gray-600" : "border-gray-300"
              }`}>
              <span>Ask a Question or Share a Tip!</span>
            </div>
          </div>

          {/* Popup for Writing Post */}
          {showPopup && (
            <TeachingPopup setShowPopup={setShowPopup} darkMode={darkMode} />
          )}
        </div>
      </div>
      <hr
        className={`border inline mt-4 w-[calc(100vw-275px)] border-solid ${
          darkMode ? "border-gray-700" : "border-gray-200"
        }`}
      />
      <div className="p-3">
        <PostsPage isQuestion={true} />
      </div>
    </div>
  );
};

export default TeachingQuestions;
