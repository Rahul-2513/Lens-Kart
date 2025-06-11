import React, { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { assets } from "../assets/assets";
import { Link } from "react-router";

function ImageSlider() {
  const swiperRef = useRef(null);
  const autoplayDelay = 4000;
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const swiperInstance = swiperRef.current?.swiper;
    if (swiperInstance) {
      swiperInstance.on("slideChange", () => {
        setCurrentSlide(swiperInstance.realIndex);
      });
    }
    return () => {
      if (swiperInstance) {
        swiperInstance.off("slideChange");
      }
    };
  }, []);

  const slides = [
    {
      src: assets.image1,
      alt: "slide1",
      heading: "Premium Sunglasses",
      text: "Explore our latest collection designed for style and protection.",
      button: "Shop Now",
      position: "right",
      textColor: "text-white",
      bgColor: "bg-transparent",
    },
    {
      src: assets.image2,
      alt: "slide2",
      heading: "Stylish & Comfortable",
      text: "Find the perfect sunglasses that match your personality.",
      button: "Explore Collection",
      position: "left",
      textColor: "text-black",
      bgColor: "bg-transparent",
    },
    {
      src: assets.image5,
      alt: "slide3",
      heading: "Timeless Elegance",
      text: "Upgrade your look with high-quality, trendy sunglasses.",
      button: "Find Your Style",
      position: "left",
      textColor: "text-black",
      bgColor: "bg-transparent",
    },
  ];

  const handleSlideChange = (direction) => {
    if (swiperRef.current?.swiper) {
      if (direction === "prev") {
        swiperRef.current.swiper.slidePrev();
      } else {
        swiperRef.current.swiper.slideNext();
      }
    }
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Left Navigation Button */}
      <button
        className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white p-2 sm:p-3 rounded-full shadow-md cursor-pointer z-10"
        onClick={() => handleSlideChange("prev")}
      >
        <ChevronLeft className="text-gray-800 text-sm sm:text-xl" />
      </button>

      <Swiper
        ref={swiperRef}
        modules={[Navigation, Pagination, Autoplay]}
        loop={true}
        autoplay={{ delay: autoplayDelay, disableOnInteraction: false }}
        pagination={{ clickable: true }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="relative">
            <img
              src={slide.src}
              alt={slide.alt}
              className="w-full h-[60vh] sm:h-auto block rounded-lg shadow-md object-cover"
            />
            {/* Text Overlay for larger screens */}
            <div
              className={`absolute top-1/2 ${
                slide.position === "right" ? "right-3 sm:right-10" : "left-3 sm:left-10"
              } transform -translate-y-1/2 p-1 sm:p-5 rounded-lg ${slide.bgColor} hidden sm:block`}
            >
              <h2 className={`text-lg sm:text-3xl font-bold ${slide.textColor}`}>
                {slide.heading}
              </h2>
              {/* Text visible only on larger screens */}
              <p className={`mt-1 sm:mt-2 text-sm sm:text-lg w-36 sm:w-72 ${slide.textColor}`}>
                {slide.text}
              </p>
              {slide.button && (
                <Link to='/collection'>
                  <button className="mt-2 sm:mt-3 px-3 sm:px-4 py-1 sm:py-2 bg-yellow-500 text-black rounded-lg font-semibold cursor-pointer">
                    {slide.button}
                  </button>
                </Link>
              )}
            </div>

            {/* Text and Button at the Bottom for Mobile Screens */}
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:hidden bg-transparent text-white">
              <h2 className="text-lg font-bold">{slide.heading}</h2>
              {/* Text visible on mobile but with smaller size */}
              <p className="text-xs sm:text-lg">{slide.text}</p>
              {slide.button && (
                <Link to='/collection'>
                  <button className="mt-2 px-3 py-1 bg-yellow-500 text-black rounded-lg font-semibold cursor-pointer">
                    {slide.button}
                  </button>
                </Link>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Right Navigation Button */}
      <button
        className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white p-2 sm:p-3 rounded-full shadow-md cursor-pointer z-10"
        onClick={() => handleSlideChange("next")}
      >
        <ChevronRight className="text-gray-800 text-sm sm:text-xl" />
      </button>
    </div>
  );
}

export default ImageSlider;
