import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogIn, UserPlus, LogOut } from "lucide-react";

function Header() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  // Update state when localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);
    
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    setIsLoggedIn(false); // Immediately update UI
    navigate("/login"); // Redirect
  };

  return (
    <header className="flex justify-between items-center p-4 bg-gradient-to-b from-black to-gray-900 text-white shadow-md">
      <Link to="/">
        <h1 className="text-3xl font-semibold bg-gradient-to-r from-gray-100 to-gray-400 bg-clip-text text-transparent">
          AI DevRel
        </h1>
      </Link>
      <nav>
        <ul className="flex space-x-6">
          {isLoggedIn ? (
            <li>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 p-2 bg-red-500 text-white font-medium rounded-md shadow-md hover:scale-105 transition"
              >
                <LogOut size={20} />
                Logout
              </button>
            </li>
          ) : (
            <>
              <li>
                <Link to="/login">
                  <button className="flex items-center gap-2 p-2 bg-gradient-to-r from-gray-200 to-gray-400 text-black font-medium rounded-md shadow-md hover:scale-105 transition">
                    <LogIn size={20} />
                    Log in
                  </button>
                </Link>
              </li>
              <li>
                <Link to="/signup">
                  <button className="flex items-center gap-2 p-2 bg-gradient-to-r from-gray-200 to-gray-400 text-black font-medium rounded-md shadow-md hover:scale-105 transition">
                    <UserPlus size={20} />
                    Sign Up
                  </button>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
