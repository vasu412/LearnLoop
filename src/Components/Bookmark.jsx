import React, { useContext } from "react";
import context from "../Context/context";

const Bookmarks = () => {
  const { darkMode } = useContext(context);

  const containerClass = `${
    darkMode ? "bg-purple-700" : "bg-purple-500"
  } text-gray-50 p-6 px-16 rounded-sm shadow-lg my-6`;

  const cardClass = `flex-shrink-0 ${
    darkMode ? "bg-purple-700" : "bg-purple-500"
  } text-white p-4 rounded-lg w-72 shadow-md mx-4`;

  const topics = [
    {
      title: "Coursebooks 📘",
      description:
        "Explore coursebooks that simplify complex concepts for effective learning.",
    },
    {
      title: "Lesson Plans & Activities ✏️",
      description:
        "Browse activities and structured lesson plans to engage students.",
    },
    {
      title: "Websites 🌐",
      description:
        "Discover useful websites that provide additional resources for educators.",
    },
  ];

  const cards = {
    "Coursebooks 📘": [
      { title: "Math Basics", description: "A guide to foundational math." },
      { title: "Physics Simplified", description: "Core concepts made easy." },
    ],
    "Lesson Plans & Activities ✏️": [
      {
        title: "Creative Writing",
        description: "Promote storytelling skills.",
      },
      { title: "STEM Challenges", description: "Hands-on STEM activities." },
    ],
    "Websites 🌐": [
      { title: "Khan Academy", description: "Comprehensive online resources." },
      { title: "Coursera", description: "Courses from top universities." },
    ],
  };

  return (
    <div className="w-[calc(100vw-275px)] m-6 h-[88vh] overflow-scroll">
      <div className={containerClass}>
        <h1 className="text-3xl font-bold">Bookmarks 🔖</h1>
        <p className="text-lg mt-2">
          Save and explore valuable resources categorized for effective learning
          and teaching.
        </p>
      </div>

      {topics.map((topic) => (
        <div key={topic.title} className="my-8">
          <h2
            className={`text-2xl ${
              darkMode ? "text-blue-300" : "text-blue-700"
            } font-bold mb-4`}>
            {topic.title}
          </h2>
          <p className="text-base mb-4">{topic.description}</p>
          <div className="flex overflow-x-scroll scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
            {cards[topic.title].map((card, index) => (
              <div key={index} className={cardClass}>
                <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
                <p className="text-sm">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Bookmarks;
