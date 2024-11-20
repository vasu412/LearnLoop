import React, { useContext, useState } from "react";
import context from "../Context/context";
import WishlistPopup from "../Components/WishlistPopup";

// Main Component for Feature Wishlist Page
const FeatureWishlist = () => {
  const [features, setFeatures] = useState([]);
  const [newFeature, setNewFeature] = useState({ title: "", description: "" });
  const [showPopup, setShowPopup] = useState(false);
  const { darkMode } = useContext(context);
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
    <div
      className={`w-[calc(75vw-275px)] flex flex-col items-center p-6 border-0 border-solid border-r-2 ${
        darkMode ? "border-gray-700 bg-gray-900" : "border-gray-200 bg-gray-100"
      }`}>
      {/* User's Profile Image & Placeholder */}
      <div
        className={`w-full sm:w-[500px] h-fit px-10 py-5 rounded-sm ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
        style={{ width: "730px" }}>
        <div className="flex items-center ">
          {/* User Profile Image */}
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg" // Use a sample image or the user's image
            alt="User"
            className="w-12 h-12 mr-3 rounded-md object-cover"
          />
          {/* Placeholder to click */}
          <div
            onClick={() => setShowPopup(true)}
            className={`flex-1 cursor-pointer p-4 ${
              darkMode ? "text-white bg-gray-700" : "text-gray-600 bg-gray-100"
            } rounded-md border ${
              darkMode ? "border-gray-600" : "border-gray-300"
            }`}>
            <span>Share your Idea!</span>
          </div>
        </div>

        {/* Popup for Writing Post */}
        {showPopup && (
          <WishlistPopup setShowPopup={setShowPopup} darkMode={darkMode} />
        )}
      </div>
      <hr
        className={`border mt-4 w-full border-solid ${
          darkMode ? "border-gray-700" : "border-gray-200"
        }`}
      />
    </div>

    // {/* List of Features */}
    //   {features.length === 0 ? (
    //     <p>No features submitted yet. Be the first to share your idea!</p>
    //   ) : (
    //     features.map((feature) => (
    //       <FeatureItem
    //         key={feature.id}
    //         feature={feature}
    //         onVote={handleVote}
    //         onComment={handleComment}
    //       />
    //     ))
    //   )}
    // </div>
  );
};

export default FeatureWishlist;
