import React, { useState } from "react";

// Component for displaying individual feature with voting and comments
const FeatureItem = ({ feature, onVote, onComment }) => {
  const [commentText, setCommentText] = useState("");

  const handleCommentSubmit = () => {
    if (commentText.trim()) {
      onComment(feature.id, commentText);
      setCommentText("");
    }
  };

  return (
    <div className="p-4 mb-4 border rounded-md shadow-sm bg-white">
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

// Main Component for Feature Wishlist Page
const FeatureWishlist = () => {
  const [features, setFeatures] = useState([]);
  const [newFeature, setNewFeature] = useState({ title: "", description: "" });

  const handleFeatureSubmit = () => {
    if (newFeature.title.trim()) {
      const newFeatureObj = {
        ...newFeature,
        id: Date.now(),
        votes: { up: 0, down: 0 },
        comments: [],
      };
      setFeatures([...features, newFeatureObj]);
      setNewFeature({ title: "", description: "" }); // Reset input fields
    }
  };

  const handleVote = (featureId, voteType) => {
    setFeatures((prevFeatures) =>
      prevFeatures.map((feature) =>
        feature.id === featureId
          ? {
              ...feature,
              votes: {
                ...feature.votes,
                [voteType]: feature.votes[voteType] + 1,
              },
            }
          : feature
      )
    );
  };

  const handleComment = (featureId, commentText) => {
    setFeatures((prevFeatures) =>
      prevFeatures.map((feature) =>
        feature.id === featureId
          ? { ...feature, comments: [...feature.comments, commentText] }
          : feature
      )
    );
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Feature Wishlist</h2>

      {/* New Feature Submission Form */}
      <div className="mb-6 bg-gray-100 p-4 rounded-md shadow-sm">
        <h3 className="text-xl font-semibold mb-2">Share Your Idea</h3>
        <input
          type="text"
          className="w-full p-2 mb-4 border border-gray-300 rounded-md"
          placeholder="Feature Title"
          value={newFeature.title}
          onChange={(e) =>
            setNewFeature({ ...newFeature, title: e.target.value })
          }
        />
        <textarea
          className="w-full p-2 mb-4 border border-gray-300 rounded-md"
          placeholder="Feature Description"
          value={newFeature.description}
          onChange={(e) =>
            setNewFeature({ ...newFeature, description: e.target.value })
          }
        />
        <button
          className="px-6 py-2 bg-blue-500 text-white rounded-md"
          onClick={handleFeatureSubmit}>
          Submit Feature
        </button>
      </div>

      {/* List of Features */}
      {features.length === 0 ? (
        <p>No features submitted yet. Be the first to share your idea!</p>
      ) : (
        features.map((feature) => (
          <FeatureItem
            key={feature.id}
            feature={feature}
            onVote={handleVote}
            onComment={handleComment}
          />
        ))
      )}
    </div>
  );
};

export default FeatureWishlist;
