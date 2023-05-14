import { differenceInCalendarDays } from "date-fns";
import formatISO from "date-fns/formatISO";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";
import { BsPencilSquare, BsCheckCircle } from "react-icons/bs";
import { updatePrice } from "../../api";

export default function BookingWidget({ place }) {
  const {
    maximum_nights,
    minimum_nights,
    guests_included,
    price,
    security_deposit,
    cleaning_fee,
  } = place;
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [user] = useContext(UserContext);
  const [change, setChange] = useState(false);
  const [newPrice, setNewPrice] = useState(price);
  const admin = user.role === "ADMIN";
  const navigate = useNavigate();

  let numberOfNights = 0;

  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }
  let validNight =
    numberOfNights <= +maximum_nights && numberOfNights >= +minimum_nights;
  let validGuest = numberOfGuests > 0 && numberOfGuests <= guests_included;
  let corePrice = numberOfNights * price;
  let securityDeposit = security_deposit || 0;
  let cleaningFee = cleaning_fee || 0;
  let totalPrice = +corePrice + +securityDeposit + +cleaningFee;

  function bookThisPlace(e) {
    if (!user) {
      navigate("/login");
    }
    e.preventDefault();
    if (checkIn && checkOut && validGuest && validNight) {
      navigate("/account/bookings/payment", {
        state: {
          place,
          corePrice,
          securityDeposit,
          cleaningFee,
          totalPrice,
          checkIn,
          checkOut,
          numberOfGuests,
        },
      });
    }
  }
  const handleUpdatePrice = async () => {
    try {
      await updatePrice(newPrice, place._id);
      setChange(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white shadow-lg px-8 py-12 rounded-2xl h-fit max-h-fit border-2 ">
      <div className="text-2xl text-center mb-8">
        {!admin && (
          <p>
            {" "}
            Price: <span className="font-semibold">${newPrice}</span>
          </p>
        )}
        {admin && !change && (
          <div className="flex items-center gap-2 justify-center">
            <p>
              {" "}
              Price: <span className="font-semibold">${newPrice}</span>
            </p>
            <span onClick={() => setChange(true)}>
              <BsPencilSquare className="cursor-pointer font-semibold"></BsPencilSquare>
            </span>
          </div>
        )}
        {admin && change && (
          <div className="flex items-center gap-2 justify-center text-base">
            <input
              type="number"
              placeholder="Enter new price"
              min={0}
              onChange={(e) => setNewPrice(e.target.value)}
            ></input>
            <span onClick={handleUpdatePrice}>
              <BsCheckCircle
                className="cursor-pointer font-semibold text-green-600 "
                size={24}
              ></BsCheckCircle>
            </span>
          </div>
        )}
      </div>
      <form>
        <div className="border rounded-2xl mt-4 mb-6">
          <div className="check-date">
            <div className="flex">
              <div className="py-3 px-4">
                <label className="font-semibold">Check in:</label>
                <input
                  type="date"
                  min={formatISO(Date.now(), { representation: "date" })}
                  max={
                    checkOut != ""
                      ? formatISO(new Date(checkOut), {
                          representation: "date",
                        })
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
            {checkIn && checkOut && !validNight && (
              <p className="text-red-600 small pb-3 px-4">
                Invalid night! Number of night must be between {minimum_nights}{" "}
                and {maximum_nights}.
              </p>
            )}
          </div>
          <div className="py-3 px-4 border-t">
            <label className="font-semibold">Number of guests:</label>
            <input
              type="number"
              value={numberOfGuests}
              min={1}
              max={guests_included}
              onChange={(ev) => setNumberOfGuests(ev.target.value)}
            />
            {numberOfGuests && !validGuest && (
              <p className="text-red-600 small pb-3 px-4">
                Invalid guest! Number of guest must be between 1 and{" "}
                {guests_included}.
              </p>
            )}
          </div>
        </div>
        {numberOfNights > 0 && (
          <div className="mt-6">
            <div className="flex justify-between items-center">
              <p className="">
                ${price} x {numberOfNights} đêm
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

        <button onClick={bookThisPlace} className="primary mt-6">
          Book this place
          <span className="font-bold">
            {numberOfNights > 0 && <span> ${totalPrice}</span>}
          </span>
        </button>
      </form>
    </div>
  );
}
