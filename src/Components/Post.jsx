import React, { useState, useContext } from "react";
import {
  FaSmile,
  FaHeart,
  FaThumbsUp,
  FaCommentDots,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";
import context from "../Context/context";
import { getAuth } from "firebase/auth";
import PreviewPost from "./PreviewPost";
import { useNavigate } from "react-router-dom";

const Post = ({ post, isWishlist, openPreview }) => {
  const [reaction, setReaction] = useState(null);
  const { darkMode } = useContext(context);
  const { currentUser } = getAuth();
  const [votes, setVotes] = useState(0);

  const navigate = useNavigate();
  const handleReact = (emoji) => {
    setReaction(reaction === emoji ? null : emoji);
  };

  const truncateContent = (content) => {
    const maxLines = 5;
    const lines = content.split("\n");
    if (lines.length > maxLines) {
      return {
        truncated: lines.slice(0, maxLines).join("\n"),
        isTruncated: true,
      };
    }
    return { truncated: content, isTruncated: false };
  };

  const { truncated, isTruncated } = truncateContent(
    post.description || post.content
  );

  return (
    <div
      className={`w-full rounded-lg p-6 ${
        darkMode
          ? "hover:bg-gray-800 text-gray-100"
          : "text-gray-900 hover:bg-gray-200"
      }`}>
      <div className="flex items-center mb-2">
        {currentUser && currentUser.photoURL ? (
          <div
            style={{
              backgroundImage: `url(${currentUser.photoURL})`,
            }}
            className="h-7 w-7 mr-2 bg-center bg-cover rounded-full"></div>
        ) : (
          <div className="h-7 w-7 mr-2 bg-gray-400 rounded-full"></div>
        )}
        <p>{currentUser?.displayName || "Anonymous"}</p>
        <p className="mx-2">•</p>
        <p>Time</p>
      </div>
      <h3 className="text-xl font-semibold mt-2">{post.title}</h3>
      <p className="mt-2">
        {truncated}
        {isTruncated && (
          <button
            onClick={() => openPreview(post)}
            className="ml-2 text-blue-500 hover:underline">
            Read more
          </button>
        )}
      </p>
      {post.keywords && isWishlist && (
        <div className="mt-2 flex flex-wrap gap-2">
          {post.keywords.map((keyword, index) => (
            <span
              key={index}
              className={`px-2 py-1 text-sm rounded-md ${
                darkMode
                  ? "bg-gray-700 text-gray-300"
                  : "bg-gray-200 text-gray-700"
              }`}>
              {keyword}
            </span>
          ))}
        </div>
      )}

      {/* Reaction Section */}
      <div className="flex items-center space-x-4 mt-4">
        <div className="flex items-center gap-2 text-gray-400">
          <button
            onClick={() => votes >= 0 && setVotes(votes + 1)}
            className="hover:text-green-400">
            <FaArrowUp />
          </button>
          <span>{votes}</span>
          <button
            onClick={() => votes > 0 && setVotes(votes - 1)}
            className="hover:text-red-400">
            <FaArrowDown />
          </button>
        </div>
        <button
          onClick={() => navigate(`/home/postpreview/${post.id}`)}
          className="text-lg text-gray-500">
          <FaCommentDots />
        </button>
      </div>
    </div>
  );
};

const PostsPage = ({ isWishlist = false }) => {
  const { darkMode } = useContext(context);
  const [previewPost, setPreviewPost] = useState(null);

  const posts = isWishlist
    ? [
        {
          id: 1,
          title: "Feature A",
          description: "A feature that allows XYZ functionality for users.",
          keywords: ["UI", "Efficiency", "Accessibility"],
        },
        {
          id: 2,
          title: "Feature B",
          description: "A feature to enhance ABC processes effectively.",
          keywords: ["Backend", "Performance", "Scalability"],
        },
      ]
    : [
        {
          id: 1,
          title: "React Hooks Deep Dive",
          content: "Master the power of React Hooks with real-world examples.",
        },
        {
          id: 2,
          title: "CSS Grid vs Flexbox",
          content:
            "Understand the key differences and when to use each layout.",
        },
      ];

  return (
    <div
      className={`min-h-screen w-[calc(100vw-660px)] ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"
      }`}>
      <div className="w-full">
        {posts.map((post) => (
          <React.Fragment key={post.id}>
            <Post
              post={post}
              isWishlist={isWishlist}
              openPreview={setPreviewPost}
            />
            <hr
              className={`border-t my-1 w-full border-solid ${
                darkMode ? "border-gray-700" : "border-gray-200"
              }`}
            />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default PostsPage;
