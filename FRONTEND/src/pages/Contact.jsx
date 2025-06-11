import React from "react";
import {
  Clock,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Youtube,
} from "lucide-react";
import { div } from "motion/react-client";
import Address from "../components/Address";

const Contact = () => {
  return (
    <>
      <div className="bg-[#e8f0fe] py-16 px-6 sm:px-10 md:px-20 lg:px-40">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white shadow-2xl flex flex-col md:flex-row rounded-lg overflow-hidden">
            <div className="md:w-1/2 bg-[#2d3748] text-white px-6 sm:px-10 md:px-12 py-10">
              <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">
                Contact Us
              </h1>

              <div className="mb-6 sm:mb-8">
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">
                  Address
                </h3>
                <div className="flex items-start gap-3">
                  <MapPin size={40} />
                  <div className="text-sm sm:text-base">
                    Near SBI Bank, Beside Ram Lakhan College, Kokar, Ranchi,
                    Jharkhand 834001
                  </div>
                </div>
              </div>

              <div className="mb-6 sm:mb-8">
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">
                  Contact
                </h3>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <Phone size={20} />
                    <div className="text-sm sm:text-base">
                      <a href="tel:123456789">+91 9123456789</a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail size={20} />
                    <div className="text-sm sm:text-base">
                      <a href="mailto:rahulkumar251326@gmail.com">
                        rahul251326@gmail.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6 sm:mb-8">
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">
                  Open Time
                </h3>
                <div className="flex items-center gap-3">
                  <Clock size={20} />
                  <div className="text-sm sm:text-base">10 AM - 8 PM</div>
                </div>
              </div>

              <div className="flex gap-4">
                <Instagram className=" cursor-pointer" size={24} />
                <Facebook className=" cursor-pointer" size={24} />
                <Youtube className=" cursor-pointer" size={24} />
              </div>
            </div>

            <div className="md:w-1/2 px-6 sm:px-10 md:px-12 py-10 bg-[#f9f9f9]">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 text-center">
                Get in Touch
              </h1>
              <p className="text-gray-600 text-center mb-6 sm:mb-8">
                Feel free to drop us a line below!
              </p>

              <form className="flex flex-col gap-4">
                <input
                  className="bg-white p-3 border border-gray-300 rounded-lg text-gray-700 w-full focus:outline-none focus:ring focus:ring-indigo-300"
                  type="text"
                  placeholder="Your Name*"
                  required
                />
                <input
                  className="bg-white p-3 border border-gray-300 rounded-lg text-gray-700 w-full focus:outline-none focus:ring focus:ring-indigo-300"
                  type="email"
                  placeholder="Email*"
                  required
                />
                <div>
                  <input
                    className="bg-white p-3 border border-gray-300 rounded-lg text-gray-700 w-full focus:outline-none focus:ring focus:ring-indigo-300"
                    type="text" // Use type="text"
                    placeholder="Phone Number(optional)"
                    // Add these attributes for better input control
                    maxLength="15" // Limit the number of characters (adjust as needed)
                    pattern="[0-9]*" // Allow only numeric characters
                  />
                </div>
                <textarea
                  className="bg-white p-3 border border-gray-300 rounded-lg text-gray-700 w-full focus:outline-none focus:ring focus:ring-indigo-300 h-24"
                  placeholder="Type Your Message*"
                  required
                ></textarea>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Address />
      </div>
    </>
  );
};

export default Contact;
