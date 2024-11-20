import React, { useEffect, useState } from "react";

const Events = ({ event, darkMode }) => {
  const [imageUrl, setImageUrl] = useState("");

  const fetchRandomImage = async () => {
    const response = await fetch(
      `https://pixabay.com/api/?key=42868898-ed34784613294936d0d4f6293&q=${event.title}&image_type=photo&per_page=3`
    );

    const data = await response.json();
    setImageUrl(data?.hits[0]?.largeImageURL);
  };

  useEffect(() => {
    fetchRandomImage();
  }, []);
  return (
    <div
      className={`${
        darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
      } shadow-lg rounded-lg p-6 mb-6`}
      key={event.title}>
      <h3
        className={`text-xl font-bold line-clamp-1 ${
          darkMode ? "text-gray-100" : "text-gray-900"
        }`}>
        {event.title}
      </h3>
      <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
        Date: {event.date}
      </p>
      <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
        Location: {event.location}
      </p>
      <p
        className={`${
          darkMode ? "text-gray-300" : "text-gray-700"
        } line-clamp-3 mt-4`}>
        {event.description}
      </p>

      <img
        src={imageUrl}
        alt={event.title}
        className="w-full h-48 object-cover mt-4 rounded-lg"
        onError={(e) =>
          (e.target.src = "https://via.placeholder.com/150?text=No+Image")
        }
      />

      <a
        href={event.link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 mt-4 inline-block">
        Learn More
      </a>
    </div>
  );
};

export default Events;
