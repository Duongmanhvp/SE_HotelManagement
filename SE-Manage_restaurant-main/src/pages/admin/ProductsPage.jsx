import React from "react";
import { adminData } from "../../data/sampleData";
import { FaShoppingBag } from "react-icons/fa";
import { Link } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";

function ProductsPage() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="flex justify-between px-4 pt-4">
        <h2 className="font-bold text-lg ">Thống kê đơn hàng</h2>
        <h2>Welcome Back, Clint</h2>
      </div>
      <div className="p-4">
        <div className="w-full m-auto p-4 border rounded-lg bg-white overflow-y-auto ">
          <div className="my-3 p-2 grid md:grid-cols-5 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer font-bold">
            <span>Order</span>
            <span className="sm:text-left text-right">Order time</span>
            <span className="hidden md:grid">Ngày nhận phòng</span>
            <span className="hidden sm:grid">Ngày trả phòng</span>
            <span className="hidden md:grid">Method</span>
          </div>
          <ul>
            {adminData.map((order, id) => (
              <Link to={"./orderdetails"}>
                <li
                  key={id}
                  className="bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 grid md:grid-cols-5 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer"
                >
                  <div className="flex">
                    <div className="bg-blue1/10 p-3 rounded-lg">
                      <FaShoppingBag className="text-blue1" />
                    </div>
                    <div className="pl-4">
                      <p className="text-gray-800 font-bold">
                        ${order.total.toLocaleString()}
                      </p>
                      <p className="text-gray-800 text-sm">
                        {order.name.first}
                      </p>
                    </div>
                  </div>
                  <p className="hidden md:flex">{order.date}</p>
                  <p className="text-gray-600 sm:text-left text-right">
                    <span>28-02-2022</span>
                  </p>
                  <p className="text-gray-600 sm:text-left text-right">
                    <span>13-03-2022</span>
                  </p>
                  <div className="sm:flex hidden justify-between items-center">
                    <p>{order.method}</p>
                  </div>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ProductsPage;
