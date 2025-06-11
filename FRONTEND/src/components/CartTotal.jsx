import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);

  const freeDeliveryThreshold = 1000;
  const cartAmount = getCartAmount();

  const isFreeDelivery = cartAmount >= freeDeliveryThreshold;
  const effectiveDeliveryFee = isFreeDelivery ? 0 : delivery_fee;

  const amountForFreeDelivery = freeDeliveryThreshold - cartAmount;

  return (
    <div className="w-full p-4 bg-white shadow-lg rounded-lg">
      <div className="text-2xl font-bold mb-4">
        <Title text1="CART" text2="TOTALS" />
      </div>
      <div className="flex flex-col gap-4 text-sm">
        {/* Subtotal Section */}
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>
            {currency} {cartAmount}.00
          </p>
        </div>
        <hr />

        {/* Shipping Fee Section */}
        <div className="flex justify-between items-center">
          <p>Shipping Fee</p>
          <p>
            {isFreeDelivery ? (
              <>
                <span className="line-through text-gray-500">
                  {currency} {delivery_fee}.00
                </span>{" "}
                {currency} 0.00
              </>
            ) : (
              `${currency} ${delivery_fee}.00`
            )}
          </p>
        </div>
        <hr />

        {/* Total Section */}
        <div className="flex justify-between font-semibold text-lg">
          <p>Total</p>
          <p>
            {currency}
            {cartAmount === 0 ? 0 : cartAmount + effectiveDeliveryFee}.00
          </p>
        </div>
        <hr />

        {/* Free Delivery Hint Section */}
        {!isFreeDelivery && (
          <div className="bg-blue-100 text-blue-800 p-3 rounded-lg text-center">
            <p className="text-sm font-medium">
              Add{" "}
              <span className="font-bold">
                {currency} {amountForFreeDelivery}.00
              </span>{" "}
              more to get <strong>FREE DELIVERY!</strong>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartTotal;
