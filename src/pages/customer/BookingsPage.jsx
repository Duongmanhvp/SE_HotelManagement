import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AccountNav from "../../components/customer/AccountNav";

import { _bookings } from "../../data/sampleData";
import { BsPeople, BsStarFill } from "react-icons/bs";
import StarRating from "../../components/customer/StarRating";
import BookingItem from "../../components/customer/BookingItem";

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  function handleClick(e) {
    e.preventDefault();
    e.stopPropagation();
    setModalOpen(true);
  }
  let Model = (
    <div
      className="bg-gray-500/50 fixed w-full h-full top-0 bottom-0 left-0 right-0 z-50 "
      onClick={() => setModalOpen(false)}
    >
      <div
        className="w-1/2 h-3/4 p-8 bg-white rounded-3xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h2 className="font-semibold text-2xl mb-4">Vui lòng đánh giá</h2>
        <div className="grid grid-cols-2 gap-x-20 gap-y-4">
          <div className="flex  justify-between items-center gap-2">
            <label>Độ chính xác</label>
            <StarRating></StarRating>
          </div>
          <div className="flex justify-between items-center gap-2">
            <label>Mức độ sạch sẽ</label>
            <StarRating></StarRating>
          </div>
          <div className="flex  justify-between items-center gap-2">
            <label>Giao tiếp</label>
            <StarRating></StarRating>
          </div>
          <div className="flex  justify-between items-center gap-2">
            <label>Vị trí</label>
            <StarRating></StarRating>
          </div>
          <div className="flex  justify-between items-center gap-2">
            <label>Nhận phòng</label>
            <StarRating></StarRating>
          </div>
          <div className="flex  justify-between items-center gap-2">
            <label>Giá trị</label>
            <StarRating></StarRating>
          </div>
        </div>

        <textarea
          placeholder="Chia sẻ nhận xét của bạn đến cộng đồng."
          style={{ resize: "none" }}
          className="mt-8"
          maxLength={1000}
        ></textarea>
        <button className="px-6 py-3 w-2/3 m-auto font-semibold text-white bg-primary/80 hover:bg-primary duration-200 mt-8 rounded-3xl">
          Gửi đánh giá
        </button>
      </div>
    </div>
  );
  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [modalOpen]);

  useEffect(() => {
    axios
      .get("/bookings")
      .then((response) => {
        setBookings(response.data);
      })
      .catch((err) => setBookings(_bookings));
  }, []);

  return (
    <>
      <div>
        <AccountNav />
        <div className="w-2/3 m-auto">
          {bookings?.length > 0 &&
            bookings.map((booking) => (
              <Link to={`/account/bookings/${booking.place._id}`}>
                <BookingItem
                  booking={booking}
                  handleClick={handleClick}
                ></BookingItem>
              </Link>
            ))}
        </div>
      </div>
      {modalOpen && Model}
    </>
  );
}
