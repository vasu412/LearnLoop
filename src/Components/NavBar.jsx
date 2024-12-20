import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useRef, useState } from "react";
import { FaMoon, FaRegBookmark, FaSearch, FaSun } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { update } from "../Context/slice";
import { doc, getDoc, getFirestore } from "firebase/firestore";

const NavBar = ({ darkMode, setDarkMode }) => {
  const [inputValue, setInputValue] = useState("");
  const [userProfile, setUserProfile] = useState("");
  const auth = getAuth();
  const dispatch = useDispatch();
  const db = getFirestore();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  // useRef to remember in which page user used inputbox
  const path = useRef(null);
  const value = useRef(null);
  // Toggle Dark/Light mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleFilterChange = (e) => {
    path.current = pathname;
    value.current = e.target.value;
    setInputValue(e.target.value);
    dispatch(update(e.target.value));
  };
  const num = useSelector((state) => state.updater);

  const placeholder =
    pathname === "/home/news"
      ? "Search for News or Announcements..."
      : pathname === "/home/events"
      ? "Search for Events..."
      : pathname === "/home/websites"
      ? "Search for Websites..."
      : pathname === "/home/lesson-plans"
      ? "Search for Lessons..."
      : pathname === "/home/coursebooks"
      ? "Search for Coursebooks..."
      : "";

  useEffect(() => {
    if (path.current !== pathname || num === "remove") setInputValue("");
    else setInputValue(value.current);
  }, [pathname, num]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userProfileRef = doc(db, "users", user.uid);
        getDoc(userProfileRef).then((userProfileSnapshot) => {
          if (userProfileSnapshot.exists()) {
            setUserProfile(userProfileSnapshot.data().profile);
          }
        });
      }
    });
    return unsubscribe;
  }, []);

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

      {placeholder !== "" && (
        <div className="relative">
          <input
            type="text"
            value={inputValue}
            onChange={handleFilterChange}
            placeholder={placeholder}
            className={`w-96 p-2 px-4 rounded-full  ${
              darkMode
                ? "bg-gray-800 text-white border-gray-700"
                : "bg-gray-100 text-gray-900 border-gray-300"
            }`}
          />
          {inputValue === "" ? (
            <FaSearch className="absolute right-3 top-3 text-gray-500" />
          ) : (
            <IoClose
              className="absolute right-3 top-3 cursor-pointer text-gray-500"
              onClick={() => setInputValue("")}
            />
          )}
        </div>
      )}

      <div className="flex items-center space-x-3">
        {/* BookMark Icon */}
        <button
          className="p-2 rounded-full border border-gray-300  transition duration-200"
          onClick={() => navigate("/home/bookmarks")}>
          <FaRegBookmark />
        </button>
        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full border border-gray-300  transition duration-200">
          {darkMode ? <FaMoon /> : <FaSun />}
        </button>

        {/* Profile Icon */}
        {(auth?.currentUser?.photoURL || userProfile) && (
          <img
            src={auth?.currentUser?.photoURL || userProfile}
            className="h-[30px] w-[30px] border border-solid rounded-full"
          />
        )}
      </div>
    </nav>
  );
};

export default NavBar;
