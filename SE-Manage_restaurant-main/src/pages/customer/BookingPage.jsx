import AddressLink from "../../components/customer/AddressLink";
import PlaceGallery from "../../components/customer/PlaceGallery";
import BookingDates from "../../components/customer/BookingDates";
import { booking } from "../../data/sampleData";
import { useEffect } from "react";
import { BiArrowBack } from "react-icons/bi";
import { Link } from "react-router-dom";
import Image from "../../components/customer/Image";
import { BsPeople } from "react-icons/bs";

export default function BookingPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="my-8 mx-auto w-2/3">
      <Link to={"/account/bookings"} className="flex items-center mb-8">
        <BiArrowBack size={30}></BiArrowBack>
        <p className="ml-2 text-gray-500">Back</p>
      </Link>
      <Link to={`/place/${booking.place._id}`}>
        <div className="grid grid-cols-[1fr,4fr] gap-x-6 bg-primary/10 rounded-3xl hover:shadow-lg duration-300 mb-12">
          <div className="rounded-2xl p-4">
            <Image
              className=" object-cover aspect-square m-auto"
              src={booking.place.photos[0]}
              alt=""
            />
          </div>

          <div className="flex flex-col py-4">
            <h2 className="text-3xl">{booking.place.title}</h2>
            <AddressLink className="my-2 block">
              {booking.place.address}
            </AddressLink>
            <p className="text-xl">
              Price:{" "}
              <span className="font-semibold">${booking.place.price}</span>
            </p>
            <div className="flex gap-x-4 items-center mt-6 ">
              <p className=" text-gray-500">Chưa được bạn đánh giá</p>
              <p className="underline font-semibold">Đánh giá ngay!</p>
            </div>
          </div>
        </div>
      </Link>
      <div className="bg-primary/30 p-6 my-6 rounded-2xl flex flex-col items-center">
        <h2 className="text-2xl mb-8 font-semibold">Booking information</h2>
        <div className="grid grid-cols-2 gap-y-4 "></div>
        <div className="grid grid-cols-2 gap-y-4 ">
          <label className="text-gray-600">Số người</label>
          <span>{booking.people || 8}</span>
          <label className="text-gray-600">Số đêm</label>
          <BookingDates booking={booking} />
          <hr className="border-2"></hr>
          <hr className="border-2"></hr>
          <label className="text-gray-600">Tổng tiền phòng</label>
          <span>${428 * 4}</span>
          <label className="text-gray-600">Phí an ninh</label>
          <span>${booking.place.security_deposit}</span>
          <label className="text-gray-600">Phí vệ sinh</label>
          <span>${booking.place.cleaning_fee}</span>
          <hr className="border-1"></hr>
          <hr className="border-1"></hr>
          <label className="text-gray-600">Tổng</label>
          <span>${booking.price}</span>
          <hr className="border-2"></hr>
          <hr className="border-2"></hr>
          <label className="text-gray-600">Phương thức thanh toán</label>
          <span>{booking.payment_type}</span>
          <label className="text-gray-600">Người thanh toán</label>
          <span>{booking.customer}</span>
          <label className="text-gray-600">Số điện thoại</label>
          <span>{booking.phone_number}</span>
        </div>
      </div>
    </div>
  );
}
