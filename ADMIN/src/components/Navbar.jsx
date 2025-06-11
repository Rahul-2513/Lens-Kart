import React from 'react'
import {assets} from '../assets/assets'
import { Link } from 'react-router-dom';

const Navbar = ({setToken}) => {
  return (
    <div className=" flex items-center justify-between py-3  px-1 sm:px-1">
      <Link to="/add">
        <div className="flex items-center space-x-3 cursor-pointer">
          <img className="w-20" src={assets.logo3} alt="logo" />

          <h1 className="text-2xl font-bold text-gray-700">
            LENS<span className="text-blue-600">STAR</span>
          </h1>
        </div>
        <h1 className=' font-bold px-3 mt-1 text-lg'>
          <span className=' text-gray-700'>ADMIN  </span>
          
          <span className=' text-teal-800'>PANEL</span>
        </h1>
      </Link>
      <button onClick={()=>setToken('')} className=' bg-gray-600 rounded-lg px-5 py-2 sm:py-2 text-white text-xs sm:text-sm cursor-pointer'>Logout</button>
    </div>
  );
}

export default Navbar