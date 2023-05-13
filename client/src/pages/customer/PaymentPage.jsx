import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { sendPayment } from "../../api";
import UserContext from "../../context/UserContext";

function PaymentPage() {
  const [payment, setPayment] = useState({ paymentMethod: "checkin" });
  const navigate = useNavigate();
  const location = useLocation();
  const [user] = useContext(UserContext);
  if (location.state?.place) {
    navigate("/");
  }
  const {
    place,
    corePrice,
    securityDeposit,
    cleaningFee,
    totalPrice,
    checkIn,
    checkOut,
    numberOfGuests,
  } = location.state;

  const handleChange = (e) => {
    setPayment({
      ...payment,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const _payment = {
      place: {
        _id: place._id,
        thumbnail: place.images.picture_url,
        name: place.name,
        address: place.address.street,
        price: place.price.$numberDecimal,
      },
      userId: user._id,
      checkIn,
      checkOut,
      guests: numberOfGuests,
      price: {
        corePrice,
        securityDeposit,
        cleaningFee,
        totalPrice,
      },
      paymentType: payment.paymentMethod,
      payerName: payment.name,
      payerPhone: payment.phone,
    };
    try {
      const res = await sendPayment(_payment);
      alert("Paying success!");
      const paymentId = res.data._id;
      navigate(`/account/bookings/${paymentId}`);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="w-[40%] m-auto px-12 py-8 bg-primary/30 rounded-3xl mt-8">
      <h2 className="text-center text-3xl font-bold">Payment Details</h2>
      <form className="mt-8" onSubmit={handleSubmit}>
        <div>
          <h2 className="text-2xl font-semibold">Customer information</h2>
          <div className="mt-2">
            <div>
              <label className="text-gray-600 mb-2 font-semibold">Name</label>
              <input
                type={"text"}
                name="name"
                onChange={handleChange}
                placeholder="Ex: Nguyen Van A"
                required
              ></input>
            </div>
            <div>
              <label className="text-gray-600 mb-2 font-semibold">Phone</label>
              <input
                type="number"
                name="phone"
                onChange={handleChange}
                placeholder="+(x)xxxx xxx xxx"
                required
              ></input>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mt-8">Payment information</h2>
          <div className="mt-2">
            <fieldset className="flex items-center justify-start gap-12">
              <label className="text-gray-600 mb-2 font-semibold">
                Payment type
              </label>
              <div className="flex justify-center gap-12 items-center ">
                <div>
                  <input
                    type={"radio"}
                    name="paymentMethod"
                    value="checkin"
                    onClick={handleChange}
                    checked={payment.paymentMethod === "checkin"}
                  ></input>
                  <label className="text-gray-900 ml-2 font-semibold">
                    Pay when check-in
                  </label>
                </div>
                <div>
                  <input
                    type={"radio"}
                    name="paymentMethod"
                    value="card"
                    checked={payment.paymentMethod === "card"}
                    onClick={handleChange}
                  ></input>
                  <label className="text-gray-900 ml-2 font-semibold">
                    Pay on card
                  </label>
                </div>
              </div>
            </fieldset>
            {payment.paymentMethod === "card" && (
              <div>
                <div className="mt-4">
                  <label className="text-gray-600 mb-2 font-semibold">
                    Credit Card Number
                  </label>
                  <input
                    type="number"
                    name="credit"
                    onChange={handleChange}
                    minLength={"16"}
                    maxLength="16"
                    placeholder="xxxx xxxx xxxx xxxx"
                    required
                  ></input>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex flex-col">
                    <label className="text-gray-600 font-semibold">
                      Expiry Date
                    </label>
                    <input
                      type={"date"}
                      name="expiryDate"
                      onChange={handleChange}
                      required
                    ></input>
                  </div>
                  <div>
                    <label className="text-gray-600 mb-2 font-semibold">
                      CVV
                    </label>
                    <input
                      type={"number"}
                      name="cvv"
                      onChange={handleChange}
                      minLength="3"
                      maxLength="6"
                      placeholder="xxx (xxx)"
                      required
                    ></input>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </form>
      <div className="text-center">
        <button
          type="submit"
          onClick={handleSubmit}
          className="px-12 py-3 bg-primary/80 hover:bg-primary duration-200 text-white mt-8 rounded-3xl"
        >
          Make payment with ${totalPrice}
        </button>
      </div>
    </div>
  );
}

export default PaymentPage;
