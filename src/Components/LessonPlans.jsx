import React, { useState, useEffect, useContext } from "react";
import context from "../Context/context";

const LessonPlans = () => {
  const [lessonPlans, setLessonPlans] = useState([]);
  const [bookmark, setBookmark] = useState([]);
  const { darkMode } = useContext(context);
  //   useEffect(() => {
  //     // Fetching mock data
  //     const fetchLessonPlans = async () => {
  //       const data = [
  //         {
  //           id: 1,
  //           title: "Math Lesson",
  //           description: "Basic Algebra",
  //           preview: "https://example.com/preview1",
  //         },
  //         {
  //           id: 2,
  //           title: "Science Lesson",
  //           description: "Physics basics",
  //           preview: "https://example.com/preview2",
  //         },
  //       ];
  //       setLessonPlans(data);
  //     };

  //     fetchLessonPlans();
  //   }, []);

  useEffect(() => {
    const fetchLessonPlans = async () => {
      try {
        const response = await fetch(
          "https://oerworldmap.org/resource/?format=json"
        );
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error("Error fetching OER data:", error);
      }
    };

    fetchLessonPlans();
  }, []);

  const handleBookmark = (id) => {
    setBookmark((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
    );
  };

  return (
    <div>
      <h2 className="text-xl font-semibold">Lesson Plans & Activities</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {lessonPlans.map((plan) => (
          <div
            key={plan.id}
            className={`p-4 rounded-lg shadow-md ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}>
            <h3 className="font-bold text-lg truncate">{plan.title}</h3>
            <p className="text-sm text-gray-500 truncate">{plan.description}</p>
            <a
              href={plan.preview}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline mt-2 block">
              Preview
            </a>
            <button
              onClick={() => handleBookmark(plan.id)}
              className={`mt-2 px-3 py-1 text-sm rounded ${
                bookmark.includes(plan.id)
                  ? "bg-red-500 text-white"
                  : "bg-gray-300 text-gray-700"
              }`}>
              {bookmark.includes(plan.id) ? "Remove Bookmark" : "Bookmark"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LessonPlans;
