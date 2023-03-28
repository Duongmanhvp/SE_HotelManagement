import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllPlace } from "../../api/index.jsx";
import Footer from "../../components/customer/Footer.jsx";
import Image from "../../components/customer/Image.jsx";
import PlaceCard from "../../components/customer/PlaceCard.jsx";
import { _places } from "../../data/sampleData";
import { FiFilter } from "react-icons/fi";
import { BiMap, BiCalendarAlt, BiSearch } from "react-icons/bi";
import { MdOutlineConfirmationNumber } from "react-icons/md";

export default function IndexPage() {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    window.scrollTo(0, 0);
    getAllPlace()
      .then((res) => setPlaces(res.data))
      .catch((err) => setPlaces(_places));
  }, []);

  return (
    <div className="mt-8 grid grid-cols-[1fr,5fr] gap-6">
      <div className="bg-gray-200 px-4 pt-4 rounded-3xl flex flex-col items-center">
        <div className="flex items-center gap-2">
          <FiFilter size={24}></FiFilter>
          <h2 className="text-lg font-bold">Tìm kiếm khách sạn</h2>
        </div>
        <div className="mt-8">
          <label className="text-lg font-medium flex gap-1 items-center">
            <BiMap size={26}></BiMap>Địa điểm
          </label>
          <div className="mt-1">
            <h3>Quốc gia</h3>
            <input type={"text"} placeholder="Ex: Viet Nam"></input>
          </div>
          <div className="mt-2">
            <h3>Thành phố</h3>
            <input type={"text"} placeholder="Ex: Ha Noi"></input>
          </div>
        </div>
        <hr className="border-1 my-4"></hr>
        <div className="mt-6 w-full">
          <label className="text-lg font-medium flex gap-1 items-center">
            <BiCalendarAlt size={26}></BiCalendarAlt>Thời gian
          </label>
          <div className="mt-1">
            <h3>Check-in</h3>
            <input type={"date"}></input>
          </div>
          <div className="mt-2">
            <h3>Check-out</h3>
            <input type={"date"}></input>
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

            <input type={"text"} placeholder="1"></input>
          </div>
          <div className="flex items-center justify-between gap-16">
            <label>Phòng</label>

            <input type={"text"} placeholder="1"></input>
          </div>
        </div>
        <button className="py-2 bg-primary/80 hover:bg-primary text-white rounded-3xl text-lg mt-8 duration-200 w-full flex gap-1 items-center justify-center">
          <BiSearch size={26}></BiSearch>Tìm kiếm
        </button>
      </div>
      <div className="grid gap-x-6 gap-y-8 xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {places.length > 0 &&
          places.map((place) => (
            <Link to={"/place/" + place._id}>
              <PlaceCard place={place}></PlaceCard>
            </Link>
          ))}
      </div>
    </div>
  );
}
