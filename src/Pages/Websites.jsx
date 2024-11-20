import React, { useContext, useState } from "react";
import { websiteData } from "../Data/Websites";
import context from "../Context/context";

const Websites = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const { darkMode } = useContext(context);

  const handleBookmark = (id) => {
    if (bookmarks.includes(id)) {
      setBookmarks(bookmarks.filter((bookmarkId) => bookmarkId !== id));
    } else {
      setBookmarks([...bookmarks, id]);
    }
  };

  return (
    <div
      className={`mx-10 w-[calc(100vw-275px)] text-gray-100 h-[90.6vh] overflow-scroll ${
        darkMode ? "bg-gray-900 " : "bg-gray-100 "
      }`}>
      <div
        className={`p-6 px-16 rounded-sm shadow-lg my-6 ${
          darkMode ? "bg-purple-700" : "bg-purple-500"
        }`}>
        <h1 className="text-3xl font-bold ">Websites</h1>
        <p className="text-lg mt-2">
          Explore educational websites offering interactive tools, resources,
          and content for diverse learning needs and styles.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {websiteData.websites.map((website) => (
          <div
            key={website.id}
            className={`p-6 rounded-lg shadow-lg ${
              darkMode ? "bg-gray-800 text-gray-200" : "bg-white text-gray-800"
            }`}>
            <div className="relative">
              <img
                src={website.previewImage}
                alt={website.name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <button
                className={`absolute top-2 right-2 cursor-pointer text-xl ${
                  bookmarks.includes(website.id)
                    ? "text-yellow-400"
                    : "text-gray-400"
                }`}
                onClick={() => handleBookmark(website.id)}>
                {bookmarks.includes(website.id) ? "★" : "☆"}
              </button>
            </div>

            <h3 className="text-xl font-semibold mb-2 line-clamp-1">
              {website.name}
            </h3>
            <p className="text-sm mb-2">{website.category}</p>
            <p className="text-sm mb-4 line-clamp-2">{website.description}</p>

            {/* Rating and Count */}
            <div className="mb-4 flex items-center">
              <span
                className={`text-sm ${
                  darkMode ? "text-yellow-400" : "text-yellow-500"
                }`}>
                ★ {website.userRating}
              </span>
              <span
                className={`text-sm ml-2 ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}>
                ({website.ratingCount} ratings)
              </span>
            </div>

            <div className="mb-4">
              <h4 className="font-semibold text-sm">Subjects:</h4>
              <ul className="text-sm">
                {website.subjects.map((subject, index) => (
                  <li key={index}>{subject}</li>
                ))}
              </ul>
            </div>

            <div className="mb-4">
              <h4 className="font-semibold text-sm">Resources:</h4>
              <ul className="text-sm">
                {website.resources.map((resource, index) => (
                  <li key={index}>{resource}</li>
                ))}
              </ul>
            </div>

            <div className="flex justify-between items-center mt-4">
              <a
                href={website.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline text-sm">
                Visit Website
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Websites;
