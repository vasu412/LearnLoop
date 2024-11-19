import React from "react";
import LessonPlans from "../Components/LessonPlans";
import Websites from "../Components/Websites";
import Coursebooks from "../Components/CourseBooks";

const TeachingResources = () => {
  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}>
      <main className="p-6">
        <section className="space-y-8">
          <LessonPlans />
          <Websites />
          <Coursebooks />
        </section>
      </main>
    </div>
  );
};

export default TeachingResources;
