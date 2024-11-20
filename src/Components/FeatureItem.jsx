const FeatureItem = ({ feature, onVote, onComment }) => {
  const [commentText, setCommentText] = useState("");

  const handleCommentSubmit = () => {
    if (commentText.trim()) {
      onComment(feature.id, commentText);
      setCommentText("");
    }
  };

  return (
    <div className="p-4 mb-4  border rounded-md shadow-sm bg-white">
      <h4 className="text-lg font-bold">{feature.title}</h4>
      <p className="text-gray-600">{feature.description}</p>

      {/* Voting Section */}
      <div className="flex items-center space-x-4 mt-2">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
          onClick={() => onVote(feature.id, "up")}>
          Upvote {feature.votes.up}
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600"
          onClick={() => onVote(feature.id, "down")}>
          Downvote {feature.votes.down}
        </button>
      </div>

      {/* Comment Section */}
      <div className="mt-4">
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Add a comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <button
          className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md"
          onClick={handleCommentSubmit}>
          Comment
        </button>
      </div>

      {/* Display Comments */}
      <div className="mt-4">
        {feature.comments.map((comment, idx) => (
          <div key={idx} className="border-t pt-2 mt-2 text-gray-600">
            <p>{comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
