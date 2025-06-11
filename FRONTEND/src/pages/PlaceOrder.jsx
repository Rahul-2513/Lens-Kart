import React, { useContext, useState, useEffect } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import { replace } from "react-router";

const PlaceOrder = () => {
  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products,
  } = useContext(ShopContext);

  const [method, setMethod] = useState("cod");
  const [savedAddress, setSavedAddress] = useState(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    street: "",
    area: "",
    city: "",
    pincode: "",
    state: "",
    country: "",
  });

  // Dynamically load Razorpay SDK
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
      } else {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
      }
    });
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_ID,
      amount: order.amount,
      currency: order.currency || "INR",
      name: "Lens Star",
      description: "Order Payment",
      order_id: order.id,
     receipt:order.receipt,
      
      handler: async (response) => {
        console.log("Payment success:", response);
        try {
          const { data } = await axios.post(
            backendUrl + "/api/order/verifyRazorpay",
            response,
            { headers: { Authorization: `Bearer ${token}` } }
          );
         if (data.success) {
          navigate('/orders')
          setCartItems({})
         }
        } catch (error) {
          console.log(error)
          toast.error(error)
        }
      },
      modal: {
        ondismiss: () => {
          toast.info("Payment popup closed");
        },
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.on("payment.failed", function (err) {
      console.error("Payment failed:", err.error);
      toast.error(err.error.description || "Payment failed");
    });
    rzp.open();
  };

  const handleSaveAddress = async () => {
    try {
      const res = await axios.put(`${backendUrl}/api/user/address`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) toast.success("Address saved successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save address");
    }
  };
  useEffect(() => {
    const fetchSavedAddress = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/user/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data?.address) {
          setSavedAddress(res.data.address);
        }
      } catch (err) {
        console.error("Error fetching saved address", err);
      }
    };

    fetchSavedAddress();
  }, [backendUrl, token]);
  
  

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      // Build order items
      const orderItems = [];
      for (const pid in cartItems) {
        for (const size in cartItems[pid]) {
          const qty = cartItems[pid][size];
          if (qty > 0) {
            const product = products.find((p) => p._id === pid);
            if (product) {
              const item = structuredClone(product);
              item.size = size;
              item.quantity = qty;
              orderItems.push(item);
            }
          }
        }
      }

      const orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      switch (method) {
        case "cod": {
          const res = await axios.post(
            `${backendUrl}/api/order/place`,
            orderData,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          if (res.data.success) {
            setCartItems({});
            navigate("/orders");
          } else toast.error(res.data.message);
          break;
        }
        case "stripe": {
          const res = await axios.post(
            `${backendUrl}/api/order/stripe`,
            orderData,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          if (res.data.success) window.location.replace(res.data.session_url);
          else toast.error(res.data.message);
          break;
        }
        case "razorpay": {
          const loaded = await loadRazorpayScript();
          if (!loaded) return toast.error("Failed to load payment SDK");

          const res = await axios.post(
            `${backendUrl}/api/order/razorpay`,
            orderData,
            { headers: { Authorization: `Bearer ${token}` } }
          );

          if (res.data.success && res.data.order) {
            initPay(res.data.order);
          } else {
            toast.error(res.data.message || "Order creation failed");
          }
          break;
        }
        default:
          toast.error("Select a payment method");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-5 sm:gap-8 pt-5 sm:pt-14 minh-[80vh] border-t"
    >
      {/* LEFT SIDE */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>

        <div className="flex gap-3">
          <input
            name="firstName"
            value={formData.firstName}
            onChange={onChangeHandler}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            required
            placeholder="First Name(Required)*"
          />
          <input
            name="lastName"
            value={formData.lastName}
            onChange={onChangeHandler}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Last Name"
          />
        </div>
        <input
          name="email"
          value={formData.email}
          onChange={onChangeHandler}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="email"
          required
          placeholder="Email Id(Required)*"
        />
        <input
          name="phone"
          value={formData.phone}
          onChange={onChangeHandler}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="text"
          required
          pattern="\d*"
          placeholder="Phone number(Required)*"
        />
        <input
          name="street"
          value={formData.street}
          onChange={onChangeHandler}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="text"
          required
          placeholder="House no., Building Name(Required)*"
        />
        <input
          name="area"
          value={formData.area}
          onChange={onChangeHandler}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="text"
          required
          placeholder="Road Name, Area, Colony(Required)*"
        />
        <div className="flex gap-3 items-center">
          <input
            name="city"
            value={formData.city}
            onChange={onChangeHandler}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            required
            placeholder="City(Required)*"
          />
          <input
            name="pincode"
            value={formData.pincode}
            onChange={onChangeHandler}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            required
            pattern="\d*"
            placeholder="Pincode(Required)*"
          />
        </div>

        <input
          name="state"
          value={formData.state}
          onChange={onChangeHandler}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="text"
          required
          placeholder="State(Required)*"
        />
        <input
          name="country"
          value={formData.country}
          onChange={onChangeHandler}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="text"
          placeholder="Country"
        />
        <div className="flex flex-wrap gap-4 my-3">
          <button
            type="button"
            onClick={handleSaveAddress}
            className="bg-orange-500 text-white px-6 py-3 cursor-pointer rounded-lg"
          >
            Save Address
          </button>

          {savedAddress && (
            <button
              type="button"
              onClick={() => setFormData(savedAddress)}
              className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
            >
              Use Saved Address
            </button>
          )}
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="sm:ml-12">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"} />
          <div className="flex gap-3 flex-col lg:flex-row">
            <div
              onClick={() => setMethod("stripe")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border-2 rounded-full ${
                  method === "stripe" ? "bg-blue-400" : ""
                }`}
              ></p>
              <img
                className="h-5 mx-4"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/1200px-Stripe_Logo%2C_revised_2016.svg.png"
                alt="Stripe"
              />
            </div>
            <div
              onClick={() => setMethod("razorpay")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border-2 rounded-full ${
                  method === "razorpay" ? "bg-blue-400" : ""
                }`}
              ></p>
              <img
                className="h-5 mx-4"
                src="https://cdn.worldvectorlogo.com/logos/razorpay.svg"
                alt="Razorpay"
              />
            </div>
            <div
              onClick={() => setMethod("cod")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border-2 rounded-full ${
                  method === "cod" ? "bg-blue-400" : ""
                }`}
              ></p>
              <p className="text-gray-700 text-sm font-semibold mx-4">
                CASH ON DELIVERY
              </p>
            </div>
          </div>
          <div className="w-full text-end mt-8">
            <button
              type="submit"
              className="bg-black text-white px-16 py-3 text-sm rounded-lg cursor-pointer"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
