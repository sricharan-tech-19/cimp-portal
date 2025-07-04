import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { motion } from "framer-motion";

const firebaseConfig = {
  apiKey: "AIzaSyCVUrZ-xtiTKX-LlpQ3_DWfF-sp81r5lIQ",
  authDomain: "login-spend.firebaseapp.com",
  projectId: "login-spend",
  storageBucket: "login-spend.appspot.com",
  messagingSenderId: "982866457503",
  appId: "1:982866457503:web:1f68456bb4434d6baac3aa",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) navigate("/dashboard");
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (isRegister) {
        if (password !== confirmPassword) {
          setError("Passwords do not match");
          return;
        }
        await firebase.auth().createUserWithEmailAndPassword(email, password);
      } else {
        await firebase.auth().signInWithEmailAndPassword(email, password);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      await firebase.auth().signInWithPopup(provider);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGuestLogin = async () => {
    try {
      await firebase.auth().signInAnonymously();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
        className="w-full max-w-md p-8 bg-white/60 backdrop-blur-xl rounded-2xl shadow-xl"
      >
        {/* VIT Logo */}
        <div className="flex justify-center mb-6">
          <img
            src="https://chennai.vit.ac.in/wp-content/uploads/2021/08/vit_logo_colored.png"
            alt="VIT Logo"
            className="h-16 object-contain"
          />
        </div>

        <h2 className="text-center mb-6 text-3xl font-extrabold text-[#373f6e]">
          {isRegister ? "Create Your CIMP Account" : "Login to CIMP"}
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="email"
            placeholder="Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-white/70 placeholder-gray-500 text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#373f6e] transition"
          />
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-white/70 placeholder-gray-500 text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#373f6e] transition"
          />
          {isRegister && (
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/70 placeholder-gray-500 text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#373f6e] transition"
            />
          )}
          {error && <p className="text-red-600 text-sm text-center">{error}</p>}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-3 rounded-lg bg-[#373f6e] hover:bg-[#2c335d] text-white font-bold transition shadow-md"
          >
            {isRegister ? "Register" : "Login"}
          </motion.button>
        </form>

        <div className="mt-5 space-y-3">
          <motion.button
            whileHover={{ scale: 1.03 }}
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-3 py-3 bg-white text-gray-700 rounded-lg shadow hover:bg-gray-50 transition"
          >
            <img
              src="https://img.icons8.com/color/24/000000/google-logo.png"
              alt="Google"
            />
            Sign in with Google
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            onClick={handleGuestLogin}
            className="w-full flex items-center justify-center gap-3 py-3 bg-white text-gray-700 rounded-lg shadow hover:bg-gray-50 transition"
          >
            Continue as Guest
          </motion.button>
        </div>

        <motion.p
          className="mt-6 text-sm text-center text-gray-800"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {isRegister ? "Already have an account?" : "Don't have an account?"}
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="ml-1 text-[#373f6e] font-semibold hover:underline"
          >
            {isRegister ? "Login" : "Register"}
          </button>
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default Login;
