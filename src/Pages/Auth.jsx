import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaGoogle, FaApple } from "react-icons/fa";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  OAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  TwitterAuthProvider,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { doc, getFirestore, setDoc } from "firebase/firestore";

const LearnLoopAuth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState("Student");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
  });

  const auth = getAuth();
  const db = getFirestore();
  const Navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Google User:", user);
      Navigate("/home");
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  };

  const handleTwitterSignIn = async () => {
    const provider = new TwitterAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      Navigate("/home");
      console.log("Apple User:", user);
    } catch (error) {
      console.error("Apple Sign-In Error:", error);
    }
  };

  const avatars = [
    "/avatars/avatar1.png",
    "/avatars/avatar2.png",
    "/avatars/avatar3.png",
    "/avatars/avatar4.png",
    "/avatars/avatar5.png",
    "/avatars/avatar6.png",
    "/avatars/avatar7.png",
    "/avatars/avatar8.png",
    "/avatars/avatar9.png",
    "/avatars/avatar10.png",
    "/avatars/avatar11.png",
  ];

  const randomAvatar = avatars[Math.floor(Math.random() * 10)];
  console.log(randomAvatar);
  // Handle Form Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Submit Email/Password Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, username } = formData;

    if (isLogin) {
      // Login existing user
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        console.log("User logged in:", userCredential.user);

        Navigate("/home");
      } catch (error) {
        console.error("Login Error:", error);
        alert("Login failed. Check your email and password.");
      }
    } else {
      // Register new user
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        await setDoc(doc(db, "users", user.uid), {
          username: username,
          email: user.email,
          profile: randomAvatar,
          role: role, // Example of other data
        });
        console.log("User registered:", user);
        Navigate("/home");
      } catch (error) {
        console.error("Registration Error:", error);
        alert(
          "Registration failed. Ensure your email is valid and password is strong."
        );
      }
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
            onClick={handleTwitterSignIn}
            className="w-full flex items-center justify-center border border-solid border-black text-black py-2 px-4 rounded-lg shadow-lg hover:bg-gray-200 transition duration-200">
            <FaApple size={20} />
            <span className="ml-[10px]">Sign in with Twitter</span>
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
