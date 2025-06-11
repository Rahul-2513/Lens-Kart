import axios from "axios";
import { Lock, Mail } from "lucide-react";
import React, { useState, useEffect } from "react";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const expiration = localStorage.getItem("tokenExpiration");

    if (token && expiration) {
      const now = new Date().getTime();
      if (now > parseInt(expiration)) {
        logoutUser();
      }
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      return toast.error("Email and password are required!");
    }

    try {
      const response = await axios.post(`${backendUrl}/api/user/admin`, {
        email: email.trim(),
        password: password.trim(),
      });

      if (response.data.success) {
        const token = response.data.token;
        const expirationTime = new Date().getTime() + 60 * 60 * 1000; // 1 hour from now

        localStorage.setItem("token", token);
        localStorage.setItem("tokenExpiration", expirationTime);
        setToken(token);
        toast.success("Login successful!");

        setTimeout(logoutUser, 60 * 60 * 1000); // Auto logout after 1 hour
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error(error.response?.data?.message || "Login failed!");
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiration");
    setToken(null);
    toast.info("Session expired. Please log in again.");
  };

  return (
    <div className="bg-gradient-to-r from-gray-950 via-gray-600 to-gray-950 min-h-screen flex items-center justify-center px-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-sm sm:max-w-md md:max-w-lg">
        <h1 className="text-center text-gray-200 mb-6 text-2xl font-bold">
          ADMIN LOGIN
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="flex items-center gap-4 mb-4">
            <Mail className="text-gray-400" />
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Enter Your Email"
              required
              className="w-full p-2 rounded bg-gray-700 text-white outline-none"
            />
          </div>
          <div className="flex items-center gap-4 mb-4">
            <Lock className="text-gray-400" />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Enter Your Password"
              required
              className="w-full p-2 rounded bg-gray-700 text-white outline-none"
            />
          </div>
          <div className="text-center ml-9">
            <button
              type="submit"
              className="w-full mt-4 p-2 bg-green-600 text-white rounded hover:bg-green-700 transition cursor-pointer"
            >
              SUBMIT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
