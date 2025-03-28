import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Flame, Newspaper, Code } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [techNews, setTechNews] = useState([
    "🚀 AI revolutionizing software development",
    "📢 Next.js 14 released with better performance",
    "🛠️ TypeScript adoption surges in 2025",
  ]);
  const [hotTopics, setHotTopics] = useState([
    "🔥 OpenAI's latest GPT model",
    "🌐 Web3 and decentralized internet",
    "🛡️ Cybersecurity in AI-powered apps",
  ]);
  const [softwareTopics, setSoftwareTopics] = useState([
    "🔧 Best practices in microservices",
    "⚛️ React Server vs Client Components",
    "💾 Scaling databases for high traffic",
  ]);

  const [currentTechNews, setCurrentTechNews] = useState(0);
  const [currentHotTopics, setCurrentHotTopics] = useState(0);
  const [currentSoftwareTopics, setCurrentSoftwareTopics] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTechNews((prev) => (prev + 1) % techNews.length);
      setCurrentHotTopics((prev) => (prev + 1) % hotTopics.length);
      setCurrentSoftwareTopics((prev) => (prev + 1) % softwareTopics.length);
    }, 3000); // Change text every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const handleCardClick = (route) => {
    navigate(route);
  };

  return (
    <div className="h-screen flex flex-col items-center bg-gradient-to-b from-black to-gray-900 text-white px-6 py-6">
      <motion.h1
        className="text-5xl font-bold bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Dashboard
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-7xl h-full">
        {/* Technical News Card */}
        <motion.div
          className="p-8 rounded-2xl bg-white/10 border border-gray-500 shadow-xl backdrop-blur-lg transition-transform duration-300 hover:scale-105 flex flex-col items-center justify-center text-center h-96 cursor-pointer"
          whileHover={{ scale: 1.05 }}
          onClick={() => handleCardClick("/news")}
        >
          <Newspaper size={40} className="text-gray-300 mb-4" />
          <h2 className="text-3xl font-semibold mb-4 text-gray-300">
            🚀 Technical News
          </h2>
          <p className="text-lg text-gray-200">{techNews[currentTechNews]}</p>
        </motion.div>

        {/* Hot Topics Card */}
        <motion.div
          className="p-8 rounded-2xl bg-white/10 border border-gray-500 shadow-xl backdrop-blur-lg transition-transform duration-300 hover:scale-105 flex flex-col items-center justify-center text-center h-96 cursor-pointer"
          whileHover={{ scale: 1.05 }}
          onClick={() => handleCardClick("/hot-topics")}
        >
          <Flame size={40} className="text-gray-300 mb-4" />
          <h2 className="text-3xl font-semibold mb-4 text-gray-300">
            🔥 Hot Topics
          </h2>
          <p className="text-lg text-gray-200">{hotTopics[currentHotTopics]}</p>
        </motion.div>

        {/* Software Topics Card */}
        <motion.div
          className="p-8 rounded-2xl bg-white/10 border border-gray-500 shadow-xl backdrop-blur-lg transition-transform duration-300 hover:scale-105 flex flex-col items-center justify-center text-center h-96 cursor-pointer"
          whileHover={{ scale: 1.05 }}
          onClick={() => handleCardClick("/software-trends")}
        >
          <Code size={40} className="text-gray-300 mb-4" />
          <h2 className="text-3xl font-semibold mb-4 text-gray-300">
            💻 Software Trends
          </h2>
          <p className="text-lg text-gray-200">
            {softwareTopics[currentSoftwareTopics]}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
