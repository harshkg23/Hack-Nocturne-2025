import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import * as Tooltip from "@radix-ui/react-tooltip";
import { TrendingUp } from "lucide-react";

const HotTopics = () => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const fetchHotTopics = async () => {
      try {
        const response = await fetch(
          "https://www.reddit.com/r/technology/hot.json?limit=10"
        );
        const data = await response.json();
        if (data.data && data.data.children) {
          setTopics(data.data.children.map((post) => post.data));
        }
      } catch (error) {
        console.error("Error fetching hot topics:", error);
      }
    };

    fetchHotTopics();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 text-white px-6 py-10">
      {/* Trending Icon and Text Together */}
      <h1 className="text-4xl font-extrabold text-center mb-10 tracking-tight flex justify-center items-center gap-3">
        <TrendingUp className="w-8 h-8 text-white" /> Hot Topics
      </h1>

      <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {topics.map((topic, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative bg-gray-800/50 p-8 rounded-2xl shadow-lg backdrop-blur-md border border-gray-700 
              hover:scale-105 hover:shadow-xl transition-transform duration-300 w-full flex flex-col justify-between"
          >
            <div className="flex-grow">
              {/* Tooltip for title */}
              <Tooltip.Provider>
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <h2 className="text-xl font-semibold line-clamp-2 cursor-pointer">
                      {topic.title}
                    </h2>
                  </Tooltip.Trigger>
                  <Tooltip.Portal>
                    <Tooltip.Content
                      className="bg-white text-black px-3 py-1 rounded-md shadow-md text-sm"
                      side="top"
                    >
                      {topic.title}
                      <Tooltip.Arrow className="fill-white" />
                    </Tooltip.Content>
                  </Tooltip.Portal>
                </Tooltip.Root>
              </Tooltip.Provider>

              {/* Description with space at bottom */}
              <p className="text-gray-300 mt-3 text-lg line-clamp-3 mb-12">
                {topic.selftext
                  ? topic.selftext.substring(0, 200) + "..."
                  : topic.url
                  ? "Click to read more"
                  : "No description available..."}
              </p>
            </div>

            {/* Read More Button - Now Positioned Properly */}
            <Link to={`/topics/${index}`} state={{ topic }}>
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

export default HotTopics;
