import React, { useState } from "react";

const PostForm = () => {
  const [postContent, setPostContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (postContent.trim()) {
      console.log("New Post:", postContent); // Send to backend later
      setPostContent(""); // Clear input
    }
  };

  return (
    <div className="p-4 border border-gray-200 rounded-lg shadow-sm">
      <h3 className="text-lg font-bold mb-4">Create a Post</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
          placeholder="Share your thoughts..."
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
          rows="4"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md">
          Post
        </button>
      </form>
    </div>
  );
};

export default PostForm;
