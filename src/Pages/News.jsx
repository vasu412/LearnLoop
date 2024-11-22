import React, { useContext } from "react";
import NewsFeed from "../Components/NewsFeed";
import NewsCarousel from "../Components/NewsCarousel";
import context from "../Context/context";

const NewsPage = () => {
  const { darkMode } = useContext(context);
  return (
    <div
      className={`flex w-[calc(100vw-275px)] flex-col h-[90.6vh] overflow-scroll `}>
      <NewsCarousel
        apiKey={"0f92f9e7342d43f791efe03243bf8246"}
        darkMode={darkMode}
      />
      <div className="flex">
        <NewsFeed darkMode={darkMode} />
        {/* Sidebar (Right Side ) */}
        <div
          className={`w-96  p-6 space-y-4  ${
            darkMode
              ? "bg-gray-800 text-white border-black border-x-[1px]"
              : "bg-gray-100 text-gray-900 border-gray-200"
          }`}></div>
      </div>
    </div>
  );
};

export default NewsPage;
