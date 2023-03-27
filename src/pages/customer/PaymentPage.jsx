import React, { useState } from "react";
import { Link } from "react-router-dom";

function PaymentPage() {
  const [paymentMethod, setPaymentMethod] = useState("checkin");
  return (
    <div className="w-[40%] m-auto px-12 py-8 bg-primary/30 rounded-3xl mt-8">
      <h2 className="text-center text-3xl font-bold">Payment Details</h2>
      <form className="mt-8">
        <div>
          <h2 className="text-2xl font-semibold">Customer information</h2>
          <div className="mt-2">
            <div>
              <label className="text-gray-600 mb-2 font-semibold">Name</label>
              <input type={"text"} placeholder="Ex: Nguyen Van A"></input>
            </div>
            <div>
              <label className="text-gray-600 mb-2 font-semibold">Phone</label>
              <input type="number" placeholder="+(x)xxxx xxx xxx"></input>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mt-8">Payment information</h2>
          <div className="mt-2">
            <div className="flex items-center justify-start gap-12">
              <label className="text-gray-600 mb-2 font-semibold">
                Payment type
              </label>
              <div className="flex justify-center gap-12 items-center ">
                <div>
                  <input
                    type={"radio"}
                    value="checkin"
                    selected={paymentMethod == "checkin"}
                    onSelect={(e) => setPaymentMethod(e.target.value)}
                  ></input>
                  <label className="text-gray-900 ml-2 font-semibold">
                    Pay when check-in
                  </label>
                </div>
                <div>
                  <input
                    type={"radio"}
                    value="banking"
                    selected={paymentMethod == "banking"}
                    onSelect={(e) => setPaymentMethod(e.target.value)}
                  ></input>
                  <label className="text-gray-900 ml-2 font-semibold">
                    Pay on card
                  </label>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <label className="text-gray-600 mb-2 font-semibold">
                Credit Card Number
              </label>
              <input
                type="number"
                minLength={"16"}
                maxLength="16"
                placeholder="xxxx xxxx xxxx xxxx"
              ></input>
            </div>
            <div className="flex items-center justify-between mt-4">
              <div className="flex flex-col">
                <label className="text-gray-600 font-semibold">
                  Expiry Date
                </label>
                <input type={"date"}></input>
              </div>
              <div>
                <label className="text-gray-600 mb-2 font-semibold">CVV</label>
                <input
                  type={"number"}
                  minLength="3"
                  maxLength="6"
                  placeholder="xxx (xxx)"
                ></input>
              </div>
            </div>
          </div>
        </div>
      </form>
      <div className="text-center">
        <Link to={"/account/bookings/10006546"}>
          <button className="px-12 py-3 bg-primary/80 hover:bg-primary duration-200 text-white mt-8 rounded-3xl">
            Make payment
          </button>
        </Link>
      </div>
    </div>
  );
}

export default PaymentPage;
