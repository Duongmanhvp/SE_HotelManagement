import React, { useState } from "react";
import { FiFilter } from "react-icons/fi";
import { useNavigate, createSearchParams } from "react-router-dom";
import { BiMap, BiCalendarAlt, BiSearch } from "react-icons/bi";
import { MdOutlineConfirmationNumber } from "react-icons/md";
import { getPlacesByQuery } from "../../api";

function SearchBar({ setPlaces }) {
  const [query, setQuery] = useState({});
  const navigate = useNavigate();
  function handleInputChange(event) {
    setQuery({
      ...query,
      [event.target.name]: event.target.value,
    });
  }
  function handleSubmit(event) {
    event.preventDefault();
    getPlacesByQuery(query)
      .then((res) => setPlaces(res.data))
      .catch((err) => console.log(err));
    navigate({
      pathname: "/",
      search: `?${createSearchParams(query)}`,
    });
  }
  return (
    <div className="searchbar fixed top-20 left-0 bottom-0 w-[352px] py-6 pl-3 pr-5 hover:pr-3 overflow-hidden">
      <form onSubmit={handleSubmit}>
        <div className="bg-gray-200 px-4 py-8 rounded-3xl flex flex-col items-center">
          <div className="flex items-center gap-2">
            <FiFilter size={24}></FiFilter>
            <h2 className="text-lg font-bold">Tìm kiếm khách sạn</h2>
          </div>
          <div className="mt-8 w-full">
            <label className="text-lg font-medium flex gap-1 items-center">
              <BiMap size={26}></BiMap>Địa điểm
            </label>
            <div className="mt-1">
              <h3>Quốc gia</h3>
              <input
                onChange={handleInputChange}
                type={"text"}
                placeholder="Ex: Viet Nam"
                name="country"
              ></input>
            </div>
            <div className="mt-2">
              <h3>Thành phố</h3>
              <input
                onChange={handleInputChange}
                type={"text"}
                placeholder="Ex: Ha Noi"
                name="city"
              ></input>
            </div>
          </div>
          <hr className="border-1 my-4"></hr>
          <div className="mt-6 w-full">
            <label className="text-lg font-medium flex gap-1 items-center">
              <BiCalendarAlt size={26}></BiCalendarAlt>Thời gian
            </label>
            <div className="mt-1">
              <h3>Check-in</h3>
              <input
                onChange={handleInputChange}
                type={"date"}
                name="checkin"
              ></input>
            </div>
            <div className="mt-2">
              <h3>Check-out</h3>
              <input
                onChange={handleInputChange}
                type={"date"}
                name="checkout"
              ></input>
            </div>
          </div>
          <hr className="border-1 my-4"></hr>
          <div className="mt-6">
            <label className="text-lg font-medium flex gap-1 items-center">
              <MdOutlineConfirmationNumber
                size={26}
              ></MdOutlineConfirmationNumber>
              Số lượng
            </label>
            <div className="flex items-center justify-between gap-16 ">
              <label>Khách</label>

              <input
                onChange={handleInputChange}
                type={"text"}
                placeholder="1"
                name="guests"
              ></input>
            </div>
            <div className="flex items-center justify-between gap-16">
              <label>Phòng</label>

              <input
                onChange={handleInputChange}
                type={"text"}
                placeholder="1"
                name="rooms"
              ></input>
            </div>
          </div>
          <button
            type="submit"
            className="py-2 bg-primary/80 hover:bg-primary text-white rounded-3xl text-lg mt-8 duration-200 w-full flex gap-1 items-center justify-center"
          >
            <BiSearch size={26}></BiSearch>Tìm kiếm
          </button>
        </div>
      </form>
    </div>
  );
}

export default SearchBar;
