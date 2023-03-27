import React from "react";
import { Link } from "react-router-dom";
import Image from "../../components/customer/Image";
import BookingPage from "../customer/BookingPage";

function OrderDetail() {
  return (
    <div>
      <h1 className="font-bold text-xl mt-3 ml-6">Chi tiết đơn đặt phòng</h1>
      <hr className="mt-3"></hr>
      <div className="flex justify-start items-center mt-4 ml-6">
        <img
          src="https://picsum.photos/200"
          className="w-32 h-32 rounded-full"
        ></img>
        <div className="ml-8">
          <span className=" font-bold text-2xl">Nguyễn Văn A</span>
          <p className=" text-md">
            Rank: <span className="font-bold">Gold</span> • Khách hàng tiềm năng
          </p>
        </div>
      </div>
      <hr className="mt-3"></hr>
      <BookingPage></BookingPage>
    </div>
  );
}

export default OrderDetail;
