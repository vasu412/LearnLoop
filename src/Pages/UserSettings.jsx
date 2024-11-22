import React, { useState } from "react";
import { FaUser, FaBell, FaShieldAlt, FaMoon, FaSun } from "react-icons/fa";
// import { useTheme } from "./ThemeContext";

// Avatar data (replace with your actual image paths)
const avatars = [
  "/avatars/avatar1.png",
  "/avatars/avatar2.png",
  "/avatars/avatar3.png",
  "/avatars/avatar4.png",
  "/avatars/avatar5.png",
  "/avatars/avatar6.png",
  "/avatars/avatar7.png",
  "/avatars/avatar8.png",
  "/avatars/avatar9.png",
  "/avatars/avatar10.png",
  "/avatars/avatar11.png",
];

const UserSettings = () => {
  const { theme, toggleTheme } = { theme: "", toggleTheme: "" };
  const [selectedAvatar, setSelectedAvatar] = useState(avatars[0]);
  const [notifications, setNotifications] = useState(true);
  const [privacy, setPrivacy] = useState("Public");
  const [avatarModalOpen, setAvatarModalOpen] = useState(false);

  // Handlers
  const handleAvatarChange = (avatar) => {
    setSelectedAvatar(avatar);
    setAvatarModalOpen(false); // Close modal after selection
  };

  const toggleNotifications = () => setNotifications(!notifications);
  const handlePrivacyChange = (e) => setPrivacy(e.target.value);

  return (
    <div className="w-[calc(100vw-275px)] p-6 rounded-xl shadow-lg space-y-6">
      <h2 className="text-3xl font-semibold">User Settings</h2>

      {/* Profile Customization */}
      <div>
        <h3 className="text-2xl font-medium mb-3 flex items-center">
          <FaUser className="mr-2" /> Profile Customization
        </h3>
        <div className="flex items-center space-x-4 mb-4">
          <img
            src={selectedAvatar}
            alt="Avatar"
            className="w-20 h-20 rounded-full border-4 cursor-pointer hover:border-blue-500 transition-all"
            onClick={() => setAvatarModalOpen(true)} // Open modal to select avatar
          />
          <button
            onClick={() => setAvatarModalOpen(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-400">
            Change Avatar
          </button>
        </div>
      </div>

      {/* Notification Preferences */}
      <div>
        <h3 className="text-2xl font-medium mb-3 flex items-center">
          <FaBell className="mr-2" /> Notification Preferences
        </h3>
        <div className="flex items-center space-x-4">
          <input
            type="checkbox"
            checked={notifications}
            onChange={toggleNotifications}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span className="text-lg">Receive Notifications</span>
        </div>
      </div>

      {/* Privacy Settings */}
      <div>
        <h3 className="text-2xl font-medium mb-3 flex items-center">
          <FaShieldAlt className="mr-2" /> Privacy Settings
        </h3>
        <div className="flex items-center space-x-4">
          <label htmlFor="privacy" className="text-lg">
            Profile Privacy:
          </label>
          <select
            id="privacy"
            value={privacy}
            onChange={handlePrivacyChange}
            className="p-2 bg-gray-200 border border-gray-400 rounded-md">
            <option value="Public">Public</option>
            <option value="Private">Private</option>
            <option value="FriendsOnly">Friends Only</option>
          </select>
        </div>
      </div>

      {/* Theme Settings */}
      <div>
        <h3 className="text-2xl font-medium mb-3 flex items-center">
          {theme === "dark" ? (
            <FaSun className="mr-2" />
          ) : (
            <FaMoon className="mr-2" />
          )}{" "}
          Theme Settings
        </h3>
        <div className="flex space-x-6">
          <button
            onClick={toggleTheme}
            className={`py-2 px-4 rounded-md ${
              theme === "light" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}>
            Light Mode
          </button>
          <button
            onClick={toggleTheme}
            className={`py-2 px-4 rounded-md ${
              theme === "dark" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}>
            Dark Mode
          </button>
        </div>
      </div>

      {/* Avatar Selection Modal */}
      {avatarModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-600 bg-opacity-50">
          <div className="bg-white rounded-lg p-6 space-y-4 w-3/4 max-w-lg">
            <h3 className="text-2xl font-medium text-center">
              Select Your Avatar
            </h3>
            <div className="grid grid-cols-5 gap-4">
              {avatars.map((avatar, index) => (
                <img
                  key={index}
                  src={avatar}
                  alt={`Avatar ${index + 1}`}
                  className="w-16 h-16 rounded-full border-2 cursor-pointer hover:border-blue-600"
                  onClick={() => handleAvatarChange(avatar)}
                />
              ))}
            </div>
            <button
              onClick={() => setAvatarModalOpen(false)}
              className="mt-4 w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-400">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserSettings;
