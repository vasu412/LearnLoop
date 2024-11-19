import React from "react";
import {
  FaHome,
  FaBullhorn,
  FaCommentDots,
  FaCalendarAlt,
  FaBook,
  FaChalkboardTeacher,
  FaRegLightbulb,
  FaCog,
  FaThList,
} from "react-icons/fa";
import { BsChatSquareText } from "react-icons/bs";
import { Link } from "react-router-dom";

const LeftNavBar = ({ darkMode }) => {
  return (
    <div
      className={`w-[275px] h-[90.6vh] p-4 border-x-2 border-solid space-y-8 ${
        darkMode
          ? "bg-gray-800 text-white border-black border-x-[1px]"
          : "bg-gray-100 text-gray-900 border-gray-200"
      }`}>
      <ul>
        {/* Homepage */}
        <Link to={"/home/"}>
          <li className="flex items-center space-x-4 hover:bg-gray-200 py-3 px-4 rounded-xl">
            <FaHome className="text-2xl" />
            <span
              href="#"
              className={`text-md font-medium  ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}>
              Home
            </span>
          </li>
        </Link>

        <hr className="border-t border-solid border-gray-300" />
        <li className="flex items-center space-x-4 hover:bg-gray-200 pt-3 px-4 rounded-xl">
          <span
            href="#"
            className={`text-md font-extrabold ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}>
            UPDATES
          </span>
        </li>

        {/* News & Announcements */}
        <Link to={"/home/news"}>
          <li className="flex items-center space-x-4 hover:bg-gray-200 py-3 px-4 rounded-xl">
            <FaBullhorn className="text-2xl" />
            <span
              href="#"
              className={`text-md font-medium ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}>
              News & Announcements
            </span>
          </li>
        </Link>
        {/* Events */}
        <Link to={"/home/events"}>
          <li className="flex items-center space-x-4 hover:bg-gray-200 py-3 px-4 rounded-xl">
            <FaCalendarAlt className="text-2xl" />
            <span
              className={`text-md font-medium  ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}>
              Events
            </span>
          </li>
        </Link>
        {/* Feature Wishlist */}
        <Link to={"/home/wishlist"}>
          <li className="flex items-center space-x-4 hover:bg-gray-200 py-3 px-4 rounded-xl">
            <FaRegLightbulb className="text-2xl" />
            <span
              className={`text-md font-medium  ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}>
              Feature Wishlist
            </span>
          </li>
        </Link>
        <hr className="border-t border-solid border-gray-300" />

        {/* Teaching Resources */}
        <li className="flex items-center space-x-4 hover:bg-gray-200 pt-3 px-4 rounded-xl">
          <span
            href="#"
            className={`text-md font-extrabold ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}>
            CONNECT
          </span>
        </li>
        <Link>
          <li className="flex items-center space-x-4 hover:bg-gray-200 py-3 px-4 rounded-xl">
            <BsChatSquareText className="text-xl ml-[2px]" />
            <span
              className={`text-md font-medium  ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}>
              TUTOR CHAT ROOM
            </span>
          </li>
        </Link>

        <hr className="border-t border-solid border-gray-300" />

        {/* Teaching Resources */}
        <li className="flex items-center space-x-4 hover:bg-gray-200 py-3 px-4 rounded-xl">
          <span
            href="#"
            className={`text-md font-extrabold ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}>
            RESOURCES
          </span>
        </li>
        {/* Community Features */}
        <li className="flex items-center space-x-4 hover:bg-gray-200 py-3 px-4 rounded-xl">
          <FaChalkboardTeacher className="text-2xl" />
          <span
            href="#"
            className={`text-md font-medium  ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}>
            Community Features
          </span>
        </li>
        {/* Feature Wishlist */}
        <li className="flex items-center space-x-4 hover:bg-gray-200 py-3 px-4 rounded-xl">
          <FaRegLightbulb className="text-2xl" />
          <span
            href="#"
            className={`text-md font-medium ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}>
            Feature Wishlist
          </span>
        </li>
        {/* Settings */}
        <li className="flex items-center space-x-4 hover:bg-gray-200 py-3 px-4 rounded-xl">
          <FaCog className="text-2xl" />
          <span
            href="#"
            className={`text-md font-medium  ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}>
            Settings & Documentation
          </span>
        </li>
      </ul>
    </div>
  );
};

export default LeftNavBar;
