import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast, ToastContainer } from "react-toastify";
import { Package } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) return null;
    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const statusHandler = async (event,orderId) =>{
    try {
      const response = await axios.post(
        backendUrl + "/api/order/status",
        { orderId, status: event.target.value },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        await fetchAllOrders()
      } 
    } catch (error) {
      console.log(error);
      toast.error(response.data.message);
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <ToastContainer position="top-right" />
      <h3 className="text-2xl font-semibold mb-6">Orders Page</h3>

      <div className="space-y-6">
        {orders.map((order, idx) => (
          <div
            key={idx}
            className="bg-white shadow-md rounded-lg p-5 flex flex-col md:flex-row md:items-start md:space-x-6"
          >
            <div className="flex-shrink-0 text-indigo-500">
              <Package size={32} />
            </div>

            <div className="flex-1 space-y-3">
              {/* Items list */}
              <div className="text-gray-700">
                {order.items.map((item, i) => {
                  const comma = i < order.items.length - 1 ? "," : "";
                  return (
                    <p key={i} className="inline">
                      {item.name} x {item.quantity}{" "}
                      <span className="font-mono">{item.size}</span>
                      {comma}{" "}
                    </p>
                  );
                })}
              </div>

              {/* Address */}
              <div className="text-gray-600">
                <p className="font-medium">
                  {order.address.firstName} {order.address.lastName}
                </p>
                <p>
                  {order.address.street}, {order.address.city},{" "}
                  {order.address.state}, {order.address.country} -{" "}
                  {order.address.pincode}
                </p>
                <p>📞 {order.address.phone}</p>
              </div>
            </div>

            <div className="mt-4 md:mt-0 flex flex-col space-y-1 text-gray-800">
              <p>
                <span className="font-semibold">Items:</span>{" "}
                {order.items.length}
              </p>
              <p>
                <span className="font-semibold">Method:</span>{" "}
                {order.paymentMethod}
              </p>
              <p>
                <span className="font-semibold">Payment:</span>{" "}
                {order.payment ? "Done" : "Pending"}
              </p>
              <p className="text-lg font-bold">
                {currency}
                {order.amount}
              </p>
              <select onChange={(event)=>statusHandler(event,order._id)} value={order.status}
                className="mt-2 p-1 border rounded focus:outline-none focus:ring"
                defaultValue=""
              >
                <option value="" disabled>
                  Update Status
                </option>
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
