import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { FaShoppingBag } from "react-icons/fa";
import { Link } from "react-router-dom";
import { gettAllPayment } from "../../api";
import { getTimeAgo } from "../../utils/Caculate";
import Header from "../../components/admin/Header";

function ProductsPage() {
  const [bookings, setBookings] = useState();
  useEffect(() => {
    gettAllPayment()
      .then((res) => setBookings(res.data))
      .catch((err) => console.log(err));
  }, []);
  if (!bookings) {
    return <p>Loading...</p>;
  }
  return (
    <div className="bg-gray-100 min-h-screen">
      <Header pagename={"Orders page"}></Header>
      <div className="p-4">
        <div className="w-full m-auto p-4 border rounded-lg bg-white overflow-y-auto ">
          <div className="my-3 p-2 grid md:grid-cols-5 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer font-bold">
            <span>Order</span>
            <span className="sm:text-left text-right">Order time</span>
            <span className="hidden md:grid">Check in</span>
            <span className="hidden sm:grid">Check out</span>
            <span className="hidden md:grid">Method</span>
          </div>
          <ul>
            {bookings.map((booking) => (
              <Link to={`details/${booking._id}`}>
                <li
                  key={booking._id}
                  className="bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 grid md:grid-cols-5 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer"
                >
                  <div className="flex">
                    <div className="bg-blue1/10 p-3 rounded-lg">
                      <FaShoppingBag className="text-blue1" />
                    </div>
                    <div className="pl-4">
                      <p className="text-gray-800 font-bold">
                        ${booking.price.totalPrice}
                      </p>
                      <p className="text-gray-800 text-sm">
                        {booking.payerName}
                      </p>
                    </div>
                  </div>
                  <p className="hidden md:flex">
                    {`${getTimeAgo(booking.createdAt).number} ${
                      getTimeAgo(booking.createdAt).unit
                    } ago`}
                  </p>
                  <p className="text-gray-600 sm:text-left text-right">
                    <span>
                      {format(new Date(booking.checkIn), "dd-MM-yyyy")}
                    </span>
                  </p>
                  <p className="text-gray-600 sm:text-left text-right">
                    <span>
                      {format(new Date(booking.checkOut), "dd-MM-yyyy")}
                    </span>
                  </p>
                  <div className="sm:flex hidden justify-between items-center">
                    <p>{booking.paymentType || "Unknown"}</p>
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
