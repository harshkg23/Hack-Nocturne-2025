import React from "react";
import { Github, Twitter, Linkedin } from "lucide-react";
import { motion } from "framer-motion";

function Landing() {
  return (
    <div className="bg-gradient-to-b from-black to-gray-900 text-white min-h-screen">
      {/* Hero Section */}
      <section className="text-center py-24 px-6">
        <motion.h2
          className="text-5xl font-bold mb-4 bg-gradient-to-r from-gray-100 to-gray-400 bg-clip-text text-transparent max-w-3xl mx-auto"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Bridging AI & Developer Communities
        </motion.h2>

        <motion.p
          className="text-gray-400 max-w-lg mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          AI DevRel connects developers with cutting-edge AI tools, resources,
          and a thriving community.
        </motion.p>

        <motion.button
          className="mt-6 px-6 py-3 bg-gradient-to-r from-gray-200 to-gray-400 text-black font-medium rounded-md shadow-lg hover:scale-105 transition"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          Get Started
        </motion.button>
      </section>

      {/* Features Section */}
      <section className="text-center py-16">
        <h3 className="text-3xl font-semibold mb-8 bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent">
          Why AI DevRel?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            {
              title: "AI Resources",
              desc: "Access curated AI documentation, SDKs, and APIs.",
            },
            {
              title: "Developer Community",
              desc: "Join discussions, share ideas, and collaborate.",
            },
            {
              title: "Events & Workshops",
              desc: "Stay updated with AI meetups, hackathons, and webinars.",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="p-6 bg-gray-800/70 backdrop-blur-lg rounded-md shadow-md border border-gray-700"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <h4 className="text-xl font-medium mb-2">{feature.title}</h4>
              <p className="text-gray-400 text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Community Section */}
      <section className="text-center py-16">
        <h3 className="text-3xl font-semibold mb-6 bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent">
          Join Our Community
        </h3>
        <p className="text-gray-400 max-w-md mx-auto">
          Follow us on social media and contribute to AI innovation.
        </p>
        <div className="flex justify-center space-x-6 mt-6">
          {[
            { Icon: Github, href: "#" },
            { Icon: Twitter, href: "#" },
            { Icon: Linkedin, href: "#" },
          ].map(({ Icon, href }, index) => (
            <motion.a
              key={index}
              href={href}
              className="hover:text-gray-400 transition"
              whileHover={{ scale: 1.1 }}
            >
              <Icon size={24} />
            </motion.a>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Landing;
