import { getAuth } from "firebase/auth";
import React from "react";
import { FaMoon, FaSearch, FaSun, FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";

const NavBar = ({ filter, setFilter, darkMode, setDarkMode }) => {
  const auth = getAuth();
  console.log(auth.currentUser.photoURL);
  // Toggle Dark/Light mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };
  const num = useSelector((state) => state.updater);

  const placeholder =
    num === 1
      ? "Search for News or Announcements..."
      : num === 2
      ? "Search for Events..."
      : num === 6
      ? "Search for Websites..."
      : num === 5
      ? "Search for Lessons..."
      : num === 7
      ? "Search for Coursebooks..."
      : "";
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

      {num !== 0 && num !== 3 && num !== 8 && (
        <div className="relative">
          <input
            type="text"
            value={filter}
            onChange={handleFilterChange}
            placeholder={placeholder}
            className={`w-96 p-2 px-4 rounded-full  ${
              darkMode
                ? "bg-gray-800 text-white border-gray-700"
                : "bg-gray-100 text-gray-900 border-gray-300"
            }`}
          />
          <FaSearch className="absolute right-3 top-3 text-gray-500" />
        </div>
      )}

      <div className="flex items-center space-x-3">
        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full border border-gray-300  transition duration-200">
          {darkMode ? <FaMoon /> : <FaSun />}
        </button>

        {/* Profile Icon */}
        {auth?.currentUser?.photoURL && (
          <img
            src={auth?.currentUser?.photoURL}
            className="h-[30px] w-[30px] rounded-full"
          />
        )}
      </div>
    </nav>
  );
};

export default NavBar;
