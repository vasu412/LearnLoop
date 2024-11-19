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
} from "react-icons/fa";

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
        <li className="flex items-center space-x-4 hover:bg-gray-200 py-3 px-4 rounded-xl">
          <FaHome className="text-2xl" />
          <a
            href="#"
            className={`text-md font-medium  ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}>
            Home
          </a>
        </li>
        {/* News & Announcements */}
        <li className="flex items-center space-x-4 hover:bg-gray-200 py-3 px-4 rounded-xl">
          <FaBullhorn className="text-2xl" />
          <a
            href="#"
            className={`text-md font-medium ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}>
            News & Announcements
          </a>
        </li>
        {/* Events */}
        <li className="flex items-center space-x-4 hover:bg-gray-200 py-3 px-4 rounded-xl">
          <FaCalendarAlt className="text-2xl" />
          <a
            href="#"
            className={`text-md font-medium  ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}>
            Events
          </a>
        </li>

        <hr className="border-t border-solid border-gray-300" />

        {/* Teaching Resources */}
        <li className="flex items-center space-x-4 hover:bg-gray-200 py-3 px-4 rounded-xl">
          <a
            href="#"
            className={`text-md font-extrabold ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}>
            RESOURCES
          </a>
        </li>
        {/* Community Features */}
        <li className="flex items-center space-x-4 hover:bg-gray-200 py-3 px-4 rounded-xl">
          <FaChalkboardTeacher className="text-2xl" />
          <a
            href="#"
            className={`text-md font-medium  ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}>
            Community Features
          </a>
        </li>
        {/* Feature Wishlist */}
        <li className="flex items-center space-x-4 hover:bg-gray-200 py-3 px-4 rounded-xl">
          <FaRegLightbulb className="text-2xl" />
          <a
            href="#"
            className={`text-md font-medium ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}>
            Feature Wishlist
          </a>
        </li>
        {/* Settings */}
        <li className="flex items-center space-x-4 hover:bg-gray-200 py-3 px-4 rounded-xl">
          <FaCog className="text-2xl" />
          <a
            href="#"
            className={`text-md font-medium  ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}>
            Settings & Documentation
          </a>
        </li>
      </ul>
    </div>
  );
};

export default LeftNavBar;
