import React, { useState } from "react";
import { FaThumbsUp, FaRegThumbsUp } from "react-icons/fa";
import { BiUpvote, BiDownvote, BiCommentDetail } from "react-icons/bi";

const announcementsData = [
  {
    id: 1,
    title: "Welcome to LearnLoop!",
    content:
      "We're excited to announce the launch of LearnLoop, your community platform for learning and teaching. Join the community to start learning and sharing knowledge.",
    author: "Admin",
    likes: 5,
    upvotes: 25,
    downvotes: 3,
    userFollowing: false,
    tags: ["General"],
    comments: [
      {
        id: 1,
        user: "Jane",
        text: "This is awesome!",
        replies: [{ id: 1, user: "Admin", text: "Thank you, Jane!" }],
      },
    ],
  },
  {
    id: 2,
    title: "Platform Updates",
    content:
      "We’ve added new features to enhance your learning experience. Check them out today.",
    author: "Admin",
    likes: 8,
    upvotes: 18,
    downvotes: 2,
    userFollowing: true,
    tags: ["Updates"],
    comments: [],
  },
];

const Home = () => {
  const [announcements, setAnnouncements] = useState(announcementsData);
  const [filter, setFilter] = useState("All");

  const toggleLike = (id) => {
    setAnnouncements((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              likes: item.likes + (item.liked ? -1 : 1),
              liked: !item.liked,
            }
          : item
      )
    );
  };

  const toggleFollow = (id) => {
    setAnnouncements((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, userFollowing: !item.userFollowing } : item
      )
    );
  };

  const addComment = (id, text) => {
    if (!text.trim()) return;
    setAnnouncements((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              comments: [
                ...item.comments,
                { id: Date.now(), user: "You", text, replies: [] },
              ],
            }
          : item
      )
    );
  };

  const filteredAnnouncements =
    filter === "All"
      ? announcements
      : announcements.filter((item) => item.tags.includes(filter));

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen flex flex-col">
      {/* Header Section */}
      <header className="bg-gray-800 py-3 px-6 flex items-center justify-between shadow-md">
        <h1 className="text-3xl font-semibold text-white tracking-wide">
          Learn<span className="text-blue-400">Loop</span>
        </h1>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            className="px-4 py-2 rounded-md bg-gray-700 text-gray-300"
            placeholder="Search..."
          />
          <button className="text-gray-300 hover:text-blue-400 px-4 py-2 rounded-md">
            Login
          </button>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Left Sidebar */}
        <aside className="bg-gray-800 w-1/5 p-4">
          <div className="text-xl font-semibold text-gray-400">
            Trending Subreddits
          </div>
          <ul className="space-y-2 text-gray-500 mt-4">
            <li>General</li>
            <li>Updates</li>
            <li>News</li>
            <li>Learning</li>
            <li>Tech</li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4">
          {filteredAnnouncements.map((announcement) => (
            <div
              key={announcement.id}
              className="bg-gray-800 p-6 mb-6 rounded-lg shadow-md border border-gray-700">
              <div className="flex justify-between items-start">
                <div className="flex flex-col">
                  <h2 className="text-xl font-semibold">
                    {announcement.title}
                  </h2>
                  <p className="text-sm text-gray-400 mt-2">
                    Posted by {announcement.author}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => toggleFollow(announcement.id)}
                    className={`px-4 py-2 rounded-lg ${
                      announcement.userFollowing ? "bg-blue-500" : "bg-gray-700"
                    }`}>
                    {announcement.userFollowing ? "Following" : "Follow"}
                  </button>
                </div>
              </div>

              <p className="mt-4 text-gray-300">{announcement.content}</p>

              <div className="mt-4 flex items-center space-x-4">
                <button
                  onClick={() => toggleLike(announcement.id)}
                  className="flex items-center space-x-2 text-gray-400 hover:text-blue-400">
                  {announcement.liked ? <FaThumbsUp /> : <FaRegThumbsUp />}
                  <span>{announcement.likes}</span>
                </button>

                <button className="flex items-center space-x-2 text-gray-400 hover:text-blue-400">
                  <BiUpvote />
                  <span>{announcement.upvotes}</span>
                </button>

                <button className="flex items-center space-x-2 text-gray-400 hover:text-red-400">
                  <BiDownvote />
                  <span>{announcement.downvotes}</span>
                </button>

                <button className="flex items-center space-x-2 text-gray-400 hover:text-blue-400">
                  <BiCommentDetail />
                  <span>{announcement.comments.length}</span>
                </button>
              </div>

              <div className="mt-4">
                <h3 className="font-medium text-gray-400 flex items-center">
                  <BiCommentDetail className="mr-2" /> Comments
                </h3>

                {announcement.comments.map((comment) => (
                  <div key={comment.id} className="pl-4 mt-2">
                    <p>
                      <span className="font-semibold text-blue-400">
                        {comment.user}:
                      </span>{" "}
                      {comment.text}
                    </p>

                    {comment.replies?.map((reply) => (
                      <div key={reply.id} className="pl-4 text-gray-300">
                        <p>
                          <span className="font-semibold text-green-400">
                            {reply.user}:
                          </span>{" "}
                          {reply.text}
                        </p>
                      </div>
                    ))}
                  </div>
                ))}

                <div className="mt-2">
                  <textarea
                    rows="2"
                    placeholder="Write a comment..."
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-blue-400 focus:border-blue-400 text-gray-100"
                    onKeyDown={(e) =>
                      e.key === "Enter" &&
                      !e.shiftKey &&
                      addComment(announcement.id, e.target.value)
                    }
                  />
                </div>
              </div>
            </div>
          ))}
        </main>

        {/* Right Sidebar */}
        <aside className="bg-gray-800 w-1/5 p-4">
          <div className="text-xl font-semibold text-gray-400 mb-4">
            Popular Posts
          </div>
          <ul className="space-y-2 text-gray-500">
            <li>How to Get Started with LearnLoop</li>
            <li>5 Tips for Effective Learning</li>
            <li>New Features in LearnLoop</li>
            <li>Community Guidelines</li>
            <li>Top Tutors of the Month</li>
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default Home;
