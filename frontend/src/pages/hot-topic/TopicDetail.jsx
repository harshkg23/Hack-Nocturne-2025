import React from "react";
import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";

const TopicDetail = () => {
  const location = useLocation();
  const topic = location.state?.topic;

  if (!topic) {
    return (
      <div className="text-white text-center mt-10 text-xl">
        Topic not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 text-white flex items-center justify-center px-6 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl bg-gray-800/50 p-8 rounded-2xl shadow-lg backdrop-blur-md border border-gray-700 text-center"
      >
        {/* Title */}
        <h1 className="text-3xl font-bold">{topic.title}</h1>
        <p className="text-gray-400 mt-2 text-lg">
          🔥 Hot Topic from r/technology
        </p>

        {/* Description */}
        <p className="text-gray-300 mt-4 text-lg">
          {topic.selftext || "No additional description available."}
        </p>

        {/* Read Full Discussion Button */}
        <a
          href={`https://www.reddit.com${topic.permalink}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-6 bg-white text-black px-6 py-3 rounded-lg font-medium shadow-md 
            hover:bg-gray-200 transition-all duration-200 text-lg w-full"
          >
            Read Full Discussion →
          </motion.button>
        </a>

        {/* Back Button */}
        <Link to="/hot-topics">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-4 bg-gray-700 text-white px-6 py-3 rounded-lg font-medium shadow-md 
            hover:bg-gray-600 transition-all duration-200 text-lg w-full"
          >
            ← Back to Hot Topics
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
};

export default TopicDetail;
