import { useContext, useState } from "react";
import context from "../Context/context";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const Comment = ({ comment }) => {
  const { darkMode } = useContext(context);
  const [replyInput, setReplyInput] = useState(false);
  const [replies, setReplies] = useState([]);
  const [votes, setVotes] = useState(0);
  const [replyText, setReplyText] = useState("");

  const handleReply = () => {
    if (replyText.trim()) {
      const newReply = { text: replyText.trim(), replies: [] };
      setReplies([...replies, newReply]);
      setReplyText("");
      setReplyInput(false);
    }
  };

  return (
    <div className="relative pl-4">
      {/* Vertical Line for Nested Replies */}
      <div className="absolute left-2 top-0 h-full w-px bg-gray-300 dark:bg-gray-600"></div>

      {/* Comment Box */}
      <div
        className={`flex flex-col gap-2 p-4 rounded-md ${
          darkMode ? "bg-gray-800 text-gray-200" : "bg-gray-100 text-gray-800"
        }`}>
        <div className="flex items-start">
          {/* Avatar */}
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="User"
            className="w-8 h-8 rounded-full object-cover mr-3"
          />

          {/* Content */}
          <div className="flex flex-col">
            {/* Username */}
            <p className="text-sm font-semibold">User123</p>
            {/* Comment Text */}
            <p className="text-md">{comment.text}</p>
          </div>
        </div>

        {/* Actions (Vote + Reply) */}
        <div className="flex items-center gap-4 text-sm mt-2">
          <div className="flex items-center gap-2 text-gray-400">
            <button
              onClick={() => votes >= 0 && setVotes(votes + 1)}
              className="hover:text-green-400">
              <FaArrowUp />
            </button>
            <span>{votes}</span>
            <button
              onClick={() => votes > 0 && setVotes(votes - 1)}
              className="hover:text-red-400">
              <FaArrowDown />
            </button>
          </div>
          <button
            onClick={() => setReplyInput(!replyInput)}
            className="text-blue-500 hover:underline">
            Reply
          </button>
        </div>

        {/* Reply Input */}
        {replyInput && (
          <div className="flex items-center mt-2">
            <input
              type="text"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Write a reply..."
              className="flex-grow p-2 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            />
            <button
              onClick={handleReply}
              className="ml-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
              Add
            </button>
          </div>
        )}
      </div>

      {/* Nested Replies */}
      <div className="pl-6 mt-2 space-y-2">
        {replies.map((reply, index) => (
          <Comment key={index} comment={reply} />
        ))}
      </div>
    </div>
  );
};

export default Comment;
