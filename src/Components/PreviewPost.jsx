import React, { useState, useContext } from "react";
import { FaArrowUp, FaArrowDown, FaCommentDots, FaShare } from "react-icons/fa";
import { useParams } from "react-router-dom";
import context from "../Context/context";
import Comment from "../Components/Comment";

const PostPreview = () => {
  const { id } = useParams();
  const { darkMode } = useContext(context);
  const [votes, setVotes] = useState(0);
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");

  const posts = [
    {
      id: 1,
      title: "Feature A",
      description:
        "A detailed explanation of Feature A with all its benefits.A detailed explanation of Feature A with all its benefitsA detailed explanation of Feature A with all its benefitsA detailed explanation of Feature A with all its benefitsA detailed explanation of Feature A with all its benefitsA detailed explanation of Feature A with all its benefitsA detailed explanation of Feature A with all its benefitsA detailed explanation of Feature A with all its benefitsA detailed explanation of Feature A with all its benefitsA detailed explanation of Feature A with all its benefitsA detailed explanation of Feature A with all its benefitsA detailed explanation of Feature A with all its benefitsA detailed explanation of Feature A with all its benefitsA detailed explanation of Feature A with all its benefitsA detailed explanation of Feature A with all its benefitsA detailed explanation of Feature A with all its benefitsA detailed explanation of Feature A with all its benefitsA detailed explanation of Feature A with all its benefits",
      keywords: ["UI", "Efficiency", "Accessibility"],
      author: "JohnDoe",
      avatar: "https://via.placeholder.com/50", // Replace with real user image
      time: "2 hours ago",
    },
    {
      id: 2,
      title: "Feature B",
      description: "A comprehensive overview of Feature B's functionality.",
      keywords: ["Backend", "Performance", "Scalability"],
      author: "JaneSmith",
      avatar: "https://via.placeholder.com/50", // Replace with real user image
      time: "1 day ago",
    },
  ];

  const post = posts.find((p) => p.id === parseInt(id));

  const handleUpvote = () => votes >= 0 && setVotes(votes + 1);
  const handleDownvote = () => votes > 0 && setVotes(votes - 1);

  const handleAddComment = () => {
    if (commentInput.trim()) {
      setComments([...comments, { id: Date.now(), text: commentInput.trim() }]);
      setCommentInput("");
    }
  };

  return (
    <div
      className={` overflow-scroll h-[90.6vh] ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"
      }`}>
      <div className="w-[calc(75vw-275px)] mx-auto p-6">
        {/* Post Card */}
        <div
          className={`p-4 w-full rounded-lg shadow ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}>
          {/* Header */}
          <div className="flex items-center space-x-4 mb-4">
            <img
              src={post.avatar}
              alt="User avatar"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="text-sm font-medium">
                <span className="text-blue-500">{post.author}</span> •{" "}
                <span>{post.time}</span>
              </p>
              <p className="text-xs text-gray-500">
                {post.keywords.join(", ")}
              </p>
            </div>
          </div>

          {/* Title and Description */}
          <h2 className="text-3xl font-semibold mb-2">{post.title}</h2>
          <p
            className={`text-md mb-4 ${
              darkMode ? "text-gray-200" : "text-gray-700"
            }`}>
            {post.description}
          </p>
          {currentUser?.photoURL && (
            <div className="relative w-full max-h-[450px] bg-gray-300 rounded-md overflow-hidden">
              {/* Blurred background */}
              <img
                src={currentUser?.photoURL}
                alt=""
                className="absolute inset-0 w-full h-full object-cover blur-md"
                aria-hidden="true"
              />

              {/* Centered image */}
              <img
                src={currentUser?.photoURL}
                alt="News Thumbnail"
                className="relative mx-auto h-full object-contain z-10"
              />
            </div>
          )}

          {/* Engagement Bar */}
          <div className="flex items-center justify-between text-gray-600 dark:text-gray-400">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleUpvote}
                className="flex items-center space-x-1 hover:text-green-500">
                <FaArrowUp />
                <span>{votes}</span>
              </button>
              <button
                onClick={handleDownvote}
                className="flex items-center space-x-1 hover:text-red-500">
                <FaArrowDown />
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-1 hover:text-blue-500">
                <FaCommentDots />
                <span>{comments.length} Comments</span>
              </button>
              <button className="flex items-center space-x-1 hover:text-blue-500">
                <FaShare />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="mt-3">
          <h3 className="text-lg font-semibold mb-2">Comments</h3>
          {comments.length > 0 ? (
            <div>
              {comments.map((comment) => (
                <Comment comment={comment} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No comments yet. Be the first!</p>
          )}

          {/* Add Comment */}
          <div className="mt-2 flex">
            <input
              type="text"
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              placeholder="Add a comment..."
              className={`flex-grow p-2 rounded-md  ${
                darkMode
                  ? "bg-gray-700 text-gray-100"
                  : "bg-gray-200 text-gray-900"
              }  `}
            />
            <button
              onClick={handleAddComment}
              className="ml-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md">
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostPreview;
