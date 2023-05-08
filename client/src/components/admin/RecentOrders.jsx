import React from "react";
import { FaShoppingBag } from "react-icons/fa";
import { getTimeAgo } from "../../utils/Caculate";

const RecentOrders = ({ recentPayments }) => {
  return (
    <div className="w-full col-span-1 relative lg:h-[70vh] h-[50vh] m-auto p-4 border rounded-lg bg-white overflow-scroll">
      <h1 className="font-bold text-lg">Đơn đặt phòng gần nhất</h1>
      <ul>
        {recentPayments.map((payment) => (
          <li
            key={payment._id}
            className="bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 flex items-center cursor-pointer"
          >
            <div className="bg-blue1/10 rounded-lg p-3">
              <FaShoppingBag className="text-blue1" />
            </div>
            <div className="pl-4">
              <p className="text-gray-800 font-bold">
                ${payment.price.totalPrice}
              </p>
              <p className="text-gray-400 text-sm">{payment.payerName}</p>
            </div>
            <p className="lg:flex md:hidden absolute right-6 text-sm">
              {`${getTimeAgo(payment.createdAt).number} ${
                getTimeAgo(payment.createdAt).unit
              } ago`}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentOrders;
