import React from "react";
import IndexPage from "../customer/IndexPage";
import { Link } from "react-router-dom";
import PlaceCard from "../../components/customer/PlaceCard";
import { _places } from "../../data/sampleData";
import { getAllPlace } from "../../api";
import { useState, useEffect } from "react";

function Rooms() {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    window.scrollTo(0, 0);
    getAllPlace()
      .then((res) => setPlaces(res.data))
      .catch((err) => setPlaces(_places));
  }, []);
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="flex justify-between px-4 pt-4">
        <h2 className="font-bold text-lg ">Thống kê phòng</h2>
        <h2>Welcome Back, Clint</h2>
      </div>
      <div className="px-4">
        <div className="mt-8 grid gap-x-6 gap-y-8 xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {places.length > 0 &&
            places.map((place) => (
              <Link to={"/place/" + place._id}>
                <PlaceCard place={place}></PlaceCard>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Rooms;
