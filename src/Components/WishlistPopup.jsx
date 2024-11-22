import React, { useState } from "react";
import { FaWindowClose } from "react-icons/fa";
import handleSubmit from "../commonFunctions/handleSubmit";

const WishlistPopup = ({ darkMode, setShowPopup }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [currentKeyword, setCurrentKeyword] = useState("");

  const handleAddKeyword = (e) => {
    if (e.key === "Enter" && currentKeyword.trim()) {
      e.preventDefault();
      setKeywords((prev) => [...prev, currentKeyword.trim()]);
      setCurrentKeyword("");
    }
  };

  const handleDeleteKeyword = (index) => {
    setKeywords((prev) => prev.filter((_, i) => i !== index));
  };

  const handlePostSubmit = async (e) => {
    handleSubmit(e, title, description, keywords, "wishlistPosts");
    setShowPopup(false);
  };

  return (
    <div
      className={`fixed inset-0 bg-opacity-50 flex justify-center items-center z-50 ${
        darkMode ? "bg-gray-800" : "bg-gray-500"
      }`}>
      <div
        className={`w-[90%] sm:w-[600px] p-6 rounded-lg shadow-lg ${
          darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"
        }`}>
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold mb-4">Feature Wishlist</h3>
          <FaWindowClose
            className={`text-xl font-bold mb-4 cursor-pointer ${
              darkMode ? "text-white" : "text-gray-800"
            }`}
            onClick={() => setShowPopup(false)}
          />
        </div>

        <form onSubmit={handlePostSubmit}>
          {/* Title */}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Feature Title"
            className={`w-full p-4 rounded-md mb-4 ${
              darkMode ? "bg-gray-800 text-white " : "bg-gray-100 text-gray-800"
            }`}
          />

          {/* Description */}
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Feature Description"
            className={`w-full p-4  rounded-md mb-4 resize-none ${
              darkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-800"
            }`}
            rows="4"
          />

          {/* Keywords */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Add Keywords or Hashtags
            </label>
            <div
              className={`flex flex-wrap items-center gap-2 p-2 border rounded-md ${
                darkMode
                  ? "bg-gray-800 text-white border-gray-600"
                  : "bg-gray-100 text-gray-800 border-gray-300"
              }`}>
              {keywords.map((keyword, index) => (
                <div
                  key={index}
                  className={`flex items-center px-3 py-1 rounded-md ${
                    darkMode
                      ? "bg-blue-600 text-white"
                      : "bg-blue-100 text-blue-600"
                  }`}>
                  <span>{keyword}</span>
                  <button
                    type="button"
                    onClick={() => handleDeleteKeyword(index)}
                    className="ml-2 text-xs text-red-500 hover:text-red-700">
                    ✕
                  </button>
                </div>
              ))}
              <input
                type="text"
                value={currentKeyword}
                onChange={(e) => setCurrentKeyword(e.target.value)}
                onKeyDown={handleAddKeyword}
                placeholder="Type and press Enter"
                className={`flex-1 p-1 bg-transparent outline-none ${
                  darkMode ? "text-white" : "text-gray-800"
                }`}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`px-6 py-3 rounded-md w-full ${
              darkMode
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-blue-500 hover:bg-blue-600"
            } text-white`}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default WishlistPopup;
