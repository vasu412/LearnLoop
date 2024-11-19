import React, { useState, useEffect, useCallback, useContext } from "react";
import { newsData } from "../Data/newsData";
import context from "../Context/context";

const NewsFeed = ({ filter }) => {
  const [news, setNews] = useState(newsData.items);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [debouncedFilter, setDebouncedFilter] = useState(filter);
  const { darkMode } = useContext(context);

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

    try {
      const response = await fetch(
        `https://www.googleapis.com/customsearch/v1?q=${searchTerm}&start=${
          page * 10
        }&cx=c43f333fd690e4471&key=AIzaSyDxqEnKnL2N3F1E_7cs6_UoaaHLhDkWlvw`
      );
      const data = await response.json();

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
    // fetchNews();
  }, [debouncedFilter, page]);

  const handleReaction = (postTitle) => {
    setLiked((prev) => {
      const newLiked = new Set(prev);
      if (newLiked.has(postTitle)) {
        newLiked.delete(postTitle);
      } else {
        newLiked.add(postTitle);
      }
      return newLiked;
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
      className={`flex-1 w-[calc(100vw-660px)] px-6 ${
        darkMode ? "bg-gray-800  text-white" : "bg-gray-100  text-gray-900"
      }`}>
      <div className="space-y-4">
        {news.map((item, index) => (
          <>
            <hr />
            <div
              key={index}
              className={`p-4 rounded-lg cursor-pointer space-y-4 ${
                darkMode
                  ? "hover:bg-gray-900 border-gray-700"
                  : "hover:bg-gray-200 border-gray-300"
              }`}>
              <div className="flex items-center gap-3">
                {item?.pagemap?.cse_thumbnail && (
                  <div
                    style={{
                      backgroundImage: `url(${item?.pagemap?.cse_thumbnail[0].src})`,
                    }}
                    className="h-7 w-7 bg-center bg-cover rounded-full"></div>
                )}
                <h2 className="text-xl font-bold">{item.title}</h2>
              </div>
              {item.snippet && <p>{item.snippet}</p>}

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
            </div>
          </>
        ))}
        {loading && (
          <p className="text-center my-[10px] text-xl">Loading more news...</p>
        )}
      </div>
    </div>
  );
};

export default NewsFeed;
