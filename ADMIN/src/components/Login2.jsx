import axios from "axios";
import { Lock, Mail, Phone } from "lucide-react";
import React, { useState, useEffect } from "react";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Login = ({ setToken }) => {
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [showResend, setShowResend] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");

  useEffect(() => {
    let timer;
    if (isOtpSent && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            setShowResend(true);
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isOtpSent, countdown]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsOtpSent(true);
    setCountdown(30);
    setShowResend(false);
    try {
      const response = await axios.post(`${backendUrl}/api/user/admin`, {
        email,
        password,
        mobile,
      });
      if (response.data.success) {
        setToken(response.data.success);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error(error.message);
    }
  };

  const handleResendOtp = () => {
    setCountdown(30);
    setShowResend(false);
    // Optionally, trigger the resend OTP API here
  };

  return (
    <div className="bg-gradient-to-r from-gray-950 via-gray-600 to-gray-950 min-h-screen flex items-center justify-center px-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-sm sm:max-w-md md:max-w-lg">
        <h1 className="text-center text-gray-200 mb-6 text-2xl font-bold">
          ADMIN LOGIN
        </h1>
        {!isOtpSent ? (
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
            <div className="flex items-center gap-4 mb-4">
              <Phone className="text-gray-400" />
              <input
                onChange={(e) => setMobile(e.target.value)}
                value={mobile}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="Enter Your Number"
                required
                className="w-full p-2 rounded bg-gray-700 text-white outline-none"
              />
            </div>
            <div className="ml-9">
              <button
                type="submit"
                className="w-full mt-4 p-2 bg-green-600 text-white rounded hover:bg-green-700 transition cursor-pointer"
              >
                SEND OTP
              </button>
            </div>
          </form>
        ) : (
          <div>
            <div className="flex items-center gap-4 mb-4">
              <Mail className="text-gray-400" />
              <input
                type="text"
                placeholder="Enter OTP sent to Email"
                required
                className="w-full p-2 rounded bg-gray-700 text-white outline-none"
              />
            </div>
            <div className="flex items-center gap-4 mb-4">
              <Phone className="text-gray-400" />
              <input
                type="text"
                placeholder="Enter OTP sent to Phone"
                required
                className="w-full p-2 rounded bg-gray-700 text-white outline-none"
              />
            </div>
            {countdown > 0 ? (
              <p className="text-center text-gray-400 mb-4">
                Resend OTP in {countdown} seconds
              </p>
            ) : (
              <p className="text-center text-gray-400 mb-4">
                Didn't get OTP?{" "}
                <button
                  onClick={handleResendOtp}
                  className="text-blue-500 underline cursor-pointer"
                >
                  Resend OTP
                </button>
              </p>
            )}
            <div className="ml-9">
              <button className="w-full mt-4 p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition cursor-pointer">
                Verify OTP
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
