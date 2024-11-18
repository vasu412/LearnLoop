import React, { useState, useEffect, useCallback } from "react";
import { FaThumbsUp, FaCommentDots, FaRegHeart } from "react-icons/fa";

const NewsFeed = ({ darkMode, filter }) => {
  const [news, setNews] = useState([]);
  const [liked, setLiked] = useState(new Set());
  const [comments, setComments] = useState({});
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [debouncedFilter, setDebouncedFilter] = useState(filter);

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

    const search =
      debouncedFilter === "" ? "education+learning" : debouncedFilter;
    setLoading(true);

    try {
      const response = await fetch(
        `https://www.googleapis.com/customsearch/v1?q=${search}&start=${
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
    //fetchNews();
  }, [debouncedFilter, page, fetchNews]);

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
      className={`flex-1 p-8 ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}>
      <div className="space-y-6">
        {news.map((item, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg shadow-md space-y-4 ${
              darkMode
                ? "bg-gray-800 border-gray-700"
                : "bg-gray-100 border-gray-300"
            }`}>
            <h2 className="text-xl font-bold">{item.title}</h2>
            {(item?.pagemap?.cse_image || item?.pagemap?.cse_thumbnail) && (
              <div className="relative w-full h-[450px] bg-gray-300 rounded-md overflow-hidden">
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

            <p>{item.snippet || "No content available for this article."}</p>

            {/* Reactions */}
            <div className="flex space-x-4">
              <button
                onClick={() => handleReaction(item.title)}
                className={`flex items-center space-x-2 ${
                  liked.has(item.title) ? "text-blue-400" : "text-gray-400"
                }`}>
                <FaThumbsUp />
                <span>{liked.has(item.title) ? "Liked" : "Like"}</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-400">
                <FaRegHeart />
                <span>Follow</span>
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
