import React from "react";
import { Link, NavLink } from "react-router-dom";
import { RxDashboard, RxPerson } from "react-icons/rx";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { FiSettings } from "react-icons/fi";
import { TiArrowBackOutline } from "react-icons/ti";

const Sidebar = () => {
  return (
    <div className="admin fixed w-20 h-screen p-4 bg-white border-r-[1px] flex flex-col justify-between">
      <div className="flex flex-col items-center">
        <Link to="/">
          <div className="bg-gray-200  p-3 rounded-lg inline-block">
            <TiArrowBackOutline size={20} />
          </div>
        </Link>
        <span className="border-b-[1px] border-gray-400 w-full p-2"></span>
        <NavLink to="" end>
          <div className="bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block">
            <RxDashboard size={20} />
          </div>
        </NavLink>
        <NavLink to="customers">
          <div className="bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block">
            <RxPerson size={20} />
          </div>
        </NavLink>
        <NavLink to="products">
          <div className="bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block">
            <HiOutlineShoppingBag size={20} />
          </div>
        </NavLink>
        {/* <NavLink to="">
          <div className="bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block">
            <FiSettings size={20} />
          </div>
        </NavLink> */}
      </div>
    </div>
  );
};

export default Sidebar;
