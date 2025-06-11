import { Facebook, Instagram, Mail, Twitter, Youtube } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom"; 
import { assets } from "../assets/assets";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className=" text-gray-700 py-8 px-4 sm:px-6 lg:px-8 mt-12">
      {" "}
      {/* Added mt-12 for spacing */}
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {" "}
        {/* Container for responsiveness */}
        <div className="mb-6 md:mb-0">
          {" "}
          {/* Logo and short description */}
          <Link to="/">
            <div className="flex items-center space-x-2 cursor-pointer">
              <img className="w-18" src={assets.logo3} alt="logo" />
              <p className="text-sm mt-2">
                Your perfect vision, our stylish designs.
              </p>
            </div>
          </Link>
        </div>
        <div className="flex flex-col md:flex-row space-x-0 md:space-x-6 mb-6 md:mb-0 ">
          {" "}
          {/* Navigation links */}
          <div>
            <h4 className="font-semibold mb-2">Shop</h4>
            <ul className="text-sm">
              <li>
                <Link to="/collection/sunglasses">Sunglasses</Link>
              </li>
              <li>
                <Link to="/collection/eyewear">Eyewear</Link>
              </li>
              <li>
                <Link to="/accessories">Accessories</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">About Us</h4>
            <ul className="text-sm">
              <li>
                <Link to="/about">Our Story</Link>
              </li>
              <li>
                <Link to="/contact">Contact Us</Link>
              </li>
              <li>
                <Link to="/faq">FAQ</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Legal</h4>
            <ul className="text-sm">
              <li>
                <Link to="/terms">Terms of Service</Link>
              </li>
              <li>
                <Link to="/privacy">Privacy Policy</Link>
              </li>
            </ul>
          </div>
        </div>
        <div>
          {" "}
          {/* Social media icons */}
          <h4 className="font-semibold mb-2">Follow Us</h4>
          <div className="flex space-x-4">
            <div className=" flex space-x-4">
              <Link to="#email" className="text-gray-400 hover:text-gray-600">
                <Mail />
              </Link>
              <Link
                to="#instagram"
                className="text-gray-400 hover:text-gray-600"
              >
                <Instagram />
              </Link>

              <Link
                to="#facebook"
                className="text-gray-400 hover:text-gray-600"
              >
                <Facebook />
              </Link>
              <Link to="#youtube" className="text-gray-400 hover:text-gray-600">
                <Youtube />
              </Link>
            </div>

            {/* Add more social media icons (Twitter, Instagram, etc.) */}
          </div>
        </div>
      </div>
      <div className="text-center text-sm mt-8 pt-4 border-t border-gray-700">
        {" "}
        {/* Copyright */}
        &copy; {currentYear} LensStar. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
