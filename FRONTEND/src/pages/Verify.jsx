import React, { useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Verify = () => {
  const { navigate, token, setCartItems, backendUrl } = useContext(ShopContext);
  const [searchParams] = useSearchParams();

  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const verifyPayment = async () => {
    if (!token || !orderId || success !== "true") {
      navigate("/cart");
      return;
    }

    try {
      const response = await axios.post(
        `${backendUrl}/api/order/verifyStripe`,
        { success, orderId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setCartItems({});
        navigate("/orders");
      } else {
        toast.error(response.data.message || "Verification failed");
        navigate("/cart");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      navigate("/cart");
    }
  };

  useEffect(() => {
    verifyPayment();
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center text-xl font-semibold text-gray-700">
      Verifying your payment...
    </div>
  );
};

export default Verify;
