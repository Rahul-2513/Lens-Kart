import React, { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [isActive, setIsActive] = useState(false);
  const { setToken, navigate, backendUrl } = useContext(ShopContext);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      let response;
      if (isActive) {
        response = await axios.post(`${backendUrl}/api/user/register`, {
          name,
          email,
          password,
        });
        if (response.data.success) {
          toast.success("Registration successful!");
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          navigate("/");
        } else {
          toast.error(response.data.message);
        }
      } else {
        response = await axios.post(`${backendUrl}/api/user/login`, {
          email,
          password,
        });
        if (response.data.success) {
          toast.success("Login successful!");
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          navigate("/");
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
    }
  };

  const toggleActive = () => {
    setIsActive(!isActive);
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-blue-300">
        <div className="relative w-[768px] max-w-full min-h-[480px] bg-white rounded-3xl shadow-lg overflow-hidden">
          {/* Sign Up Form */}
          <div
            className={`absolute top-0 h-full w-1/2 transition-all duration-700 ease-in-out ${
              isActive
                ? "translate-x-full opacity-100 z-10"
                : "left-0 opacity-0 z-1"
            }`}
          >
            <form
              onSubmit={onSubmitHandler}
              className="bg-white flex flex-col items-center justify-center h-full px-10"
            >
              <h1 className="text-2xl font-semibold mb-4 text-blue-700">
                Create Account
              </h1>
              <span className="text-xs text-gray-600">
                or use your email for registration
              </span>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                placeholder="Name"
                className="bg-blue-50 border border-blue-300 my-2 p-2 px-3 text-sm rounded-lg w-full outline-none"
              />
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="Email"
                className="bg-blue-50 border border-blue-300 my-2 p-2 px-3 text-sm rounded-lg w-full outline-none"
              />
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="Password"
                className="bg-blue-50 border border-blue-300 my-2 p-2 px-3 text-sm rounded-lg w-full outline-none"
              />
              <button className="bg-blue-700 text-white text-xs py-2 px-10 border border-transparent rounded-lg font-semibold tracking-wide uppercase mt-2 cursor-pointer hover:bg-blue-800">
                Sign Up
              </button>
            </form>
          </div>

          {/* Sign In Form */}
          <div
            className={`absolute top-0 h-full w-1/2 transition-all duration-700 ease-in-out ${
              isActive
                ? "translate-x-full opacity-0 z-1"
                : "left-0 opacity-100 z-10"
            }`}
          >
            <form
              onSubmit={onSubmitHandler}
              className="bg-white flex flex-col items-center justify-center h-full px-10"
            >
              <h1 className="text-2xl font-semibold mb-4 text-blue-700">
                Sign In
              </h1>
              <span className="text-xs text-gray-600">
                or use your email password
              </span>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email"
                value={email}
                className="bg-blue-50 border border-blue-300 my-2 p-2 px-3 text-sm rounded-lg w-full outline-none"
              />
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
                value={password}
                className="bg-blue-50 border border-blue-300 my-2 p-2 px-3 text-sm rounded-lg w-full outline-none"
              />
              <a
                href="#"
                className="text-xs text-blue-500 my-3 hover:underline"
              >
                Forgot Your Password?
              </a>
              <button className="bg-blue-700 text-white text-xs py-2 px-10 border border-transparent rounded-lg font-semibold tracking-wide uppercase mt-2 cursor-pointer hover:bg-blue-800">
                Sign In
              </button>
            </form>
          </div>

          {/* Overlay Panel with Curved Shape */}
          <div
            className={`absolute top-0 left-1/2 w-1/2 h-full transition-all duration-700 ease-in-out ${
              isActive ? "-translate-x-full rotate-180" : "rotate-0"
            }`}
            style={{ transformOrigin: "center" }}
          >
            <div className="bg-gradient-to-r from-blue-700 to-blue-500 h-full flex flex-col items-center justify-center text-center p-8 text-white rounded-[150px_0_0_150px] transition-all duration-700">
              <div
                className={`transition-all duration-700 ${
                  isActive ? "rotate-180" : "rotate-0"
                }`}
                style={{ transformOrigin: "center" }}
              >
                {isActive ? (
                  <>
                    <h1 className="text-2xl font-semibold mb-4">
                      Welcome Back!
                    </h1>
                    <p className="text-sm leading-5">
                      Enter your personal details to use all site features.
                    </p>
                    <button
                      onClick={toggleActive}
                      className="bg-transparent border border-white text-white text-xs py-2 px-10 rounded-lg font-semibold tracking-wide uppercase mt-2 cursor-pointer hover:bg-white hover:text-blue-700"
                    >
                      Sign In
                    </button>
                  </>
                ) : (
                  <>
                    <h1 className="text-2xl font-semibold mb-4">
                      Hello, Friend!
                    </h1>
                    <p className="text-sm leading-5">
                      Register with your personal details to use all site
                      features.
                    </p>
                    <button
                      onClick={toggleActive}
                      className="bg-transparent border border-white text-white text-xs py-2 px-10 rounded-lg font-semibold tracking-wide uppercase mt-2 cursor-pointer hover:bg-white hover:text-blue-700"
                    >
                      Sign Up
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

