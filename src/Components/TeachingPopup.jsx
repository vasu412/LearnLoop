import React, { useState } from "react";
import handleSubmit from "../commonFunctions/handleSubmit";

const TeachingPopup = ({ setShowPopup, darkMode }) => {
  const [content, setContent] = useState("");

  const handlePopupSubmit = (e) => {
    setShowPopup(false); // Close the popup
    handleSubmit(e, "", content, [], "questionPosts");
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50`}>
      <div
        className={`p-6 w-[90%] max-w-md rounded-md ${
          darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
        }`}>
        <h2 className="text-xl font-semibold mb-4">
          Share a Teaching Tip or Ask a Question
        </h2>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
          placeholder="Write your question or tip here..."
          className={`w-full p-2 resize-none rounded-md border ${
            darkMode
              ? "border-gray-700 bg-gray-900"
              : "border-gray-300 bg-gray-100"
          }`}
        />
        <div className="flex justify-end space-x-3 mt-4">
          <button
            onClick={() => setShowPopup(false)}
            className="px-4 py-2 rounded bg-gray-500 text-gray-50">
            Cancel
          </button>
          <button
            onClick={handlePopupSubmit}
            className="px-4 py-2 rounded bg-blue-500 text-gray-50">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeachingPopup;
