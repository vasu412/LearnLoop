import React, { useContext, useEffect, useState } from "react";
import { events } from "../Data/Events";
import context from "../Context/context";
import Events from "../Components/Events";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const EventPage = () => {
  const { darkMode } = useContext(context); // Access darkMode from context
  const inputValue = useSelector((state) => state.updater);
  const { pathname } = useLocation();
  const [eventData, setEventData] = useState(events);

  useEffect(() => {
    if (pathname === "/home/events" && inputValue !== "remove") {
      const data = events.filter(
        (event) =>
          event.title.toLowerCase().includes(inputValue) ||
          event.location.toLowerCase().includes(inputValue) ||
          event.description.toLowerCase().includes(inputValue)
      );
      setEventData(data);
    }
  }, [inputValue]);
  return (
    <div
      className={`w-[calc(100vw-275px)] h-[90.6vh] overflow-scroll py-8 px-4 sm:px-8 ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}>
      <div
        className={`${
          darkMode ? "bg-blue-950" : "bg-blue-900"
        } text-gray-50 p-6 px-16 rounded-sm shadow-lg mb-6`}>
        <h1 className="text-3xl font-bold">Upcoming Educational Events 📅</h1>
        <p className="text-lg mt-2">
          Explore a variety of upcoming educational events happening worldwide,
          ranging from workshops and webinars to conferences and courses.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {eventData.map((event) => (
          <Events event={event} darkMode={darkMode} key={event.title} />
        ))}
      </div>
    </div>
  );
};

export default EventPage;
