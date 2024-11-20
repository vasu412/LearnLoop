import React, { useState, useEffect, useContext } from "react";
import { lessons } from "../Data/Lessons.jsx";
import Dropdown from "../Components/Dropdown";
import context from "../Context/context.js";
import Lessons from "../Components/Lessons.jsx";

const LessonPlans = () => {
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("");
  const [filteredLessons, setFilteredLessons] = useState([]);
  const [bookmarkedBooks, setBookmarkedBooks] = useState(new Set()); // To store bookmarked books
  const { darkMode } = useContext(context);

  // Apply filters dynamically when state changes
  useEffect(() => {
    const filterLessons = () => {
      const allLessons = Object.values(lessons.subjects).flat();
      const filtered = allLessons.filter((lesson) => {
        const matchesSubject = selectedSubject
          ? lesson.title
              .toLowerCase()
              .includes(selectedSubject.toLowerCase()) ||
            lesson.id.toLowerCase().includes(selectedSubject.toLowerCase())
          : true;
        const matchesDuration = selectedDuration
          ? lesson.duration === selectedDuration
          : true;
        return matchesSubject && matchesDuration;
      });
      setFilteredLessons(filtered);
    };

    filterLessons();
  }, [selectedSubject, selectedDuration]);

  const handleBookmarkToggle = (bookId) => {
    setBookmarkedBooks((prev) => {
      const newBookmarkedBooks = new Set(prev);
      if (newBookmarkedBooks.has(bookId)) {
        newBookmarkedBooks.delete(bookId); // Remove if already bookmarked
      } else {
        newBookmarkedBooks.add(bookId); // Add if not bookmarked
      }
      return newBookmarkedBooks;
    });
  };

  return (
    <div
      className={`${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-800"
      } w-[calc(100vw-275px)] h-[90.4vh] overflow-scroll p-8 pl-10 pr-24`}>
      {/* Header Section */}
      <div
        className={`${
          darkMode ? "bg-blue-700" : "bg-blue-500"
        } text-gray-50 p-6 px-16 rounded-sm shadow-lg mb-6`}>
        <h1 className="text-3xl font-bold">Lesson Plans & Activities</h1>
        <p className="text-lg mt-2">
          Explore lesson plans and activities for different subjects and grade
          levels to enhance learning experiences.
        </p>
      </div>

      {/* Filters Section */}
      <div className="flex sm:flex-row w-fit mb-6 space-x-4">
        <Dropdown
          label="Subject"
          options={Object.keys(lessons.subjects)}
          selectedOption={selectedSubject}
          onSelect={(option) => setSelectedSubject(option)}
        />
        <Dropdown
          label="Length of Activity"
          options={["30 minutes", "45 minutes", "60 minutes"]}
          selectedOption={selectedDuration}
          onSelect={(option) => setSelectedDuration(option)}
        />
      </div>

      {/* Lessons Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredLessons.length > 0 ? (
          filteredLessons.map((lesson) => {
            const isBookmarked = bookmarkedBooks.has(lesson.id);

            return (
              <Lessons
                lesson={lesson}
                isBookmarked={isBookmarked}
                darkMode={darkMode}
                key={lesson.title}
              />
            );
          })
        ) : (
          <p
            className={`${
              darkMode ? "text-gray-400" : "text-gray-600"
            } col-span-3 text-center`}>
            No lessons found. Please adjust your filters.
          </p>
        )}
      </div>
    </div>
  );
};

export default LessonPlans;
