import React, { useState } from "react";
import { FaRegHeart, FaCommentDots } from "react-icons/fa";
import { useLocation } from "react-router-dom"; // For retrieving passed data
import { newsData } from "../Data/newsData";

const PostDetail = ({ darkMode }) => {
  //const { state } = useLocation(); // Get the passed item from the news feed
  const [liked, setLiked] = useState(new Set());
  const [comments, setComments] = useState([]);

  const handleReaction = () => {
    setLiked((prev) => {
      const newLiked = new Set(prev);
      newLiked.has(state?.title)
        ? newLiked.delete(state?.title)
        : newLiked.add(state?.title);
      return newLiked;
    });
  };

  const handleCommentSubmit = (comment) => {
    setComments((prev) => {
      const newComments = [...prev, { text: comment, replies: [] }];
      return newComments;
    });
  };

  const handleReplySubmit = (parentIndex, reply) => {
    setComments((prev) => {
      const newComments = [...prev];
      newComments[parentIndex].replies.push(reply);
      return newComments;
    });
  };

  const state = newsData.items[7];
  return (
    <div className="flex">
      <div
        className={`p-6 w-[calc(75vw-275px)] ${
          darkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"
        }`}>
        <h2 className="text-3xl font-bold mb-4">{state?.title}</h2>
        <p>{state?.snippet}</p>
        <img
          src={
            state?.pagemap?.cse_image[0]?.src ||
            state?.pagemap?.cse_thumbnail[0]?.src
          }
          alt="Post Thumbnail"
          className="w-full max-h-[400px] object-cover mt-4"
        />

        <button
          onClick={handleReaction}
          className={`mt-4 ${
            liked.has(state?.title) ? "text-blue-400" : "text-gray-400"
          }`}>
          <FaRegHeart /> {liked.has(state?.title) ? "Liked" : "Like"}
        </button>

        {/* Comment Section */}
        <div className="mt-6">
          <input
            type="text"
            placeholder="Add a comment..."
            className={`w-full p-2 rounded-md ${
              darkMode ? "bg-gray-700 text-white" : "bg-gray-200 text-gray-900"
            }`}
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.target.value) {
                handleCommentSubmit(e.target.value);
                e.target.value = "";
              }
            }}
          />
          {comments.map((comment, idx) => (
            <div
              key={idx}
              className={`ml-4 mt-2 border-l-2 pl-4 ${
                darkMode
                  ? "border-gray-700 text-gray-400"
                  : "border-gray-300 text-gray-700"
              }`}>
              <p>{comment.text}</p>
              <div className="flex items-center space-x-2 mt-2">
                <input
                  type="text"
                  placeholder="Reply..."
                  className={`w-full p-2 rounded-md ${
                    darkMode
                      ? "bg-gray-700 text-white"
                      : "bg-gray-200 text-gray-900"
                  }`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && e.target.value) {
                      handleReplySubmit(idx, e.target.value);
                      e.target.value = "";
                    }
                  }}
                />
              </div>
              {comment.replies.map((reply, replyIdx) => (
                <div
                  key={replyIdx}
                  className={`ml-4 pl-4 ${
                    darkMode ? "text-gray-400" : "text-gray-700"
                  }`}>
                  <p>{reply}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div
        className={`w-96  p-6 space-y-4  ${
          darkMode
            ? "bg-gray-800 text-white border-black border-x-[1px]"
            : "bg-gray-100 text-gray-900 border-gray-200"
        }`}></div>
    </div>
  );
};

export default PostDetail;
