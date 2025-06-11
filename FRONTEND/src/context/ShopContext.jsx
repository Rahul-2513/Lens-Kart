import React, { useEffect } from "react";
import { createContext, useState } from "react";

import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "₹";
  const delivery_fee = 100;
  const backendUrl = import.meta.env .VITE_BACKEND_URL
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(true);
  const [cartItems, setCartItems] = useState({});
  const [products,setProducts] = useState([]);
  const [token,setToken] = useState('');

  const navigate = useNavigate();
  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Select Product Size");
      return;
    }

    const newCart = structuredClone(cartItems);
    newCart[itemId] = newCart[itemId] || {};
    newCart[itemId][size] = (newCart[itemId][size] || 0) + 1;
    setCartItems(newCart);

    if (!token) return;

    try {
      
      const response = await axios.post(
        `${backendUrl}/api/cart/add`,
        { itemId, size },
        { headers: { Authorization: `Bearer ${token}` } }
      );
     

      if (response.data.success) {
        setCartItems(response.data.cartData);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log("❌ addToCart frontend error:", error);
      toast.error(error.message);
    }
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (error) {}
      }
    }
    return totalCount;
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((products) => products._id === items);
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalAmount += itemInfo.price * cartItems[items][item];
          }
        } catch (error) {}
      }
    }
    return totalAmount;
  };
  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;
    setCartItems(cartData);
    if (token) {
      try {
        const response = await axios.post(
          `${backendUrl}/api/cart/update`,
          { itemId, size ,quantity},
          { headers: { Authorization: `Bearer ${token}` } }
        );
        
      if (response.data.success) {
        setCartItems(response.data.cartData);
      } else {
        toast.error(response.data.message);
      }

      } catch (error) {
         console.log("❌ addToCart frontend error:", error);
         toast.error(error.message);
      }
    }
  };


  const getProductsData = async ()=>{
         try {
          const response = await axios.get(backendUrl + '/api/product/list')
          if (response.data.success) {
            setProducts(response.data.products)
          } else {
            toast.error(response.data.message)
          }
         } catch (error) {
          console.log(error)
          toast.error(error.message)
         }
  }

  const getUserCart = async (token)=>{
    try {
      const response = await axios.post(
        `${backendUrl}/api/cart/get`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

        
      if (response.data.success) {
        setCartItems(response.data.cartData);
      } else {
        toast.error(response.data.message);
      }

      
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  useEffect(()=>{
   getProductsData();
  },[])

  useEffect(()=>{
    if (!token && localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'))
      getUserCart(localStorage.getItem("token"));
    }
  })

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    setCartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    token,
    setToken
  };
  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
