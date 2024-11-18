import React, { useState } from "react";
import axios from "axios"; // For API calls
import { motion } from "framer-motion";
import {
  handleAppleSignIn,
  handleGoogleSignIn,
} from "../Firebase/signInOptions";
import { FaGoogle, FaApple } from "react-icons/fa";

const LearnLoopAuth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState("Student");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
  });

  // Handle Form Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Submit Email/Password Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin
      ? "https://your-api.com/login"
      : "https://your-api.com/register";
    const payload = isLogin
      ? { email: formData.email, password: formData.password }
      : { ...formData, role };

    try {
      const response = await axios.post(url, payload);
      const { token } = response.data;
      localStorage.setItem("token", token);
      alert(`Successfully ${isLogin ? "logged in" : "registered"}!`);
    } catch (error) {
      console.error("Authentication error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({ email: "", password: "", username: "" });
  };

  return (
    <div className="min-h-screen max-h-screen flex items-center justify-center font-flux overflow-scroll">
      <motion.div
        className="flex justify-center mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}>
        <div className="absolute inset-0 z-[-1]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
            className="opacity-25">
            <circle
              cx="50"
              cy="50"
              r="55"
              stroke=" purple"
              strokeWidth="1"
              fill="none"
            />
            <circle
              cx="50"
              cy="50"
              r="65"
              stroke="blue"
              strokeWidth="1"
              fill="none"
            />
            <circle
              cx="50"
              cy="50"
              r="75"
              stroke=" purple"
              strokeWidth="1"
              fill="none"
            />
            <circle
              cx="50"
              cy="50"
              r="85"
              stroke=" blue"
              strokeWidth="1"
              fill="none"
            />
            <circle
              cx="50"
              cy="50"
              r="95"
              stroke=" purple"
              strokeWidth="1"
              fill="none"
            />
            <circle
              cx="50"
              cy="50"
              r="105"
              stroke=" blue"
              strokeWidth="1"
              fill="none"
            />
          </svg>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className=" rounded-xl p-10 w-full max-w-lg">
        <motion.div
          className="flex justify-center mb-6"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}>
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 font-sans">
            Learn<span className="font-extrabold text-blue-500">Loop</span>
          </h1>
        </motion.div>

        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          {isLogin ? "Login to Your Account" : "Create Your Account"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-lg font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="username"
                placeholder="Your Name"
                value={formData.username}
                onChange={handleChange}
                required={!isLogin}
                className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
          )}
          <div>
            <label className="block text-lg font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              placeholder="Your Email"
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Your Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
          {!isLogin && (
            <div>
              <label className="block text-lg font-medium text-gray-700">
                Select Role
              </label>
              <select
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500">
                <option value="Student">Student</option>
                <option value="Tutor">Tutor</option>
              </select>
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 px-4 rounded-lg font-medium shadow-lg hover:shadow-xl hover:opacity-90 transition-all duration-200 text-lg">
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        <div className="my-6 flex justify-center items-center">
          <div className="border-t w-full border-black bg-black h-[0.5px]"></div>
          <span className="mx-4 text-gray-600">or</span>
          <div className="border-t w-full bg-black h-[0.5px]"></div>
        </div>

        {/* Social Login Buttons */}
        <div className="space-y-4">
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center border border-solid border-red-500 text-red-500 py-2 px-4 rounded-lg shadow-lg hover:bg-red-50 transition duration-200">
            <FaGoogle size={20} />
            <span className="ml-[10px]">Sign in with Google</span>
          </button>
          <button
            onClick={handleAppleSignIn}
            className="w-full flex items-center justify-center border border-solid border-black text-black py-2 px-4 rounded-lg shadow-lg hover:bg-gray-200 transition duration-200">
            <FaApple size={20} />
            <span className="ml-[10px]">Sign in with Apple</span>
          </button>
        </div>

        {/* Toggle Form */}
        <div className="text-center mt-4">
          <button
            onClick={toggleForm}
            className="text-purple-700 font-medium hover:underline">
            {isLogin
              ? "Don't have an account? Register"
              : "Already have an account? Login"}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default LearnLoopAuth;
