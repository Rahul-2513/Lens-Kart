import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div className="max-w-screen-xl mx-auto px-4">
      {/* Title Section */}
      <h1 className="text-3xl md:text-4xl mt-6 text-center font-bold">
        <Title text1="ABOUT" text2="US" />
      </h1>
      <p className="text-center text-lg md:text-xl text-gray-800 mb-6">
        Shades that Define You - Stylish, Protective, and Trendsetting!
      </p>

      {/* Our Story Section */}
      <div className="flex flex-col md:flex-row items-center w-full gap-8">
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            className="w-auto max-w-full h-auto max-h-[400px] object-contain mt-10"
            src={assets.about1}
            alt="About Us"
          />
        </div>
        <div className="w-full md:w-1/2">
          <h2 className="text-2xl md:text-3xl text-gray-800 text-center mb-4 font-semibold">
            Our Story
          </h2>
          <p className="text-gray-700 leading-relaxed text-justify">
            At Lens Star, we believe sunglasses are more than just an
            accessory—they're a statement of style, confidence, and
            individuality. Our journey began with a simple vision: to craft
            high-quality, stylish, and affordable eyewear that complements every
            lifestyle. Each pair is crafted with precision, using premium
            materials and UV-protected lenses to ensure maximum comfort and
            durability.
          </p>
        </div>
      </div>

      {/* Our Vision Section */}
      <div className="flex flex-col md:flex-row-reverse items-center w-full gap-8 mt-10">
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            className="w-full max-w-[400px] md:max-w-full h-auto object-contain"
            src={assets.about2}
            alt="Our Vision"
          />
        </div>
        <div className="w-full md:w-1/2">
          <h2 className="text-2xl md:text-3xl text-gray-800 text-center mb-4 font-semibold">
            Our Vision
          </h2>
          <p className="text-gray-700 leading-relaxed text-justify">
            At Lens Star, our vision is to redefine eyewear by blending fashion,
            innovation, and functionality. We aim to create sunglasses that
            empower individuals to express their unique style while ensuring
            maximum protection and comfort.
          </p>
        </div>
      </div>

      {/* Our Mission Section */}
      <div className="flex flex-col md:flex-row items-center w-full gap-8 mt-10">
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            className="w-full max-w-[400px] md:max-w-full h-auto object-contain"
            src={assets.about3}
            alt="Our Mission"
          />
        </div>
        <div className="w-full md:w-1/2">
          <h2 className="text-2xl md:text-3xl text-gray-800 text-center mb-4 font-semibold">
            Our Mission
          </h2>
          <ul className="text-gray-700 leading-relaxed space-y-3">
            <li>
              <strong>Quality & Durability –</strong> Crafted with high-grade
              materials for long-lasting performance.
            </li>
            <li>
              <strong>UV Protection & Comfort –</strong> Ensuring 100% UV
              protection and all-day comfort.
            </li>
            <li>
              <strong>Trendy & Timeless Designs –</strong> Sunglasses that suit
              both classic and modern fashion styles.
            </li>
            <li>
              <strong>Sustainability & Innovation –</strong> Committed to
              eco-friendly materials and sustainable practices.
            </li>
          </ul>
          <p className="mt-6 text-gray-800 text-center font-semibold">
            At Lens Star, we don’t just sell sunglasses—we help you see the
            world in style.
          </p>
        </div>
      </div>

      {/* Our Commitment Section */}
      <div className="flex flex-col md:flex-row-reverse items-center w-full gap-8 mt-10">
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            className="w-full max-w-[400px] md:max-w-full h-auto object-contain mb-7"
            src={assets.about4}
            alt="Our Commitment"
          />
        </div>
        <div className="w-full md:w-1/2">
          <h2 className="text-2xl md:text-3xl text-gray-800 text-center mb-4 font-semibold">
            Our Commitment to You
          </h2>
          <ul className="text-gray-700 leading-relaxed space-y-3">
            <li>
              <strong>Excellence in Every Pair –</strong> Designed with
              durability, comfort, and premium quality.
            </li>
            <li>
              <strong>Customer-First Approach –</strong> A seamless shopping
              experience from browsing to support.
            </li>
            <li>
              <strong>Transparency & Integrity –</strong> Honest pricing,
              genuine materials, and reliable service.
            </li>
          </ul>
          <p className="mt-6 text-gray-800 text-center font-semibold">
            We are dedicated to bringing you eyewear that enhances your style,
            protects your vision, and instills confidence.
          </p>
        </div>
      </div>
      
    </div>
  );
};

export default About;
