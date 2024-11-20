import React, { useState, useContext } from "react";
import { FaSmile, FaHeart, FaThumbsUp } from "react-icons/fa"; // Emoji icons
import context from "../Context/context"; // Dark mode context
import Comment from "./Comment";

const Post = ({ post }) => {
  const [reaction, setReaction] = useState(null); // Track user reaction
  const [comments, setComments] = useState([]); // Track comments
  const [commentInput, setCommentInput] = useState(""); // Input for new comment
  const { darkMode } = useContext(context);

  const handleReact = (emoji) => {
    setReaction(reaction === emoji ? null : emoji); // Toggle reaction
  };

  const handleAddComment = () => {
    if (commentInput.trim()) {
      const newComment = { text: commentInput.trim(), replies: [] };
      setComments([...comments, newComment]);
      setCommentInput(""); // Clear input field
    }
  };

  return (
    <div
      className={`shadow-lg rounded-lg p-6 mb-6 ${
        darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
      }`}>
      <h3 className="text-xl font-semibold">{post.title}</h3>
      <p className="mt-4">{post.content}</p>

      {/* Reaction Section */}
      <div className="flex items-center space-x-4 mt-4">
        <button
          onClick={() => handleReact("smile")}
          className={`text-lg ${
            reaction === "smile" ? "text-yellow-400" : "text-gray-500"
          }`}>
          <FaSmile />
        </button>
        <button
          onClick={() => handleReact("heart")}
          className={`text-lg ${
            reaction === "heart" ? "text-red-400" : "text-gray-500"
          }`}>
          <FaHeart />
        </button>
        <button
          onClick={() => handleReact("thumbsUp")}
          className={`text-lg ${
            reaction === "thumbsUp" ? "text-blue-400" : "text-gray-500"
          }`}>
          <FaThumbsUp />
        </button>
      </div>

      {/* Comment Section */}
      <div className="mt-4">
        <div className="space-y-4 mt-4">
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <Comment key={index} comment={comment} />
            ))
          ) : (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              No comments yet. Be the first to comment!
            </p>
          )}
        </div>
        <div className="flex mt-4">
          <input
            type="text"
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            placeholder="Add a comment..."
            className="w-full p-2 rounded-md  bg-gray-50 dark:bg-gray-300 text-gray-800 "
          />
          <button
            onClick={handleAddComment}
            className="ml-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

const PostsPage = () => {
  const { darkMode } = useContext(context);

  const posts = [
    {
      id: 1,
      title: "React Hooks Deep Dive",
      content: "Master the power of React Hooks with real-world examples.",
    },
    {
      id: 2,
      title: "CSS Grid vs Flexbox",
      content: "Understand the key differences and when to use each layout.",
    },
  ];

  return (
    <div
      className={`min-h-screen w-full ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"
      } py-8 px-4 sm:px-8`}>
      <div className="space-y-6 ">
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default PostsPage;
