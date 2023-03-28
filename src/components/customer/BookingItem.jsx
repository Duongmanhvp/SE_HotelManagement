import React from "react";
import BookingDates from "../../components/customer/BookingDates";
import PlaceImg from "../../components/customer/PlaceImg";
import { BsPeople } from "react-icons/bs";
import { useLocation } from "react-router-dom";

function BookingItem({ booking, handleClick }) {
  const location = useLocation();
  function checkAdmin() {
    return location.pathname.includes("admin");
  }
  return (
    <div className="flex gap-4 bg-primary/10 rounded-2xl overflow-hidden mb-12">
      <div className=" p-4">
        <PlaceImg place={booking.place} />
      </div>
      <div className="py-4 pr-3 grow">
        <h2 className="text-lg font-semibold">{booking.place.title}</h2>
        <div className="text-md text-gray-700">
          <BookingDates booking={booking} className="mb-2 mt-2" />
          <div className="flex gap-1">
            <BsPeople size={30}></BsPeople>
            <span className="mb-4">People: {booking.people || 8}</span>
          </div>
          <div className="flex gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
              />
            </svg>
            <span className="mb-4">Total price: ${booking.price}</span>
          </div>
        </div>
        {checkAdmin() || (
          <button
            className="rounded-3xl px-4 py-2 font-semibold bg-primary/80 text-white hover:bg-primary duration-200"
            onClick={handleClick}
          >
            Đánh giá
          </button>
        )}
      </div>
    </div>
  );
}

export default BookingItem;
