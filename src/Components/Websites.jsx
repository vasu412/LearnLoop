import React from "react";

const Websites = ({ darkMode }) => {
  const websites = [
    {
      id: 1,
      title: "Khan Academy",
      description: "A free resource for learning various subjects.",
      url: "https://khanacademy.org",
    },
    {
      id: 2,
      title: "Edutopia",
      description: "Ideas for teaching strategies.",
      url: "https://edutopia.org",
    },
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold">Websites for Lesson Preparation</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {websites.map((site) => (
          <div
            key={site.id}
            className={`p-4 rounded-lg shadow-md ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}>
            <h3 className="font-bold text-lg truncate">{site.title}</h3>
            <p className="text-sm text-gray-500 truncate">{site.description}</p>
            <a
              href={site.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline mt-2 block">
              Visit
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Websites;
