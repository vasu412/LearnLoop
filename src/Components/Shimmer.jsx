import { useContext } from "react";
import context from "../Context/context";

export const NewsCarouselShimmer = () => {
  const { darkMode } = useContext(context);
  return (
    <div className="flex space-x-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className={`h-56 w-1/3 rounded-lg animate-pulse flex flex-col justify-end p-4 relative ${
            darkMode ? "bg-gray-700" : "bg-gray-300"
          }`}>
          <div
            className={`bg-gradient-to-t ${
              darkMode
                ? "from-gray-800 via-gray-700 to-gray-600"
                : "from-gray-400 via-gray-300 to-gray-200"
            } h-full w-full absolute inset-0 rounded-lg`}></div>
          <div className="relative z-10">
            <div
              className={`h-6 rounded w-3/4 mb-2 ${
                darkMode ? "bg-gray-600" : "bg-gray-400"
              }`}></div>
            <div
              className={`h-4 rounded w-5/6 mb-1 ${
                darkMode ? "bg-gray-600" : "bg-gray-400"
              }`}></div>
            <div
              className={`h-4 rounded w-1/2 ${
                darkMode ? "bg-gray-600" : "bg-gray-400"
              }`}></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export const CoursebooksShimmer = () => {
  const { darkMode } = useContext(context);

  return (
    <div className="grid w-[calc(95vw-275px)] md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className={`p-4 w-full rounded-lg shadow-md h-full animate-pulse transition-all relative ${
            darkMode ? "bg-gray-700" : "bg-gray-200"
          }`}>
          {/* Bookmark placeholder */}
          <div
            className={`absolute top-2 right-2 w-6 h-6 rounded-full ${
              darkMode ? "bg-gray-600" : "bg-gray-300"
            }`}></div>
          {/* Title placeholder */}
          <div
            className={`h-6 rounded mb-4 w-3/4 ${
              darkMode ? "bg-gray-600" : "bg-gray-300"
            }`}></div>
          {/* Thumbnail placeholder */}
          <div
            className={`h-48 rounded mb-4 ${
              darkMode ? "bg-gray-600" : "bg-gray-300"
            }`}></div>
          {/* Text placeholders */}
          <div
            className={`h-4 rounded mb-2 w-1/2 ${
              darkMode ? "bg-gray-600" : "bg-gray-300"
            }`}></div>
          <div
            className={`h-4 rounded mb-2 w-2/3 ${
              darkMode ? "bg-gray-600" : "bg-gray-300"
            }`}></div>
          <div
            className={`h-4 rounded mb-4 w-1/3 ${
              darkMode ? "bg-gray-600" : "bg-gray-300"
            }`}></div>
          <div
            className={`h-4 rounded mb-2 ${
              darkMode ? "bg-gray-600" : "bg-gray-300"
            }`}></div>
          <div
            className={`h-4 rounded mb-2 w-5/6 ${
              darkMode ? "bg-gray-600" : "bg-gray-300"
            }`}></div>
          {/* Button placeholder */}
          <div
            className={`h-4 rounded w-1/4 ${
              darkMode ? "bg-blue-600" : "bg-blue-300"
            }`}></div>
        </div>
      ))}
    </div>
  );
};

export const NewsShimmer = () => {
  const { darkMode } = useContext(context);
  return (
    <div
      className={`flex-1 w-[calc(100vw-660px)] px-6 ${
        darkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"
      }`}>
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <>
            <hr
              key={index}
              className={`border-t border-solid ${
                darkMode ? "border-gray-700" : "border-gray-300"
              }`}
            />
            <div
              className={`p-4 rounded-lg cursor-pointer space-y-4 animate-pulse ${
                darkMode
                  ? "bg-slate-700 border-gray-700 hover:bg-gray-900"
                  : "bg-gray-200 border-gray-300 hover:bg-gray-300"
              }`}>
              <div className="flex items-center gap-3">
                <div
                  className={`h-7 w-7 rounded-full ${
                    darkMode ? "bg-gray-600" : "bg-gray-300"
                  }`}></div>
                <div
                  className={`h-6 w-3/4 ${
                    darkMode ? "bg-gray-600" : "bg-gray-300"
                  }`}></div>
              </div>
              <div
                className={`h-4 ${
                  darkMode ? "bg-gray-600" : "bg-gray-300"
                } w-5/6`}></div>

              <div className="relative w-full max-h-[450px] bg-gray-300 rounded-md overflow-hidden">
                {/* Blurred background */}
                <div
                  className={`absolute inset-0 w-full h-full bg-gray-400 ${
                    darkMode ? "bg-gray-600" : "bg-gray-200"
                  }`}></div>
                {/* Centered image placeholder */}
                <div
                  className={`absolute inset-0 w-full h-full object-contain ${
                    darkMode ? "bg-gray-600" : "bg-gray-300"
                  }`}></div>
              </div>
            </div>
          </>
        ))}
        {/* Loading text */}
        <p
          className={`text-center my-[10px] text-xl ${
            darkMode ? "text-gray-400" : "text-gray-600"
          }`}>
          Loading more news...
        </p>
      </div>
    </div>
  );
};
