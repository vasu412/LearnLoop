import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "../index.css";

const NewsCarousel = ({ apiKey, darkMode }) => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          `https://newsapi.org/v2/top-headlines?category=science&apiKey=${apiKey}`
        );
        const data = await response.json();
        // Filter articles with images
        const articlesWithImages = data.articles.filter(
          (article) => article.urlToImage
        );
        setArticles(articlesWithImages);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, [apiKey]);

  return (
    <div className={`w-full p-8 ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation={true}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000, // 3-second interval for auto-scroll
          disableOnInteraction: false,
        }}
        preventClicks={false} // Allow clicks
        preventClicksPropagation={false} // Allow click propagation
        spaceBetween={20}
        slidesPerView={3.4}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="news-carousel">
        {articles.map((article, index) => (
          <SwiperSlide key={index}>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              <div
                className="h-56 bg-cover bg-center rounded-lg flex flex-col justify-end p-4 text-white relative"
                style={{
                  backgroundImage: `url(${article.urlToImage})`,
                }}>
                <div className="bg-gradient-to-t from-black via-transparent to-transparent h-full w-full absolute inset-0 rounded-lg"></div>
                <div className="relative z-10">
                  <h3 className="font-bold text-lg truncate">
                    {article.title || "Untitled"}
                  </h3>
                  <p className="text-sm truncate">
                    {article.description || "No description available"}...
                  </p>
                  <div className="text-xs mt-2">
                    <span>
                      {article.author
                        ? `By ${article.author}`
                        : "Unknown Author"}
                    </span>{" "}
                    |{" "}
                    <span>{new Date(article.publishedAt).toDateString()}</span>
                  </div>
                </div>
              </div>
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default NewsCarousel;