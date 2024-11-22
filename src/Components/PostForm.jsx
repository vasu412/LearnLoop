import React, { useContext, useState } from "react";
import SharePost from "./SharePost";
import context from "../Context/context";
import PostsPage from "./PostPage";
import { getAuth } from "firebase/auth";

const PostForm = () => {
  const [showPopup, setShowPopup] = useState(false);
  const { darkMode } = useContext(context);
  const { currentUser } = getAuth();
  return (
    <div
      className={`w-[calc(100vw-275px)] h-[90.6vh] overflow-y-scroll overflow-x-hidden flex flex-col p-6  ${
        darkMode ? "border-gray-700 bg-gray-900" : "border-gray-200 bg-gray-100"
      }`}>
      {/* User's Profile Image & Placeholder */}
      <div
        className={`w-full sm:w-[500px] h-fit px-10 py-5 rounded-sm ${
          darkMode ? "bg-gray-800" : "bg-gray-200"
        }`}
        style={{ width: "1100px" }}>
        <div className="flex items-center ">
          {/* User Profile Image */}
          {currentUser?.photoURL && (
            <img
              src={currentUser?.photoURL} // Use a sample image or the user's image
              alt="User"
              className="w-12 h-12 mr-3 rounded-md object-cover"
            />
          )}
          {/* Placeholder to click */}
          <div
            onClick={() => setShowPopup(true)}
            className={`flex-1 cursor-pointer p-4 ${
              darkMode ? "text-white bg-gray-700" : "text-gray-600 bg-gray-100"
            } rounded-md border ${
              darkMode ? "border-gray-600" : "border-gray-300"
            }`}>
            <span>What’s on your mind? Share globally!!</span>
          </div>
        </div>

        {/* Popup for Writing Post */}
        {showPopup && <SharePost setShowPopup={setShowPopup} />}
      </div>
      <hr
        className={`border mt-4 w-full border-solid ${
          darkMode ? "border-gray-700" : "border-gray-200"
        }`}
      />
      <PostsPage />
    </div>
  );
};

export default PostForm;
