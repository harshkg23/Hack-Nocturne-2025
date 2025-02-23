import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, User } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import toast styles

const Signup = ({ url }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${url}/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (!data.success) {
        toast.error(data.message); // ❌ Show error toast immediately
        return;
      }

      toast.success("Signup successful!!"); // ✅ Show success toast

      
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000); 
    } catch (error) {
      console.error("Signup failed:", error.message);
      toast.error("An error occurred while signing up.");
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
          Create an Account
        </h2>
        <form onSubmit={submitHandler} className="space-y-5">
          <div className="relative">
            <User className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Username"
              className="w-full p-3 pl-10 bg-gray-700 text-white rounded-lg outline-none focus:ring-2 focus:ring-gray-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 pl-10 bg-gray-700 text-white rounded-lg outline-none focus:ring-2 focus:ring-gray-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 pl-10 bg-gray-700 text-white rounded-lg outline-none focus:ring-2 focus:ring-gray-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-white text-black hover:bg-gray-300 font-bold py-3 rounded-lg transition text-lg shadow-md"
          >
            Sign Up
          </button>
        </form>
        <p className="text-gray-400 text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-white hover:underline">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;
