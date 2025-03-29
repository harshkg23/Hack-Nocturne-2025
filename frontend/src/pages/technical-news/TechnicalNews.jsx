import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const API_KEY = import.meta.env.VITE_NEWS_API_KEY; // Ensure this is set in your environment

const TechnicalNews = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          `https://newsapi.org/v2/top-headlines?category=technology&language=en&apiKey=${API_KEY}`
        );
        const data = await response.json();
        if (data.articles) {
          setNews(data.articles.slice(0, 10)); // Get only 10 articles
        }
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 text-white px-6 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 px-4">
        <h1 className="text-4xl font-extrabold tracking-tight">
          📰 Latest Tech News
        </h1>
      </div>

      {/* News Grid */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {news.map((article, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative bg-gray-800/50 p-8 rounded-2xl shadow-lg backdrop-blur-md border border-gray-700 
              hover:scale-105 hover:shadow-xl transition-transform duration-300 w-full flex flex-col justify-between"
          >
            {/* Article Image */}
            <img
              src={article.urlToImage || "https://via.placeholder.com/400"}
              alt={article.title}
              className="w-full h-48 object-cover rounded-xl"
            />

            {/* Article Content */}
            <div className="flex-grow mt-4">
              <h2 className="text-xl font-semibold line-clamp-2">
                {article.title}
              </h2>
              <p className="text-gray-300 mt-3 text-lg line-clamp-3 mb-12">
                {article.description || "No description available."}
              </p>
            </div>

            {/* Read More Button */}
            <Link to={`/news/${index}`} state={{ article }}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-4 bg-white text-black px-5 py-3 rounded-lg font-medium shadow-md 
                hover:bg-gray-200 transition-all duration-200 text-lg w-full text-center"
              >
                Read More →
              </motion.button>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TechnicalNews;
