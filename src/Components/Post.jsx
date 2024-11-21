import React, { useState, useContext } from "react";
import { FaCommentDots, FaArrowUp, FaArrowDown } from "react-icons/fa";
import context from "../Context/context";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Post = ({ post, isWishlist }) => {
  const { darkMode } = useContext(context);
  const { currentUser } = getAuth();
  const [votes, setVotes] = useState(0);

  const navigate = useNavigate();

  return (
    <div
      className={`w-full rounded-lg p-6 ${
        darkMode
          ? "hover:bg-gray-800 text-gray-100"
          : "text-gray-900 hover:bg-gray-200"
      }`}
      onClick={() => navigate(`/home/postpreview/${post.id}`)}>
      <div
        className={`flex items-center text-sm mb-2 ${
          darkMode ? "text-gray-100" : "text-gray-800"
        }`}>
        {/* User Avatar */}
        {currentUser && currentUser.photoURL ? (
          <div
            style={{
              backgroundImage: `url(${currentUser.photoURL})`,
            }}
            className="h-10 w-10 mr-3 bg-center bg-cover rounded-full border border-gray-500"></div>
        ) : (
          <div
            className={`h-10 w-10 mr-3 rounded-full ${
              darkMode ? "bg-gray-600" : "bg-gray-300"
            }`}></div>
        )}

        {/* User Info */}
        <div className="flex items-center gap-3">
          <div className="flex flex-col leading-tight">
            <p
              className={`font-medium ${
                darkMode ? "text-gray-200" : "text-gray-900"
              }`}>
              {currentUser?.displayName || "Anonymous"}
            </p>
            <p
              className={`text-xs ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}>
              Posted 2 hours ago
            </p>
          </div>

          {/* Admin or USER Badge */}
          <div
            className={`px-2 py-0.5 rounded-sm text-[10px] font-semibold ${
              darkMode
                ? "bg-blue-700 text-gray-100"
                : "bg-blue-500 text-gray-50"
            }`}>
            {currentUser?.isAdmin ? "ADMIN" : "NEW MEMBER"}
          </div>
        </div>
      </div>

      <h3 className="text-xl font-semibold mt-2">{post.title}</h3>
      <p
        className={`mt-2 line-clamp-5 ${
          darkMode ? "text-gray-200" : "text-gray-700"
        }`}>
        {post.description}
      </p>
      {post.keywords && isWishlist && (
        <div className="mt-2 flex flex-wrap gap-2">
          {post.keywords.map((keyword, index) => (
            <span
              key={index}
              className={`px-2 py-1 text-sm rounded-md ${
                darkMode
                  ? "bg-gray-700 text-gray-300"
                  : "bg-gray-300 text-gray-700"
              }`}>
              {keyword}
            </span>
          ))}
        </div>
      )}
      {currentUser?.photoURL && (
        <div className="relative w-full my-2 max-h-[450px] bg-gray-300 rounded-md overflow-hidden">
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

  const posts = isWishlist
    ? [
        {
          id: 1,
          title: "Feature A",
          description:
            "A feature that allows XYZ functionality for users.A detailed explanation of Feature A with all its benefitsA detailed explanation of Feature A with all its benefitsA detailed explanation of Feature A with all its benefitsA detailed explanation of Feature A with all its benefitsA detailed explanation of Feature A with all its benefitsA detailed explanation of Feature A with all its benefitsA detailed explanation of Feature A with all its benefitsA detailed explanation of Feature A with all its benefitsA detailed explanation of Feature A with all its benefitsA detailed explanation of Feature A with all its benefitsA detailed explanation of Feature A with all its benefitsA detailed explanation of Feature A with all its benefitsA detailed explanation of Feature A with all its benefitsA detailed explanation of Feature A with all its benefitsA detailed explanation of Feature A with all its benefitsA detailed explanation of Feature A with all its benefitsA detailed explanation of Feature A with all its benefits",
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
            <Post post={post} isWishlist={isWishlist} />
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
