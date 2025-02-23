import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserLogin = ({ url }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${url}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!data.success) {
        toast.error(data.message || "Invalid credentials"); // ❌ Show error toast
        return;
      }

      toast.success("Login successful! 🎉");

      setTimeout(() => {
        navigate("/dashboard"); // Redirect after a short delay
      }, 2000);
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-br from-black to-gray-900 px-4">
      <ToastContainer position="top-right" autoClose={3000} />
      <motion.div
        className="bg-gradient-to-b from-gray-800 to-black p-8 rounded-xl shadow-2xl w-full max-w-md border border-gray-600"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-white text-3xl font-bold mb-6 text-center">
          Welcome Back
        </h2>
        <form onSubmit={submitHandler} className="space-y-5">
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              className="w-full p-3 pl-10 bg-gray-700 text-white rounded-lg outline-none focus:ring-2 focus:ring-gray-500"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@example.com"
              required
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              className="w-full p-3 pl-10 bg-gray-700 text-white rounded-lg outline-none focus:ring-2 focus:ring-gray-500"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-white text-black hover:bg-gray-300 font-bold py-3 rounded-lg transition text-lg shadow-md"
          >
            Login
          </button>
        </form>
        <p className="text-gray-400 text-center mt-4">
          New here?{" "}
          <Link to="/signup" className="text-white hover:underline">
            Create an account
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default UserLogin;
