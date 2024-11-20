import { useContext, useState } from "react";
import context from "../Context/context";

const Comment = ({ comment }) => {
  const [replyInput, setReplyInput] = useState("");
  const [replies, setReplies] = useState([]);

  const handleReply = () => {
    if (replyInput.trim()) {
      const newReply = { text: replyInput.trim(), replies: [] };
      setReplies([...replies, newReply]);
      setReplyInput("");
    }
  };

  return (
    <div className="ml-4 mt-4">
      <div
        className={`p-4 rounded-md ${
          useContext(context).darkMode
            ? "bg-gray-700 text-gray-200"
            : "bg-gray-100 text-gray-800"
        }`}>
        <p>{comment.text}</p>
        <div className="mt-2 flex">
          <input
            type="text"
            value={replyInput}
            onChange={(e) => setReplyInput(e.target.value)}
            placeholder="Reply..."
            className="w-full p-2 rounded-md  bg-gray-300 text-gray-800 "
          />
          <button
            onClick={handleReply}
            className="ml-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
            Reply
          </button>
        </div>
      </div>
      <div className="mt-4 space-y-4">
        {replies.map((reply, index) => (
          <Comment key={index} comment={reply} />
        ))}
      </div>
    </div>
  );
};

export default Comment;
