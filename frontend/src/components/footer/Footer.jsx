import React from "react";
import { Github, Twitter, Linkedin } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-gradient-to-b from-black to-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Brand Section */}
        <div>
          <h2 className="text-lg font-semibold bg-gradient-to-r from-gray-100 to-gray-400 bg-clip-text text-transparent">
            AI DevRel
          </h2>
          <p className="text-sm text-gray-400">
            Bridging AI & Developer Communities
          </p>
        </div>

        {/* Navigation Links */}
        <ul className="flex space-x-6 mt-4 md:mt-0">
          {["Home", "Blog", "Docs", "Contact"].map((item, index) => (
            <li key={index}>
              <a href="#" className="hover:text-gray-300 text-sm transition">
                {item}
              </a>
            </li>
          ))}
        </ul>

        {/* Social Links */}
        <div className="flex space-x-4 mt-4 md:mt-0">
          {[
            { Icon: Github, href: "#" },
            { Icon: Twitter, href: "#" },
            { Icon: Linkedin, href: "#" },
          ].map(({ Icon, href }, index) => (
            <a
              key={index}
              href={href}
              className="hover:text-gray-300 transition"
            >
              <Icon size={20} />
            </a>
          ))}
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-500 text-xs mt-6 border-t border-gray-700 pt-4">
        &copy; {new Date().getFullYear()} AI DevRel. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
