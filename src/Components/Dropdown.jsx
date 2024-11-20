import React, { useContext, useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import context from "../Context/context";

// Custom Dropdown Component
const Dropdown = ({ label, options, selectedOption, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { darkMode } = useContext(context);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="relative mr-[7px]">
      <button
        className={` p-2 px-4 flex items-center gap-2 rounded-md w-fit text-left ${
          darkMode
            ? "bg-gray-700 text-white border-gray-600 hover:bg-gray-600"
            : "bg-slate-200 text-black border-gray-300 hover:bg-slate-300"
        } shadow-md focus:outline-none`}
        onClick={toggleDropdown}>
        {selectedOption || ` ${label}`}
        {isOpen ? <FaAngleUp /> : <FaAngleDown />}
      </button>
      {isOpen && (
        <ul
          className={`absolute w-full mt-2 rounded-md z-10 ${
            darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
          }  shadow-lg`}>
          {options.map((option, index) => (
            <li
              key={index}
              className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                darkMode ? "hover:bg-gray-600" : "hover:bg-gray-200"
              }`}
              onClick={() => handleOptionSelect(option)}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
