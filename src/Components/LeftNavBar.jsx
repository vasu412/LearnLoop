import React from "react";
import {
  FaHome,
  FaBullhorn,
  FaCalendarAlt,
  FaChalkboardTeacher,
  FaRegLightbulb,
  FaCog,
  FaBook,
  FaLink,
} from "react-icons/fa";
import { BsChatSquareText } from "react-icons/bs";
import { Link } from "react-router-dom";

const LeftNavBar = ({ darkMode }) => {
  const commonTextClasses = `text-md font-medium ${
    darkMode ? "text-gray-400" : "text-gray-600"
  }`;
  const commonHoverClasses = `${
    darkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"
  } py-3 px-4 rounded-xl`;

  return (
    <div
      className={`w-[275px] h-[90.6vh] p-4 border-x-2 border-solid space-y-8 ${
        darkMode
          ? "bg-gray-800 text-white border-black"
          : "bg-gray-100 text-gray-900 border-gray-200"
      }`}>
      <ul>
        {/* Homepage */}
        <Link to={"/home/"}>
          <li className={`flex items-center space-x-3 ${commonHoverClasses}`}>
            <FaHome className="text-xl" />
            <span className={commonTextClasses}>Home</span>
          </li>
        </Link>

        <hr className="border-t border-solid border-gray-300" />

        {/* Updates Section */}
        <li className="flex items-center space-x-3 pt-3 px-4">
          <span
            className={`text-md font-extrabold ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}>
            UPDATES
          </span>
        </li>
        <Link to={"/home/news"}>
          <li className={`flex items-center space-x-3 ${commonHoverClasses}`}>
            <FaBullhorn className="text-xl" />
            <span className={commonTextClasses}>News & Announcements</span>
          </li>
        </Link>
        <Link to={"/home/events"}>
          <li className={`flex items-center space-x-3 ${commonHoverClasses}`}>
            <FaCalendarAlt className="text-xl" />
            <span className={commonTextClasses}>Events</span>
          </li>
        </Link>
        <Link to={"/home/wishlist"}>
          <li className={`flex items-center space-x-3 ${commonHoverClasses}`}>
            <FaRegLightbulb className="text-xl" />
            <span className={commonTextClasses}>Feature Wishlist</span>
          </li>
        </Link>

        <hr className="border-t border-solid border-gray-300" />

        {/* Connect Section */}
        <li className="flex items-center space-x-3 pt-3 px-4">
          <span
            className={`text-md font-extrabold ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}>
            CONNECT
          </span>
        </li>
        <Link to={"/home/chat"}>
          <li className={`flex items-center space-x-3 ${commonHoverClasses}`}>
            <BsChatSquareText className="text-lg" />
            <span className={commonTextClasses}>Tutor Chat Room</span>
          </li>
        </Link>

        <hr className="border-t border-solid border-gray-300" />

        {/* Resources Section */}
        <li className="flex items-center space-x-3 pt-3 px-4">
          <span
            className={`text-md font-extrabold ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}>
            RESOURCES
          </span>
        </li>

        <Link to={"/home/resources/lesson-plans"}>
          <li className={`flex items-center space-x-3 ${commonHoverClasses}`}>
            <FaBook className="text-xl" />
            <span className={commonTextClasses}>Lesson Plans</span>
          </li>
        </Link>
        <Link to={"/home/resources/websites"}>
          <li className={`flex items-center space-x-3 ${commonHoverClasses}`}>
            <FaLink className="text-xl" />
            <span className={commonTextClasses}>Websites</span>
          </li>
        </Link>
        <Link to={"/home/resources/coursebooks"}>
          <li className={`flex items-center space-x-3 ${commonHoverClasses}`}>
            <FaBook className="text-xl" />
            <span className={commonTextClasses}>Coursebooks</span>
          </li>
        </Link>

        <hr className="border-t border-solid border-gray-300" />
        <Link to={"/home/resources/community"}>
          <li className={`flex items-center space-x-3 ${commonHoverClasses}`}>
            <FaChalkboardTeacher className="text-xl" />
            <span className={commonTextClasses}>Community Features</span>
          </li>
        </Link>
        {/* Settings */}
        <Link to={"/home/settings"}>
          <li className={`flex items-center space-x-3 ${commonHoverClasses}`}>
            <FaCog className="text-xl" />
            <span className={commonTextClasses}>Settings & Documentation</span>
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default LeftNavBar;
