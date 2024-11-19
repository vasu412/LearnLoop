import React from "react";
import { FaMoon, FaSearch, FaSun, FaUserCircle } from "react-icons/fa";

const NavBar = ({ filter, setFilter, darkMode, setDarkMode }) => {
  // Toggle Dark/Light mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };
  return (
    <nav
      className={`flex items-center sticky top-0 z-40 justify-between p-4 border-b  ${
        !darkMode ? "shadow-md border-gray-200 bg-white" : "border-gray-700"
      }`}>
      <div className="flex items-center space-x-3 font-sans">
        <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
          Learn<span className="font-extrabold text-blue-500">Loop</span>
        </h1>
      </div>

      <div className="relative">
        <input
          type="text"
          value={filter}
          onChange={handleFilterChange}
          placeholder="Search for news or announcements..."
          className={`w-96 p-2 px-4 rounded-full  ${
            darkMode
              ? "bg-gray-800 text-white border-gray-700"
              : "bg-gray-100 text-gray-900 border-gray-300"
          }`}
        />
        <FaSearch className="absolute right-3 top-3 text-gray-500" />
      </div>

      <div className="flex items-center space-x-3">
        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full border border-gray-300  transition duration-200">
          {darkMode ? <FaMoon /> : <FaSun />}
        </button>

        {/* Profile Icon */}
        <FaUserCircle size={30} className="text-gray-500 hover:text-gray-300" />
      </div>
    </nav>
  );
};

export default NavBar;
