import React from "react";
import { CircleCheck, Headset, Repeat, Truck } from "lucide-react";
import { Link } from "react-router";

const OurPolicy = () => {
  return (
    <>
      <div className=" flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700">
        <div>
          <Truck className=" w-12 m-auto mb-5 cursor-pointer " />
          <p className=" font-semibold">Free Shipping</p>
          <p className=" text-gray-400">We offer free shipping over 5KM</p>
        </div>
        <div>
          <CircleCheck className=" w-12 m-auto mb-5 cursor-pointer" />
          <p className=" font-semibold">7 Days Return Policy</p>
          <p className=" text-gray-400">We provide 7 days free return policy</p>
        </div>
        <Link to="/contact">
          <div>
            <Headset className=" w-12 m-auto mb-5 cursor-pointer " />
            <p className=" font-semibold">Best customer support</p>
            <p className=" text-gray-400">We provide 24/7 customer support </p>
          </div>
        </Link>
      </div>

      <div className=" text-center">
        <p className="text-2xl font-medium text-gray-800">
          Enjoy 10% off! on your first order
        </p>
        <p className="text-gray-400 mt-3">
          Stay updated with our latest offers and news!
        </p>
      </div>
    </>
  );
};

export default OurPolicy;
