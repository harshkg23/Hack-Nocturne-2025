import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, X } from "lucide-react";

const SoftwareTrends = () => {
  const [trends, setTrends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTrend, setSelectedTrend] = useState(null);

  useEffect(() => {
    const fetchTrends = async () => {
      try {
        const response = await fetch(
          "https://gh-trending-api.de.a9sapp.eu/repositories"
        );
        const data = await response.json();

        if (Array.isArray(data) && data.length > 0) {
          const formattedTrends = data.slice(0, 10).map((repo) => ({
            name: repo.name || "Unnamed Repo",
            url: repo.html_url || "#",
            description: repo.description || "No description available.",
          }));

          setTrends(formattedTrends);
        } else {
          setTrends(fallbackTrends);
        }
      } catch (error) {
        console.error("Error fetching software trends:", error);
        setTrends(fallbackTrends);
      } finally {
        setLoading(false);
      }
    };

    fetchTrends();
  }, []);

  const fallbackTrends = [
    {
      name: "AI & Machine Learning",
      url: "https://www.tensorflow.org/",
      description: "AI-driven software and ML models are revolutionizing industries.",
    },
    {
      name: "Blockchain Development",
      url: "https://ethereum.org/en/developers/",
      description: "Decentralized apps and smart contracts are trending in 2025.",
    },
    {
      name: "Web3 & Metaverse",
      url: "https://metaverse.org/",
      description: "The future of digital spaces, blending AR, VR, and blockchain.",
    },
    {
      name: "Cloud Computing",
      url: "https://aws.amazon.com/",
      description: "Cloud platforms like AWS, Azure, and GCP are booming.",
    },
    {
      name: "Low-Code/No-Code",
      url: "https://www.appsheet.com/",
      description: "Fast development with minimal coding—perfect for businesses.",
    },
    {
      name: "Cybersecurity",
      url: "https://www.cisco.com/c/en/us/products/security/",
      description: "With rising threats, security tools are more essential than ever.",
    },
    {
      name: "Quantum Computing",
      url: "https://quantumai.google/",
      description: "Next-gen computing with immense processing power.",
    },
    {
      name: "Edge Computing",
      url: "https://www.ibm.com/cloud/what-is-edge-computing",
      description: "Processing data closer to users for faster performance.",
    },
    {
      name: "Progressive Web Apps (PWA)",
      url: "https://web.dev/progressive-web-apps/",
      description: "Hybrid web apps that feel like native mobile apps.",
    },
    {
      name: "Rust Programming",
      url: "https://www.rust-lang.org/",
      description: "A safer alternative to C++ with memory safety and performance.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 text-white px-6 py-10">
      <h1 className="text-4xl font-extrabold text-center mb-10 flex justify-center items-center gap-2">
        <TrendingUp className="w-8 h-8" /> Software Trends 2025
      </h1>

      {loading ? (
        <p className="text-center text-gray-400">Fetching latest trends...</p>
      ) : (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {trends.map((trend, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-800/50 p-6 rounded-2xl shadow-lg backdrop-blur-md border border-gray-700 
              hover:scale-105 hover:shadow-xl transition-transform duration-300 flex flex-col justify-between text-center"
            >
              <h2 className="text-xl font-semibold">{trend.name}</h2>
              <p className="text-gray-300 mt-2">{trend.description}</p>
              <button
                onClick={() => setSelectedTrend(trend)}
                className="mt-4 bg-white text-black px-5 py-3 rounded-lg font-medium shadow-md 
                hover:bg-gray-200 transition-all duration-200 w-full"
              >
                Explore Now →
              </button>
            </motion.div>
          ))}
        </div>
      )}

      {selectedTrend && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-900 text-white p-6 rounded-xl w-3/4 max-w-lg shadow-lg relative"
          >
            <button
              onClick={() => setSelectedTrend(null)}
              className="absolute top-3 right-3 text-gray-300 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-2xl font-bold text-center">{selectedTrend.name}</h2>
            <p className="mt-4 text-gray-300 text-center">{selectedTrend.description}</p>

            <div className="mt-6 flex justify-center gap-4">
              <a
                href={selectedTrend.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-500 px-4 py-2 rounded-lg font-medium text-white shadow-md hover:bg-blue-600"
              >
                Visit Website
              </a>
              <button
                onClick={() => setSelectedTrend(null)}
                className="bg-red-500 px-4 py-2 rounded-lg font-medium text-white shadow-md hover:bg-red-600"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default SoftwareTrends;
