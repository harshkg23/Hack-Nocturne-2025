import React from "react";
import { Link } from "react-router-dom";
import { Info, LogIn, UserPlus } from "lucide-react";

function Header() {
  return (
    <header className="flex justify-between items-center p-4 bg-gradient-to-b from-black to-gray-900 text-white shadow-md">
      <h1 className="text-3xl font-semibold bg-gradient-to-r from-gray-100 to-gray-400 bg-clip-text text-transparent">
        AI DevRel
      </h1>
      <nav>
        <ul className="flex space-x-6">
          {[
            { Icon: Info, label: "About Us", path: "/about" },
            { Icon: LogIn, label: "Log in", path: "/login" },
            { Icon: UserPlus, label: "Sign Up", path: "/signup" },
          ].map(({ Icon, label, path }, index) => (
            <li key={index}>
              <Link to={path}>
                <button className="flex items-center gap-2 p-2 bg-gradient-to-r from-gray-200 to-gray-400 text-black font-medium rounded-md shadow-md hover:scale-105 transition">
                  <Icon size={20} />
                  {label}
                </button>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
