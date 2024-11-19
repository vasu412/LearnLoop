import React, { useContext, useState } from "react";
import SharePost from "./SharePost";
import context from "../Context/context";

const PostForm = () => {
  const [showPopup, setShowPopup] = useState(false);
  const { darkMode } = useContext(context);

  return (
    <div className=" w-[calc(75vw-275px)] flex flex-col items-center p-6 border-0 border-solid border-r-2 border-gray-200  bg-gray-100">
      {/* User's Profile Image & Placeholder */}
      <div
        className="w-full sm:w-[500px] h-fit px-10 py-5  rounded-lg bg-white "
        style={{ width: "730px" }}>
        <div className="flex items-center ">
          {/* User Profile Image */}
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg" // Use a sample image or the user's image
            alt="User"
            className="w-12 h-12 mr-3 rounded-full object-cover"
          />
          {/* Placeholder to click */}
          <div
            onClick={() => setShowPopup(true)}
            className="flex-1 cursor-pointer p-4 text-gray-600 bg-gray-100 rounded-md border border-gray-300">
            <span>What’s on your mind ? Share globally!!</span>
          </div>
        </div>

        {/* Popup for Writing Post */}
        {showPopup && <SharePost setShowPopup={setShowPopup} />}
      </div>
      <hr className="border mt-4 w-full border-solid" />
    </div>
  );
};

export default PostForm;
