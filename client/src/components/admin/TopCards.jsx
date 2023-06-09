import React from "react";

const TopCards = ({ currMonthRevenue, roomsNumber, customerNumber }) => {
  return (
    <div className="grid lg:grid-cols-5 gap-4 p-4">
      <div className="lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg">
        <div className="flex flex-col w-full pb-4">
          <p className="text-2xl font-bold">${currMonthRevenue}</p>
          <p className="text-gray-600">Current month's revenue</p>
        </div>
      </div>
      <div className="lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg">
        <div className="flex flex-col w-full pb-4">
          <p className="text-2xl font-bold">{roomsNumber}</p>
          <p className="text-gray-600">Room number</p>
        </div>
      </div>
      <div className="bg-white flex justify-between w-full border p-4 rounded-lg">
        <div className="flex flex-col w-full pb-4">
          <p className="text-2xl font-bold">{customerNumber}</p>
          <p className="text-gray-600">Customer number</p>
        </div>
      </div>
    </div>
  );
};

export default TopCards;
