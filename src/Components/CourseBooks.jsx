import React from "react";

const Coursebooks = ({ darkMode }) => {
  const coursebooks = [
    {
      id: 1,
      title: "Intro to Programming",
      author: "John Doe",
      preview: "https://example.com/book1",
    },
    {
      id: 2,
      title: "Advanced Mathematics",
      author: "Jane Smith",
      preview: "https://example.com/book2",
    },
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold">Coursebooks</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {coursebooks.map((book) => (
          <div
            key={book.id}
            className={`p-4 rounded-lg shadow-md ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}>
            <h3 className="font-bold text-lg truncate">{book.title}</h3>
            <p className="text-sm text-gray-500">Author: {book.author}</p>
            <a
              href={book.preview}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline mt-2 block">
              Preview
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Coursebooks;
