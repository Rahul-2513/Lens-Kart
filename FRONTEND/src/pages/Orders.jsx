import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from "axios";

const Orders = () => {
  const { backendUrl,token, currency } = useContext(ShopContext);

  const [orderData,setOrderData] = useState([])

   const loadOrderData = async ()=>{
    try {
      if (!token) {
        return null
      }
      
        const response = await axios.post(
          backendUrl + "/api/order/userorders",
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
       
        if (response.data.success) {
          let allOrderData = []
          response.data.orders.map((order)=>{
            order.items.map((item)=>{
              item['status'] = order.status
              item["payment"] = order.payment
              item["paymentMethod"] = order.paymentMethod;
              item["date"] = order.date;
               allOrderData.push(item)

            })
          })
          setOrderData(allOrderData.reverse());
        }
      
    } catch (error) {
      
    }
   }
   useEffect(()=>{
    loadOrderData()
   })
  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>
      <div>
        {orderData.map((item, index) => (
          <div
            key={index}
            className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center gap-6"
          >
            {/* Image Section */}
            <img className="w-16 sm:w-20" src={item.image[0]} alt={item.name} />

            {/* Details Section */}
            <div className="flex-1 flex flex-col gap-2">
              <p className="sm:text-base font-medium">{item.name}</p>
              <div className="text-base text-gray-700  mt-1">
                <p>
                  {currency}
                  {item.price}
                </p>
                <p>Quantity: {item.quantity}</p>
                <p>Size: {item.size}</p>
              </div>
              <p>
                Date{" "}
                <span className="text-gray-400">
                  {new Date(item.date).toDateString()}
                </span>
              </p>
              <p>
                Payment :{" "}
                <span className="text-gray-400">
                  {item.paymentMethod}
                </span>
              </p>
            </div>

            {/* Status and Track Section */}
            <div className="flex flex-1 items-center justify-between">
              {/* Ready to Ship (Centered in the row) */}
              <div className="flex items-center gap-2 mx-auto">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <p className="text-sm md:text-base">{item.status}</p>
              </div>

              {/* Track Order (Right-aligned) */}
              <div className="ml-auto ">
                <button onClick={loadOrderData} className="text-blue-600  text-sm md:text-base cursor-pointer">
                  Track Order
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
