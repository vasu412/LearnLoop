import React, { useState, useContext, useEffect } from "react";
import { FaArrowUp, FaArrowDown, FaCommentDots, FaShare } from "react-icons/fa";
import { useParams } from "react-router-dom";
import context from "../Context/context";
import Comment from "../Components/Comment";
import { getAuth } from "firebase/auth";
import { collection, doc, getDoc, getFirestore } from "firebase/firestore";

const PostPreview = () => {
  const { id } = useParams();
  const { darkMode } = useContext(context);
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const [post, setPost] = useState([]);
  const [votes, setVotes] = useState(null);
  const [voteCount, setVoteCount] = useState(0);

  const { currentUser } = getAuth();
  const db = getFirestore();

  const handleAddComment = () => {
    if (commentInput.trim()) {
      setComments([...comments, { id: Date.now(), text: commentInput.trim() }]);
      setCommentInput("");
    }
  };

  useEffect(() => {
    votes
      ? setVoteCount((prev) => prev + 1)
      : !votes && voteCount !== 0
      ? setVoteCount((prev) => prev - 1)
      : voteCount;
  }, [votes]);

  //handling time
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
    const fetchPost = async () => {
      try {
        const postCollectionRef = doc(db, "posts", id); // Reference to the document
        const wishlistPostCollectionRef = doc(db, "wishlistPosts", id); // Reference to the document
        const querySnapshot1 = await getDoc(postCollectionRef); // Fetch the document
        const querySnapshot2 = await getDoc(wishlistPostCollectionRef); // Fetch the document

        if (querySnapshot1.exists()) {
          const post = { id: querySnapshot1.id, ...querySnapshot1.data() }; // Combine ID and document data
          setPost(post);
        } else if (querySnapshot2.exists()) {
          const post = { id: querySnapshot2.id, ...querySnapshot2.data() };
          setPost(post);
        } else {
          console.error("No such document exists!");
        }
      } catch (error) {
        console.error("Error fetching document:", error.message);
      }
    };
    fetchPost();
    setVoteCount(post?.votes);
  }, []);

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
              src={""}
              alt="User avatar"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="text-sm font-medium">
                <span className="text-blue-500">{post?.username}</span> •{" "}
                <span>{timeAgo}</span>
              </p>
              {post?.keywords && (
                <p className="text-xs text-gray-500">
                  {post?.keywords.join(", ")}
                </p>
              )}
            </div>
          </div>

          {/* Title and Description */}
          <h2 className="text-3xl font-semibold mb-2">{post?.title}</h2>
          <p
            className={`text-md mb-4 ${
              darkMode ? "text-gray-200" : "text-gray-700"
            }`}>
            {post?.postContent}
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
            <div className="flex items-center gap-2 text-gray-400">
              <button
                onClick={() =>
                  setVotes((prev) => (prev === true ? null : true))
                }
                className={`${votes === true && "text-green-400"}`}>
                <FaArrowUp />
              </button>
              <span>{voteCount}</span>
              <button
                onClick={() =>
                  setVotes((prev) => (prev === false ? null : false))
                }
                className={`${
                  votes === false && voteCount > 0 && "text-red-400"
                }`}>
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
