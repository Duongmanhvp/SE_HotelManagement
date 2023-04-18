import { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import formatISO from "date-fns/formatISO";

export default function BookingWidget({ place }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);

  const [redirect, setRedirect] = useState("");

  let numberOfNights = 0;

  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }
  let corePrice = numberOfNights * place.price.$numberDecimal;
  let securityDeposit = place.security_deposit.$numberDecimal;
  let cleaningFee = place.cleaning_fee.$numberDecimal;
  let totalPrice = +corePrice + +securityDeposit + +cleaningFee;

  async function bookThisPlace() {
    const bookingId = 2;
    setRedirect(`/account/bookings/${bookingId}`);
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="bg-white shadow-lg px-8 py-12 rounded-2xl h-fit max-h-fit border-2 ">
      <div className="text-2xl text-center mb-8">
        Price:{" "}
        <span className="font-semibold">${place.price.$numberDecimal}</span>
      </div>
      <form>
        <div className="border rounded-2xl mt-4 mb-6">
          <div className="flex">
            <div className="py-3 px-4">
              <label className="font-semibold">Check in:</label>
              <input
                type="date"
                min={formatISO(Date.now(), { representation: "date" })}
                max={
                  checkOut != ""
                    ? formatISO(new Date(checkOut), { representation: "date" })
                    : ""
                }
                value={checkIn}
                onChange={(ev) => setCheckIn(ev.target.value)}
              />
            </div>
            <div className="py-3 px-4 border-l">
              <label className="font-semibold">Check out:</label>
              <input
                type="date"
                min={
                  checkIn != ""
                    ? formatISO(new Date(checkIn), { representation: "date" })
                    : ""
                }
                value={checkOut}
                disabled={checkIn == ""}
                onChange={(ev) => setCheckOut(ev.target.value)}
              />
            </div>
          </div>
          <div className="py-3 px-4 border-t">
            <label className="font-semibold">Number of guests:</label>
            <input
              type="text"
              value={numberOfGuests}
              min={1}
              pattern="/\d+/"
              max={place.accommodates.$numberInt}
              onChange={(ev) => setNumberOfGuests(ev.target.value)}
            />
          </div>
        </div>
        {numberOfNights > 0 && (
          <div className="mt-6">
            <div className="flex justify-between items-center">
              <p className="">
                ${place.price.$numberDecimal} x {numberOfNights} đêm
              </p>
              <p className="font-bold">${corePrice}</p>
            </div>
            <div className="flex justify-between items-center">
              <p>Phí an ninh</p>
              <p className="font-bold">${securityDeposit}</p>
            </div>
            <div className="flex justify-between items-center mb-2">
              <p>Phí vệ sinh</p>
              <p className="font-bold">${cleaningFee}</p>
            </div>
            <hr></hr>
            <div className="flex justify-between items-center font-semibold text-xl mt-4">
              <p className="">Tổng</p>
              <p>${totalPrice}</p>
            </div>
          </div>
        )}

        <Link to={"/account/bookings/payment"}>
          <button onClick={bookThisPlace} className="primary mt-6">
            Book this place
            <span className="font-bold">
              {numberOfNights > 0 && <span> ${totalPrice}</span>}
            </span>
          </button>
        </Link>
      </form>
    </div>
  );
}
