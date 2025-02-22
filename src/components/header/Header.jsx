import React from "react";
import { Home, Info, LogIn } from "lucide-react";

function Header() {
  return (
    <header className="flex justify-between items-center p-4 bg-black text-white shadow-md">
      <h1 className="text-3xl font-semibold bg-gradient-to-r from-gray-100 to-gray-400 bg-clip-text text-transparent">
        AI DevRel
      </h1>
      <nav>
        <ul className="flex space-x-6">
          {[
            { Icon: Home, label: "Home" },
            { Icon: Info, label: "About Us" },
            { Icon: LogIn, label: "Log in" },
          ].map(({ Icon, label }, index) => (
            <li key={index}>
              <button className="flex items-center gap-2 p-2 bg-gradient-to-r from-gray-200 to-gray-400 text-black font-medium rounded-md shadow-md hover:scale-105 transition">
                <Icon size={20} />
                {label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
