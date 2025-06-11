import { ChevronLeft, Menu, ShoppingBag, User } from "lucide-react";
import React, { useState, useEffect, useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const {
    token,
    setToken,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    getCartCount,
  } = useContext(ShopContext);
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (visible) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [visible]);

  // Check if the user is logged in using context or localStorage
  const isLoggedIn = token || localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    toast.success("Logout successful!");
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-between py-5 px-1 sm:px-1">
      <Link to="/">
        <div className="flex items-center space-x-3 cursor-pointer">
          <img className="w-20" src={assets.logo3} alt="logo" />
          <h1 className="text-2xl font-bold text-gray-700">
            LENS<span className="text-blue-600">STAR</span>
          </h1>
        </div>
      </Link>

      {/* Desktop Menu */}
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700 font-medium">
        {["HOME", "COLLECTION", "ABOUT", "CONTACT"].map((item, index) => (
          <NavLink
            key={index}
            to={item === "HOME" ? "/" : `/${item.toLowerCase()}`}
            className="flex flex-col items-center gap-1 hover:text-blue-600 transition-all"
          >
            <p>{item}</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
        ))}
      </ul>

      {/* Icons Section */}
      <div className="flex items-center space-x-5 text-gray-700 relative">
        {/* Profile Dropdown */}
        {isLoggedIn ? (
          <div className="relative group z-50">
            <Link>
              <User className="w-5 h-5 cursor-pointer" />
            </Link>
            <div className="hidden group-hover:block absolute right-0 pt-4 z-50">
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded shadow-lg">
                <Link to="/profile">
                  <p className="cursor-pointer hover:text-black">My Profile</p>
                </Link>
                <Link to="/orders">
                  <p className="cursor-pointer hover:text-black">Orders</p>
                </Link>
                <p
                  className="cursor-pointer hover:text-black"
                  onClick={handleLogout}
                >
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <Link to="/login">
            <button className="bg-blue-600 px-6 py-2 rounded-md text-white cursor-pointer">
              Login
            </button>
          </Link>
        )}

        <Link to="/cart">
          <div className="relative">
            <ShoppingBag className="w-5 h-5 cursor-pointer" />
            <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white rounded-full text-[10px]">
              {getCartCount()}
            </p>
          </div>
        </Link>

        {/* Mobile Menu Icon */}
        <Menu
          onClick={() => setVisible(true)}
          className="w-6 h-6 sm:hidden cursor-pointer"
        />
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-full bg-white shadow-lg transition-transform transform ${
          visible ? "translate-x-0" : "translate-x-full"
        } sm:hidden z-50`}
      >
        <div className="flex flex-col text-gray-600">
          {/* Close Button */}
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-2 p-4 border-b cursor-pointer"
          >
            <ChevronLeft className="h-6" />
            <p>Back</p>
          </div>

          {/* Mobile Menu Links */}
          {["HOME", "COLLECTION", "ABOUT", "CONTACT"].map((item, index) => (
            <NavLink
              key={index}
              onClick={() => setVisible(false)}
              className="py-3 px-6 border-b hover:bg-gray-100 transition-all"
              to={item === "HOME" ? "/" : `/${item.toLowerCase()}`}
            >
              {item}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
