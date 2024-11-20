import React, { useContext, useEffect, useState } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa"; // Import bookmark icons
import context from "../Context/context";
import { CoursebooksShimmer } from "../Components/Shimmer";

const Coursebooks = () => {
  const [books, setBooks] = useState([]);
  const [bookmarkedBooks, setBookmarkedBooks] = useState(new Set()); // To store bookmarked books
  const { darkMode } = useContext(context);
  const handleSearch = async () => {
    const API_KEY = "AIzaSyBrf0tKzv29itfDgqsV7dHu5WtdfVp4jy4";
    const url = `https://www.googleapis.com/books/v1/volumes?q=Maths&key=${API_KEY}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      setBooks(data.items);
    } catch (error) {
      console.error("Error fetching data from Google Books API:", error);
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

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
      className={`px-10 pb-10 overflow-scroll h-[90.6vh] w-[calc(100vw-275px)] ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}>
      <div
        className={`${
          darkMode ? "bg-pink-700" : "bg-pink-500"
        } text-gray-50 p-6 px-16 rounded-sm shadow-lg my-6`}>
        <h1 className="text-3xl font-bold">Coursebooks</h1>
        <p className="text-lg mt-2">
          Discover a wide range of coursebooks designed to guide students
          through key subjects, enhancing their understanding and academic
          performance.
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.length === 0 ? (
          <CoursebooksShimmer />
        ) : (
          books.map((book) => {
            const isBookmarked = bookmarkedBooks.has(book.id);
            return (
              <div
                key={book.id}
                className={`p-4 rounded-lg shadow-md h-full transition-all relative ${
                  darkMode
                    ? "bg-gray-800 text-white border hover:bg-gray-700 border-gray-700"
                    : "bg-white text-black border hover:bg-zinc-200 border-gray-200"
                }  hover:shadow-xl`}>
                {/* Bookmark Icon */}
                <div
                  className="absolute top-2 right-2 cursor-pointer"
                  onClick={() => handleBookmarkToggle(book.id)}>
                  {isBookmarked ? (
                    <FaBookmark className="text-blue-500 text-xl" />
                  ) : (
                    <FaRegBookmark className="text-gray-500 text-xl" />
                  )}
                </div>

                <h3
                  className={`font-bold text-lg mb-2 truncate ${
                    darkMode ? "text-white" : "text-black"
                  }`}>
                  {book?.volumeInfo?.title}
                </h3>
                <img
                  src={book?.volumeInfo?.imageLinks?.thumbnail}
                  alt="Book cover"
                  className="h-48 object-cover mb-4 rounded"
                />
                <p
                  className={`text-sm mb-1 ${
                    darkMode ? "text-gray-300" : "text-gray-500"
                  }`}>
                  Author: {book?.volumeInfo?.authors?.[0] || "Unknown"}
                </p>
                <p
                  className={`text-sm mb-1 ${
                    darkMode ? "text-gray-300" : "text-gray-500"
                  }`}>
                  Publisher: {book?.volumeInfo?.publisher || "Unknown"}
                </p>
                <p
                  className={`text-sm mb-2 ${
                    darkMode ? "text-gray-300" : "text-gray-500"
                  }`}>
                  Published: {book?.volumeInfo?.publishedDate || "Unknown"}
                </p>
                <p
                  className={`text-sm opacity-80 line-clamp-2 ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}>
                  {book?.volumeInfo?.description || "No description available"}
                </p>
                <a
                  href={book?.volumeInfo?.previewLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline mt-2 block">
                  Preview
                </a>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Coursebooks;
