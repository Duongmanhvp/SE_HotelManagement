import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { add, format } from "date-fns";

export default function Header() {
  const [isSearching, setIsSearching] = useState(false);
  let days = [];
  for (let i = 1; i <= 31; i++) {
    days.push(i);
  }
  const [forms, setForms] = useState({
    duringday: 1,
    dayin: Date.now(),
  });
  function handleChange(event) {
    setForms({
      ...forms,
      [event.target.name]: event.target.value,
    });
  }
  let dayout = format(
    add(new Date(forms.dayin), {
      days: forms.duringday,
    }),
    "PPPP"
  );
  function handleSubmit() {
    //console.log(forms);
    setIsSearching(false);
  }
  return (
    <header
      className={`fixed top-0 left-0 right-0 bg-gray-200 px-8 z-30 h-20 overflow-hidden duration-300 ${
        isSearching ? "h-[420px]" : ""
      }`}
    >
      <div className="flex justify-between items-center h-20">
        <div className="flex-shrink-0 mr-4 text-primary hover:opacity-80 duration-200">
          {/* Logo */}
          <Link
            to="/home"
            className="flex justify-start items-center"
            aria-label="Cruip"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8 -rotate-90"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg>
            <p className="ml-3 font-bold text-2xl">Booking</p>
          </Link>
        </div>

        <div
          className="flex gap-2 border border-gray-300 rounded-full py-2 px-4 shadow-md hover:shadow-lg duration-200 shadow-gray-300 cursor-pointer"
          onClick={() => setIsSearching(!isSearching)}
        >
          <div>{forms.place || "Anywhere"}</div>
          <div className="border-l border-gray-300"></div>
          <div>
            {forms.dayin
              ? format(new Date(forms.dayin), "PPPP") + " - " + dayout
              : "Any week"}
          </div>
          <div className="border-l border-gray-300"></div>
          <div>{forms.guest || "Add guests"}</div>
          <button
            className="bg-primary text-white p-1 rounded-full"
            onClick={handleSubmit}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
        </div>

        <div className="flex justify-between items-center">
          <Link
            to={localStorage.getItem("name") ? "/account" : "/login"}
            className="flex items-center gap-2 border border-gray-500 rounded-full py-2 px-4 "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
            <div className="bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 relative top-1"
              >
                <path
                  fillRule="evenodd"
                  d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            {!!localStorage.getItem("name") && (
              <div>{localStorage.getItem("name")}</div>
            )}
          </Link>
          <Link to={"/admin"}>
            <button className="py-2 px-8 ml-4 outline-none rounded-3xl border-none bg-blue1 hover:opacity-80 duration-200 text-white ">
              Admin
            </button>
          </Link>
        </div>
      </div>

      <div className="m-auto w-2/3 p-8 shadow-xl border-t-2 border-gray-300">
        <div>
          <label className="font-bold">Thành phố, địa điểm khách sạn</label>
          <input
            type="text"
            className="outline-none"
            name="place"
            onChange={handleChange}
          ></input>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-3">
          <div>
            <label className="font-bold">Nhận phòng:</label>
            <input
              type="date"
              className="block p-2 w-full outline-none rounded-2xl"
              name="dayin"
              onChange={handleChange}
              defaultValue={format(new Date(), "yyyy")}
            ></input>
          </div>
          <div>
            <label className="font-bold">Số đêm:</label>
            <select
              className="block p-2 w-full outline-none rounded-2xl pr-4"
              name="duringday"
              onChange={handleChange}
            >
              {days.map((day) => (
                <option value={day}>{day} đêm</option>
              ))}
            </select>
          </div>
          <div>
            <label className="font-bold">Trả phòng:</label>
            <p className="font-bold mt-[6px]">{forms.dayin ? dayout : ""}</p>
          </div>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-4">
          <div>
            <label className="font-bold">Số lượng khách:</label>
            <input
              type="number"
              className="outline-none rounded-full"
              name="guest"
              onChange={handleChange}
            ></input>
          </div>
          <div>
            <label className="font-bold">Số lượng phòng:</label>
            <input
              type="number"
              className="outline-none"
              name="room"
              onChange={handleChange}
            ></input>
          </div>
          <button
            type="submit"
            className="rounded-2xl px-4 bg-primary  hover:shadow-lg font-bold duration-200 text-white mt-[26px] h-[42px]"
            onClick={handleSubmit}
          >
            Tìm khách sạn
          </button>
        </div>
      </div>
    </header>
  );
}
