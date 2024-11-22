import React, { useState, useContext } from "react";
import { FaWindowClose } from "react-icons/fa";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import app from "../Firebase/auth";
import context from "../Context/context"; // Assuming you have context for darkMode
import { getAuth } from "firebase/auth";
import handleSubmit from "../commonFunctions/handleSubmit";

const SharePost = ({ setShowPopup }) => {
  const [postContent, setPostContent] = useState("");
  const [files, setFiles] = useState([]);
  const [mediaPreview, setMediaPreview] = useState(null);
  const { darkMode } = useContext(context); // Using darkMode from context

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    const db = getFirestore(app);

    if (postContent.trim() || files.length) {
      handleSubmit(e, "", postContent, [], "posts", files);
      // Clear inputs and close popup
      setPostContent("");
      setFiles([]);
      setMediaPreview(null);
      setShowPopup(false);
    } else {
      console.warn("Post content or files must be provided.");
    }
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
    console.log(e.target.result);

    // For image/video preview (only for supported file types)
    const file = selectedFiles[0];
    if (
      file &&
      (file.type.startsWith("image/") || file.type.startsWith("video/"))
    ) {
      const reader = new FileReader();
      reader.onload = (e) => setMediaPreview(e.target.result);
      reader.readAsDataURL(file);
    } else {
      setMediaPreview(null); // Reset preview if the file is not image/video
    }
  };

  return (
    <div
      className={`fixed inset-0 bg-opacity-50 flex justify-center items-center z-50 ${
        darkMode ? "bg-gray-800" : "bg-gray-500"
      }`}>
      <div
        className={` w-[90%] sm:w-[600px] p-6 rounded-lg shadow-lg ${
          darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"
        }`}>
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold mb-4">CREATE A POST</h3>
          <FaWindowClose
            className={`text-xl font-bold mb-4 cursor-pointer ${
              darkMode ? "text-white" : "text-gray-800"
            }`}
            onClick={() => setShowPopup(false)}
          />
        </div>
        <form onSubmit={handlePostSubmit}>
          <textarea
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            placeholder="Write something..."
            className={`w-full p-4  rounded-md mb-4 resize-none ${
              darkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-800"
            }`}
            rows="4"
          />

          {/* Media Attachments */}
          <div className="flex items-center space-x-4 mb-4">
            <label className="cursor-pointer">
              <span
                className={`${darkMode ? "text-blue-400" : "text-blue-500"}`}>
                Add Photos/Videos
              </span>
              <input
                type="file"
                accept="image/*,video/*,application/pdf"
                multiple
                onChange={handleFileChange}
                className="hidden"
              />
            </label>

            {/* Media Preview */}
            {mediaPreview && (
              <div className="w-20 h-20 overflow-hidden rounded-md">
                {mediaPreview.startsWith("data:image") ? (
                  <img
                    src={mediaPreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : mediaPreview.startsWith("data:video") ? (
                  <video
                    controls
                    className="w-full h-full object-cover"
                    src={mediaPreview}></video>
                ) : (
                  <span className="text-sm text-gray-600">
                    Preview not available for this file type.
                  </span>
                )}
              </div>
            )}
          </div>

          <button
            type="submit"
            className={`px-6 py-3 rounded-md w-full ${
              darkMode
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-blue-500 hover:bg-blue-600"
            } text-white`}>
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default SharePost;
