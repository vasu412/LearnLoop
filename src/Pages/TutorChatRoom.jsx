import React, { useContext, useState } from "react";
import context from "../Context/context";

const TutorChatRoom = () => {
  const { darkMode } = useContext(context);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      setMessages([
        ...messages,
        { id: Date.now(), text: messageInput, sender: "You" },
      ]);
      setMessageInput("");
    }
  };

  return (
    <div
      className={`h-[90.6vh] w-[calc(100vw-275px)] flex ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"
      }`}>
      {/* Sidebar */}
      <div
        className={`w-1/4 p-4 ${
          darkMode ? "bg-gray-800 text-gray-200" : "bg-gray-200 text-gray-800"
        }`}>
        <h2 className="text-lg font-semibold mb-4">Active Users</h2>
        <ul className="space-y-2">
          {["Tutor", "Student1", "Student2"].map((user, index) => (
            <li
              key={index}
              className={`p-2 rounded-md ${
                darkMode ? "hover:bg-gray-700" : "hover:bg-gray-300"
              }`}>
              {user}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div
          className={`p-4 border-b ${
            darkMode
              ? "border-gray-700 bg-gray-800"
              : "border-gray-300 bg-gray-200"
          }`}>
          <h1 className="text-xl font-bold">Tutor Chat Room</h1>
          <p className="text-sm">Discuss topics with your tutor and peers.</p>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto">
          {messages.length > 0 ? (
            messages.map((message) => (
              <div
                key={message.id}
                className={`mb-4 flex ${
                  message.sender === "You" ? "justify-end" : "justify-start"
                }`}>
                <div
                  className={`p-3 rounded-md max-w-xs ${
                    message.sender === "You"
                      ? darkMode
                        ? "bg-blue-700 text-gray-100"
                        : "bg-blue-500 text-white"
                      : darkMode
                      ? "bg-gray-700 text-gray-100"
                      : "bg-gray-200 text-gray-800"
                  }`}>
                  <p className="text-sm font-semibold">{message.sender}</p>
                  <p>{message.text}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-sm mt-8">
              No messages yet. Start the conversation!
            </p>
          )}
        </div>

        {/* Input */}
        <div
          className={`p-4 border-t ${
            darkMode
              ? "border-gray-700 bg-gray-800"
              : "border-gray-300 bg-gray-200"
          }`}>
          <div className="flex">
            <input
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder="Type your message..."
              className={`flex-1 p-3 rounded-l-md ${
                darkMode
                  ? "bg-gray-700 text-gray-100 placeholder-gray-400"
                  : "bg-gray-100 text-gray-900 placeholder-gray-500"
              }`}
            />
            <button
              onClick={handleSendMessage}
              className={`px-4 py-3 rounded-r-md ${
                darkMode
                  ? "bg-blue-700 hover:bg-blue-600 text-gray-100"
                  : "bg-blue-500 hover:bg-blue-400 text-white"
              }`}>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorChatRoom;
