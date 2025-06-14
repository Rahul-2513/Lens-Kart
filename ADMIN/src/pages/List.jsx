import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";

const List = ({token}) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const removeProduct = async (id)=>{
    try {
      const response = await axios.post(backendUrl+ '/api/product/remove',{id},{headers:{token}})

      if (response.data.success) {
        toast.success(response.data.message)
        await fetchList();
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
       console.log(error);
       toast.error(error.message);
    }
  }

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <p className="mb-2 font-semibold text-lg">All Products List</p>

      <div className="flex flex-col gap-2">
      
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-2 px-4 border bg-gray-100 text-sm font-semibold">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>

        {/* Product List */}
        <div>
          {list.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-2 px-4 border rounded-md shadow-sm"
            >
              <img
                src={item.image[0]}
                alt={item.name}
                className="w-16 h-16 object-cover rounded-md"
              />
              <p className="font-medium">{item.name}</p>
              <p>{item.category}</p>
              <p className="font-semibold">
                {currency}
                {item.price}
              </p>
              <p onClick={()=>removeProduct(item._id)} className="text-center text-red-500 cursor-pointer hover:underline">
                X
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default List;
