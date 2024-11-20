import React, { useEffect, useState } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

const Lessons = ({ lesson, isBookmarked, darkMode }) => {
  const [imageUrl, setImageUrl] = useState("");

  const fetchRandomImage = async () => {
    const response = await fetch(
      `https://pixabay.com/api/?key=42868898-ed34784613294936d0d4f6293&q=${lesson.title}&image_type=photo&per_page=3`
    );

    const data = await response.json();
    setImageUrl(data?.hits[0]?.largeImageURL);
  };

  useEffect(() => {
    fetchRandomImage();
  }, []);

  return (
    <div
      key={lesson.id}
      className={`${
        darkMode ? "bg-gray-800 text-gray-200" : "bg-white text-gray-800"
      } relative p-4 rounded-md shadow-lg hover:shadow-xl transition-shadow`}>
      <img
        src={imageUrl}
        alt={lesson.title}
        className="w-full h-40 object-cover rounded-md mb-4"
        onError={(e) =>
          (e.target.src = "https://via.placeholder.com/150?text=No+Image")
        }
      />
      <div
        className="absolute top-2 right-2 cursor-pointer"
        onClick={() => handleBookmarkToggle(lesson.id)}>
        {isBookmarked ? (
          <FaBookmark className="text-blue-500 text-xl" />
        ) : (
          <FaRegBookmark className="text-gray-400 text-xl" />
        )}
      </div>
      <h3 className="text-xl font-semibold">{lesson.title}</h3>
      <p className="text-gray-500">Grade: {lesson.gradeLevel}</p>
      <p className="text-sm text-gray-600 mt-2">Duration: {lesson.duration}</p>
      <div className="mt-4">
        <h4
          className={`${
            darkMode ? "text-gray-300" : "text-gray-700"
          } text-sm font-semibold`}>
          Objectives:
        </h4>
        <ul className="list-disc list-inside">
          {lesson.objectives &&
            lesson.objectives.map((objective, index) => (
              <li
                key={index}
                className={`${
                  darkMode ? "text-gray-400" : "text-gray-600"
                } text-sm`}>
                {objective}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Lessons;
