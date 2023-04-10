import React, { useState, useEffect } from "react";
import UserProfile from "../../components/customer/UserProfile";
import { _bookings } from "../../data/sampleData";
import axios from "axios";
import { Link } from "react-router-dom";
import BookingItem from "../../components/customer/BookingItem";

function CustomersDetail() {
  const [index, setIndex] = useState(1);
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    axios
      .get("/bookings")
      .then((response) => {
        setBookings(response.data);
      })
      .catch((err) => setBookings(_bookings));
  }, []);
  return (
    <div>
      <h1 className="font-bold text-xl mt-3 ml-6">Chi tiết khách hàng</h1>
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
      <div className=" mt-5 flex justify-center items-center">
        <button
          onClick={() => setIndex(1)}
          className={`px-6 py-3 rounded-xl ${
            index === 1 && "bg-blue1 text-white"
          }`}
        >
          Hồ sơ
        </button>
        <button
          onClick={() => setIndex(2)}
          className={`px-6 py-3 ml-3 rounded-xl ${
            index === 2 && "bg-blue1 text-white shadow-xl"
          }`}
        >
          Đơn mua
        </button>
      </div>

      {index === 1 && (
        <div className="w-2/3 mx-auto mt-16 pb-16">
          <UserProfile></UserProfile>
        </div>
      )}
      {index === 2 && (
        <div className="w-2/3 mx-auto mt-16 pb-16">
          {bookings?.length > 0 &&
            bookings.map((booking) => (
              <Link to={`/account/bookings/${booking.place._id}`}>
                <BookingItem booking={booking}></BookingItem>
              </Link>
            ))}
        </div>
      )}
    </div>
  );
}

export default CustomersDetail;
