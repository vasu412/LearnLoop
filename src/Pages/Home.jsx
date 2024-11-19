import React, { useState } from "react";
import NavBar from "../Components/NavBar";
import LeftNavBar from "../Components/LeftNavBar";
import { Outlet } from "react-router-dom";

const Home = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [filter, setFilter] = useState("");
  return (
    <div
      className={`font-flux ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}>
      {/* Top Navigation Bar */}
      <NavBar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        filter={filter}
        setFilter={setFilter}
      />

      {/* Main Layout */}
      <div className="flex w-full">
        {/* Sidebar (Left Side for Categories) */}
        <LeftNavBar darkMode={darkMode} />

        {/* Main Content Area (Right Side) */}
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
