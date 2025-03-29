import React from "react";
import { useLocation, Link } from "react-router-dom";

const NewsDetail = () => {
  const location = useLocation();
  const article = location.state?.article;

  if (!article) {
    return (
      <div className="text-white text-center mt-10 text-2xl">
        📰 News article not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 text-white p-8 flex items-center justify-center">
      <div className="max-w-3xl bg-gray-800/50 p-8 rounded-2xl shadow-lg backdrop-blur-md border border-gray-700">
        {/* Article Image */}
        <img
          src={article.urlToImage || "https://via.placeholder.com/800"}
          alt={article.title}
          className="w-full h-64 object-cover rounded-lg shadow-md"
        />

        {/* Article Content */}
        <h1 className="text-3xl font-bold mt-6">{article.title}</h1>
        <p className="text-gray-400 mt-2">
          🖊️ By {article.author || "Unknown Author"}
        </p>

        <p className="text-gray-300 mt-4 leading-relaxed">
          {article.content
            ? article.content.replace(/\[\+\d+\schars\]/, "")
            : "Full content not available."}
        </p>

        {/* Read Full Article Link */}
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-4 text-blue-400 hover:underline font-medium"
        >
          🔗 Read Full Article
        </a>

        {/* Back to News Button */}
        <Link to="/news">
          <button
            className="mt-6 w-full bg-white text-black px-5 py-3 rounded-lg font-medium shadow-md 
            hover:bg-gray-200 transition-all duration-200 text-lg"
          >
            ← Back to News
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NewsDetail;
