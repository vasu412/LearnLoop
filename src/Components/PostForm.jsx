import React, { useState } from "react";

const PostForm = () => {
  const [postContent, setPostContent] = useState("");
  const [files, setFiles] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [mediaPreview, setMediaPreview] = useState(null);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);

    // For image/video preview (only for supported file types)
    const file = selectedFiles[0];
    if (
      file &&
      (file.type.startsWith("image/") || file.type.startsWith("video/"))
    ) {
      const reader = new FileReader();
      reader.onload = (e) => setMediaPreview(e.target.result);
      reader.readAsDataURL(file);
    } else {
      setMediaPreview(null); // Reset preview if the file is not image/video
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (postContent.trim() || files.length) {
      console.log("New Post Content:", postContent);
      console.log("Files:", files); // Send to backend later
      setPostContent(""); // Clear input
      setFiles([]); // Clear files
      setMediaPreview(null); // Clear media preview
      setShowPopup(false); // Close the popup after post
    }
  };

  return (
    <div className=" w-[calc(75vw-275px)] p-6 bg-gray-100">
      {/* User's Profile Image & Placeholder */}
      <div className="w-full sm:w-[500px] p-4 border rounded-lg">
        <div className="flex items-center">
          {/* User Profile Image */}
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg" // Use a sample image or the user's image
            alt="User"
            className="w-12 h-12 mr-3 rounded-full object-cover"
          />
          {/* Placeholder to click */}
          <div
            onClick={() => setShowPopup(true)}
            className="flex-1 cursor-pointer p-4 text-gray-600 bg-white rounded-md border border-gray-300">
            <span>What’s on your mind?</span>
          </div>
        </div>

        {/* Popup for Writing Post */}
        {showPopup && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white w-[90%] sm:w-[600px] p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-4">Create a Post</h3>
              <form onSubmit={handleSubmit}>
                <textarea
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  placeholder="Write something..."
                  className="w-full p-4 border border-gray-300 rounded-md mb-4 resize-none"
                  rows="4"
                />

                {/* Media Attachments */}
                <div className="flex items-center space-x-4 mb-4">
                  <label className="cursor-pointer">
                    <span className="text-blue-500">Add Photos/Videos</span>
                    <input
                      type="file"
                      accept="image/*,video/*,application/pdf"
                      multiple
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>

                  {/* Media Preview */}
                  {mediaPreview && (
                    <div className="w-20 h-20 overflow-hidden rounded-md">
                      {mediaPreview.startsWith("data:image") ? (
                        <img
                          src={mediaPreview}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : mediaPreview.startsWith("data:video") ? (
                        <video
                          controls
                          className="w-full h-full object-cover"
                          src={mediaPreview}></video>
                      ) : (
                        <span className="text-sm text-gray-600">
                          Preview not available for this file type.
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 w-full">
                  Post
                </button>
              </form>

              <button
                onClick={() => setShowPopup(false)}
                className="mt-4 text-gray-500 hover:text-gray-700 w-full text-center">
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostForm;
