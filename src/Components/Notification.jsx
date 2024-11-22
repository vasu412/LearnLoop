import React, { useEffect } from "react";

const Notification = ({ message, show, onClose, darkMode }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, 5000); // Auto-close after 5 seconds
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div
      className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 w-3/4 max-w-md p-4 rounded-lg shadow-lg transition-all duration-300 ${
        darkMode
          ? "bg-gray-800 text-gray-100 border border-gray-600"
          : "bg-gray-100 text-gray-800 border border-gray-300"
      }`}>
      <div className="flex justify-between items-center">
        <span className="text-sm">{message}</span>
        <button
          onClick={onClose}
          className={`ml-4 text-lg font-bold ${
            darkMode
              ? "text-gray-400 hover:text-gray-200"
              : "text-gray-600 hover:text-gray-800"
          }`}>
          &times;
        </button>
      </div>
    </div>
  );
};

export default Notification;
