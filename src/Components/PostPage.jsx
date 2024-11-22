import { collection, getDocs, getFirestore } from "firebase/firestore";
import app from "../Firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import Post from "./Post";
import context from "../Context/context";

const PostsPage = ({ isWishlist = false, isQuestion }) => {
  const { darkMode } = useContext(context);
  const [posts, setPosts] = useState([]);
  const db = getFirestore(app);

  useEffect(() => {
    const fetchPosts = async () => {
      const postsCollectionRef = isQuestion
        ? collection(db, "questionPosts")
        : isWishlist
        ? collection(db, "wishlistPosts")
        : collection(db, "posts");
      const querySnapshot = await getDocs(postsCollectionRef);

      const posts = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(posts);
      setPosts(posts);
    };
    fetchPosts();
  }, []);

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
