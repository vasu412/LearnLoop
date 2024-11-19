import React, { useState, useEffect, useCallback } from "react";
import { FaThumbsUp, FaCommentDots, FaRegHeart } from "react-icons/fa";

const NewsFeed = ({ darkMode, filter }) => {
  const [news, setNews] = useState([]);
  const [liked, setLiked] = useState(new Set());
  const [comments, setComments] = useState({});
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [debouncedFilter, setDebouncedFilter] = useState(filter);

  const data = [
    {
      id: "1",
      title: "Important Update: Office Timing Changes",
      content:
        "Starting next Monday, the office hours will be adjusted to 9 AM - 5 PM to better accommodate work-life balance. Please ensure you update your schedules accordingly.",
      date: "2024-11-18",
      author: "Admin",
      tags: ["Update", "Office"],
      image: "https://via.placeholder.com/600x300?text=Office+Timing+Update",
    },
    {
      id: "2",
      title: "Upcoming Event: Annual Hackathon 2024",
      content:
        "Get ready for our Annual Hackathon! It will be held on December 5-6, 2024, in the main auditorium. Teams of up to 5 members can participate. Sign up by November 30.",
      date: "2024-11-15",
      author: "Event Team",
      tags: ["Event", "Hackathon"],
      image: "https://via.placeholder.com/600x300?text=Annual+Hackathon+2024",
    },
    {
      id: "3",
      title: "New Policy: Remote Work Guidelines",
      content:
        "Starting December 1, a new remote work policy will be in effect. Employees can work remotely for up to 3 days a week. Please refer to the policy document shared via email.",
      date: "2024-11-12",
      author: "HR Department",
      tags: ["Policy", "Remote Work"],
      image: "https://via.placeholder.com/600x300?text=Remote+Work+Policy",
    },
    {
      id: "4",
      title: "Holiday Announcement: Thanksgiving Break",
      content:
        "The office will remain closed on November 23-24 for Thanksgiving. Wishing everyone a happy holiday with their loved ones.",
      date: "2024-11-10",
      author: "Admin",
      tags: ["Holiday", "Thanksgiving"],
      image: "https://via.placeholder.com/600x300?text=Thanksgiving+Holiday",
    },
    {
      id: "5",
      title: "Maintenance Notification: Server Downtime",
      content:
        "Our servers will undergo scheduled maintenance on November 20 from 12 AM to 4 AM. Expect downtime during this period. We apologize for the inconvenience.",
      date: "2024-11-08",
      author: "IT Support",
      tags: ["Maintenance", "Downtime"],
      image: "https://via.placeholder.com/600x300?text=Server+Maintenance",
    },
  ];

  // Debounce the filter input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedFilter(filter);
    }, 300); // Adjust the debounce delay as needed

    return () => clearTimeout(handler);
  }, [filter]);

  // Fetch news with updated logic
  const fetchNews = useCallback(async () => {
    if (loading) return; // Prevent multiple API calls simultaneously

    const searchTerm = debouncedFilter === "" ? "education" : debouncedFilter;
    setLoading(true);

    // const API_KEY = "dMMPdnrfF2ocPGWodxBLZTk2EgGAESz15asLSetAJIov3znz";
    try {
      const response = await fetch(
        `https://www.googleapis.com/customsearch/v1?q=${searchTerm}&start=${
          page * 10
        }&cx=c43f333fd690e4471&key=AIzaSyDxqEnKnL2N3F1E_7cs6_UoaaHLhDkWlvw`
      );
      const data = await response.json();
      console.log(data);

      if (data.items) {
        const newArticles =
          page === 1
            ? data.items // Replace articles on the first page (for filter change)
            : data.items.filter(
                (item) =>
                  !news.some((newsItem) => newsItem.title === item.title)
              ); // Prevent duplicates for pagination
        setNews((prev) =>
          page === 1 ? newArticles : [...prev, ...newArticles]
        );
      }
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  }, [debouncedFilter, page, news, loading]);

  // Trigger fetch on filter or page change
  useEffect(() => {
    setNews(data);
    // fetchNews();
  }, [debouncedFilter, page]);

  const handleReaction = (title) => {
    setLiked((prev) => {
      const newLiked = new Set(prev);
      newLiked.has(title) ? newLiked.delete(title) : newLiked.add(title);
      return newLiked;
    });
  };

  const handleCommentSubmit = (title, comment) => {
    setComments((prev) => {
      const newComments = { ...prev };
      if (!newComments[title]) newComments[title] = [];
      newComments[title].push({ text: comment, replies: [] });
      return newComments;
    });
  };

  const handleReplySubmit = (title, parentIndex, reply) => {
    setComments((prev) => {
      const newComments = { ...prev };
      newComments[title][parentIndex].replies.push(reply);
      return newComments;
    });
  };

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 100
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`flex-1 w-[calc(100vw-660px)] p-8 ${
        darkMode ? "bg-gray-800  text-white" : "bg-gray-100  text-gray-900"
      }`}>
      <div className="space-y-6">
        {news.map((item, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg cursor-pointer space-y-4 ${
              darkMode
                ? "hover:bg-gray-900 border-gray-700"
                : "hover:bg-gray-200 border-gray-300"
            }`}>
            <h2 className="text-xl font-bold">{item.title}</h2>
            {(item?.pagemap?.cse_image || item?.pagemap?.cse_thumbnail) && (
              <div className="relative w-full max-h-[450px] bg-gray-300 rounded-md overflow-hidden">
                {/* Blurred background */}
                <img
                  src={
                    item.pagemap.cse_image[0].src ||
                    item?.pagemap?.cse_thumbnail[0].src
                  }
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover blur-md"
                  aria-hidden="true"
                />

                {/* Centered image */}
                <img
                  src={item.pagemap.cse_image[0].src}
                  alt="News Thumbnail"
                  className="relative mx-auto h-full object-contain z-10"
                />
              </div>
            )}

            {item.snippet && <p>{item.snippet}</p>}

            {/* Reactions */}
            <div className="flex space-x-4">
              <button
                onClick={() => handleReaction(item.title)}
                className={`flex items-center space-x-2 ${
                  liked.has(item.title) ? "text-blue-400" : "text-gray-400"
                }`}>
                <FaRegHeart />
                <span>{liked.has(item.title) ? "Liked" : "Like"}</span>
              </button>
            </div>

            {/* Comments Section */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <FaCommentDots />
                <input
                  type="text"
                  placeholder="Add a comment..."
                  className={`w-full p-2 rounded-md ${
                    darkMode
                      ? "bg-gray-700 text-white"
                      : "bg-gray-200 text-gray-900"
                  }`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && e.target.value) {
                      handleCommentSubmit(item.title, e.target.value);
                      e.target.value = ""; // Clear input after submit
                    }
                  }}
                />
              </div>

              {/* Nested Comments */}
              {comments[item.title] &&
                comments[item.title].map((comment, idx) => (
                  <div
                    key={idx}
                    className={`ml-4 border-l-2 pl-4 ${
                      darkMode
                        ? "border-gray-700 text-gray-400"
                        : "border-gray-300 text-gray-700"
                    }`}>
                    <p className="text-sm">{comment.text}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <input
                        type="text"
                        placeholder="Reply..."
                        className={`w-full p-2 rounded-md ${
                          darkMode
                            ? "bg-gray-700 text-white"
                            : "bg-gray-200 text-gray-900"
                        }`}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && e.target.value) {
                            handleReplySubmit(item.title, idx, e.target.value);
                            e.target.value = ""; // Clear input after submit
                          }
                        }}
                      />
                    </div>
                    {comment.replies.map((reply, replyIdx) => (
                      <div
                        key={replyIdx}
                        className={`ml-4 border-l-2 pl-4 ${
                          darkMode
                            ? "border-gray-700 text-gray-400"
                            : "border-gray-300 text-gray-700"
                        }`}>
                        <p className="text-sm">{reply}</p>
                      </div>
                    ))}
                  </div>
                ))}
            </div>
          </div>
        ))}
        {loading && (
          <p className="text-center my-[10px] text-xl">Loading more news...</p>
        )}
      </div>
    </div>
  );
};

export default NewsFeed;
