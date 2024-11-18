import React, { useState } from "react";
import NewsFeed from "../Components/NewsFeed";
import NavBar from "../Components/NavBar";

const CommunityPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [filter, setFilter] = useState("");

  return (
    <div
      className={`font-flux ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}>
      {/* Top Navigation Bar */}
      <NavBar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        filter={filter}
        setFilter={setFilter}
      />

      {/* Main Layout */}
      <div className="flex min-h-screen">
        {/* Sidebar (Left Side for Categories) */}
        <div
          className={`w-80 p-6 space-y-4 ${
            darkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"
          }`}>
          <h3 className="text-lg font-semibold">Categories</h3>
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className={`hover:text-blue-400 ${
                  darkMode ? "text-gray-400" : "text-gray-700"
                }`}>
                Announcements
              </a>
            </li>
            <li>
              <a
                href="#"
                className={`hover:text-blue-400 ${
                  darkMode ? "text-gray-400" : "text-gray-700"
                }`}>
                Events
              </a>
            </li>
            <li>
              <a
                href="#"
                className={`hover:text-blue-400 ${
                  darkMode ? "text-gray-400" : "text-gray-700"
                }`}>
                Discussions
              </a>
            </li>
          </ul>
        </div>

        {/* Main Content Area (Right Side) */}
        <NewsFeed darkMode={darkMode} filter={filter} />
        {/* Sidebar (Right Side ) */}
        <div
          className={`w-64 p-6 space-y-4 ${
            darkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"
          }`}></div>
      </div>
    </div>
  );
};

export default CommunityPage;
