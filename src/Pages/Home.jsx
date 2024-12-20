import React, { useContext, useState } from "react";
import NavBar from "../Components/NavBar";
import LeftNavBar from "../Components/LeftNavBar";
import { Outlet } from "react-router-dom";
import context from "../Context/context";

const Home = () => {
  const [filter, setFilter] = useState("");
  const { darkMode, setDarkMode } = useContext(context);
  return (
    <div
      className={`font-flux  ${
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
      <div className="flex w-full h-[91.4vh]">
        {/* Sidebar (Left Side for Categories) */}
        <LeftNavBar darkMode={darkMode} />

        {/* Main Content Area  */}
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
