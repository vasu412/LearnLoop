import React, { useState, useContext, useEffect } from "react";
import { FaCommentDots, FaArrowUp, FaArrowDown } from "react-icons/fa";
import context from "../Context/context";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";

const Post = ({ post, isWishlist, isQuestion }) => {
  const { darkMode } = useContext(context);
  const { currentUser } = getAuth();
  const [votes, setVotes] = useState(null);
  const [voteCount, setVoteCount] = useState(0);

  const navigate = useNavigate();
  const db = getFirestore();

  const createdAt = new Date(post?.createdAt);
  const now = new Date();
  const timeDiff = Math.floor((now - createdAt) / 1000); // Time difference in seconds

  let timeAgo = "";
  if (timeDiff < 60) {
    timeAgo = `${timeDiff} seconds ago`;
  } else if (timeDiff < 3600) {
    timeAgo = `${Math.floor(timeDiff / 60)} minutes ago`;
  } else if (timeDiff < 86400) {
    timeAgo = `${Math.floor(timeDiff / 3600)} hours ago`;
  } else {
    timeAgo = `${Math.floor(timeDiff / 86400)} days ago`;
  }

  useEffect(() => {
    votes
      ? setVoteCount((prev) => prev + 1)
      : !votes && voteCount !== 0
      ? setVoteCount((prev) => prev - 1)
      : voteCount;
  }, [votes]);

  useEffect(() => {
    if (!post?.id) return; // Avoid running if post or id is undefined

    const setFirebaseVotes = async () => {
      try {
        const postsCollectionRef = isQuestion
          ? doc(db, "questionPosts", post.id)
          : isWishlist
          ? doc(db, "wishlistPosts", post.id)
          : doc(db, "posts", post.id);

        const querySnapshot = await getDoc(postsCollectionRef);

        if (querySnapshot.exists()) {
          const postData = {
            ...querySnapshot.data(),
            id: querySnapshot.id,
            votes: voteCount,
          };
          console.log(postData);
          // Add the post to Firestore
          await setDoc(postsCollectionRef, postData);
        } else {
          console.error("Post not found in Firestore");
        }
      } catch (error) {
        console.error("Error updating document:", error.message);
      }
    };

    voteCount !== 0 && setFirebaseVotes();
  }, [voteCount, post?.id]);

  return (
    <div
      className={`w-full rounded-lg p-6 cursor-pointer ${
        darkMode
          ? "hover:bg-gray-800 text-gray-100"
          : "text-gray-900 hover:bg-gray-200"
      }`}>
      <div onClick={() => navigate(`/home/postpreview/${post.id}`)}>
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
                {post?.username || currentUser?.userName || "Anonymous"}
              </p>
              <p
                className={`text-xs ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}>
                {timeAgo}
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

        {isWishlist && (
          <h3 className="text-xl font-semibold mt-2">{post?.title}</h3>
        )}
        <p
          className={`mt-2 line-clamp-5 ${
            darkMode ? "text-gray-200" : "text-gray-700"
          }`}>
          {post?.postContent}
        </p>
        {post?.keywords && isWishlist && (
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
      </div>
      {/* Reaction Section */}
      <div className="flex items-center space-x-4 mt-4">
        <div className="flex items-center gap-2 text-gray-400">
          <button
            onClick={() => setVotes((prev) => (prev === true ? null : true))}
            className={`${votes === true && "text-green-400"}`}>
            <FaArrowUp />
          </button>
          <span>{post?.votes}</span>
          <button
            onClick={() => setVotes((prev) => (prev === false ? null : false))}
            className={`${votes === false && voteCount > 0 && "text-red-400"}`}>
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

export default Post;
