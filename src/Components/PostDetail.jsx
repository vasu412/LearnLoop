import React, { useContext } from "react";
import { newsData } from "../Data/newsData";
import context from "../Context/context";

const PostDetail = () => {
  const { darkMode, setDarkMode } = useContext(context);

  //const { state } = useLocation(); // Get the passed item from the news feed
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
