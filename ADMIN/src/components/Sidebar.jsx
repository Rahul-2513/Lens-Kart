import { CirclePlus, List, ShoppingCart } from 'lucide-react'
import React from 'react'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className=" w-[18%] min-h-screen border-r-1 border-gray-500">
      <div className=" flex flex-col gap-4 pt-6 pl-[20%] text-[15px] ">
        <NavLink
          className=" flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-lg"
          to="/add"
        >
          <CirclePlus className=" w-5 h-5" />
          <p className=" hidden md:block">Add Items</p>
        </NavLink>

        <NavLink
          className=" flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-lg"
          to="/list"
        >
          <List className=" w-5 h-5" />
          <p className=" hidden md:block">List Items</p>
        </NavLink>

        <NavLink
          className=" flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-lg"
          to="/orders"
        >
          <ShoppingCart className=" w-5 h-5" />
          <p className=" hidden md:block">Orders</p>
        </NavLink>
      </div>
    </div>
  );  
}

export default Sidebar

// 7:41