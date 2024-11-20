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
import { useDispatch, useSelector } from "react-redux";
import { update } from "../Context/slice";

const LeftNavBar = ({ darkMode }) => {
  const commonTextClasses = `text-md font-medium ${
    darkMode ? "text-gray-400" : "text-gray-600"
  }`;
  const commonHoverClasses = `${
    darkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"
  } py-3 px-4 rounded-xl`;

  const num = useSelector((state) => state.updater);
  const colorOnClick = `${darkMode ? "bg-gray-700" : "bg-gray-200"}`;

  const dispatch = useDispatch();
  return (
    <div
      className={`w-[275px] h-[90.6vh] p-4 border-0 border-x border-solid space-y-8 ${
        darkMode
          ? "bg-gray-800 text-white border-gray-700"
          : "bg-gray-100 text-gray-900 border-gray-200"
      }`}>
      <ul>
        {/* Homepage */}
        <Link to={"/home/"} onClick={() => dispatch(update(0))}>
          <li
            className={`flex items-center space-x-3 ${
              num === 0 && colorOnClick
            } ${commonHoverClasses}`}>
            <FaHome className="text-xl" />
            <span className={commonTextClasses}>Home</span>
          </li>
        </Link>

        <hr
          className={`border-t border-solid ${
            darkMode ? "border-gray-700" : "border-gray-300"
          }`}
        />

        {/* Updates Section */}
        <li className="flex items-center space-x-3 pt-3 px-4">
          <span
            className={`text-md font-extrabold ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}>
            UPDATES
          </span>
        </li>
        <Link to={"/home/news"} onClick={() => dispatch(update(1))}>
          <li
            className={`flex items-center space-x-3 ${
              num === 1 && colorOnClick
            } ${commonHoverClasses}`}>
            <FaBullhorn className="text-xl" />
            <span className={commonTextClasses}>News & Announcements</span>
          </li>
        </Link>
        <Link to={"/home/events"} onClick={() => dispatch(update(2))}>
          <li
            className={`flex items-center space-x-3 ${
              num === 2 && colorOnClick
            } ${commonHoverClasses}`}>
            <FaCalendarAlt className="text-xl" />
            <span className={commonTextClasses}>Events</span>
          </li>
        </Link>
        <Link to={"/home/wishlist"} onClick={() => dispatch(update(3))}>
          <li
            className={`flex items-center space-x-3 ${
              num === 3 && colorOnClick
            } ${commonHoverClasses}`}>
            <FaRegLightbulb className="text-xl" />
            <span className={commonTextClasses}>Feature Wishlist</span>
          </li>
        </Link>

        <hr
          className={`border-t border-solid ${
            darkMode ? "border-gray-700" : "border-gray-300"
          }`}
        />

        {/* Connect Section */}
        <li className="flex items-center space-x-3 pt-3 px-4">
          <span
            className={`text-md font-extrabold ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}>
            CONNECT
          </span>
        </li>
        <Link to={"/home/chat"} onClick={() => dispatch(update(4))}>
          <li
            className={`flex items-center space-x-3 ${
              num === 4 && colorOnClick
            } ${commonHoverClasses}`}>
            <BsChatSquareText className="text-lg" />
            <span className={commonTextClasses}>Tutor Chat Room</span>
          </li>
        </Link>

        <hr
          className={`border-t border-solid ${
            darkMode ? "border-gray-700" : "border-gray-300"
          }`}
        />

        {/* Resources Section */}
        <li className="flex items-center space-x-3 pt-3 px-4">
          <span
            className={`text-md font-extrabold ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}>
            RESOURCES
          </span>
        </li>

        <Link to={"/home/lesson-plans"} onClick={() => dispatch(update(5))}>
          <li
            className={`flex items-center space-x-3 ${
              num === 5 && colorOnClick
            } ${commonHoverClasses}`}>
            <FaBook className="text-xl" />
            <span className={commonTextClasses}>Lesson Plans</span>
          </li>
        </Link>
        <Link to={"/home/websites"} onClick={() => dispatch(update(6))}>
          <li
            className={`flex items-center space-x-3 ${
              num === 6 && colorOnClick
            } ${commonHoverClasses}`}>
            <FaLink className="text-xl" />
            <span className={commonTextClasses}>Websites</span>
          </li>
        </Link>
        <Link to={"/home/coursebooks"} onClick={() => dispatch(update(7))}>
          <li
            className={`flex items-center space-x-3 ${
              num === 7 && colorOnClick
            } ${commonHoverClasses}`}>
            <FaBook className="text-xl" />
            <span className={commonTextClasses}>Coursebooks</span>
          </li>
        </Link>

        <hr
          className={`border-t border-solid ${
            darkMode ? "border-gray-700" : "border-gray-300"
          }`}
        />

        <Link
          to={"/home/resources/community"}
          onClick={() => dispatch(update(8))}>
          <li
            className={`flex items-center space-x-3 ${
              num === 8 && colorOnClick
            } ${commonHoverClasses}`}>
            <FaChalkboardTeacher className="text-xl" />
            <span className={commonTextClasses}>Community Features</span>
          </li>
        </Link>
        {/* Settings */}
        <Link to={"/home/settings"} onClick={() => dispatch(update(9))}>
          <li
            className={`flex items-center space-x-3 ${
              num === 9 && colorOnClick
            } ${commonHoverClasses}`}>
            <FaCog className="text-xl" />
            <span className={commonTextClasses}>Settings & Documentation</span>
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default LeftNavBar;
