import React from "react";

const TopCards = ({ currMonthRevenue, roomsNumber, customerNumber }) => {
  return (
    <div className="grid lg:grid-cols-5 gap-4 p-4">
      <div className="lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg">
        <div className="flex flex-col w-full pb-4">
          <p className="text-2xl font-bold">${currMonthRevenue}</p>
          <p className="text-gray-600">Doanh thu tháng hiện tại</p>
        </div>
        {/* <p className="bg-blue2/30 flex justify-center items-center p-5 font-bold rounded-lg">
          <span className="text-blue3 text-lg">+11%</span>
        </p> */}
      </div>
      <div className="lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg">
        <div className="flex flex-col w-full pb-4">
          <p className="text-2xl font-bold">{roomsNumber}</p>
          <p className="text-gray-600">Số lượng phòng</p>
        </div>
        {/* <p className="bg-blue2/30 flex justify-center items-center p-5 font-bold rounded-lg">
          <span className="text-blue3 text-lg">+18%</span>
        </p> */}
      </div>
      <div className="bg-white flex justify-between w-full border p-4 rounded-lg">
        <div className="flex flex-col w-full pb-4">
          <p className="text-2xl font-bold">{customerNumber}</p>
          <p className="text-gray-600">Số lượng khách hàng</p>
        </div>
        {/* <p className="bg-blue2/30 flex justify-center items-center p-5 font-bold rounded-lg">
          <span className="text-blue3 text-lg">+17%</span>
        </p> */}
      </div>
    </div>
  );
};

export default TopCards;
