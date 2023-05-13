import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllCustomer, getAllPlace } from "../../api";
import RoomItem from "../../components/admin/RoomItem";
import Header from "../../components/admin/Header";

function Rooms() {
  const [places, setPlaces] = useState();
  const [customer, setCustomer] = useState();
  useEffect(() => {
    window.scrollTo(0, 0);
    getAllPlace()
      .then((res) => setPlaces(res.data))
      .catch((err) => console.log(err));
    getAllCustomer()
      .then((res) => setCustomer(res.data))
      .catch((err) => console.log(err));
  }, []);
  if (!places || !customer) {
    return <p>Loading...</p>;
  }
  const rentingRooms = places.reduce((curr, place) => {
    if (!place.availability) {
      return curr + 1;
    } else {
      return curr;
    }
  }, 0);

  return (
    <>
      <Header pagename={"Rooms page"}></Header>
      <div className="grid lg:grid-cols-5 gap-4 p-4">
        <div className="lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg">
          <div className="flex flex-col w-full pb-4">
            <p className="text-2xl font-bold">{places.length}</p>
            <p className="text-gray-600">Số lượng phòng</p>
          </div>
        </div>
        <div className="lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg">
          <div className="flex flex-col w-full pb-4">
            <p className="text-2xl font-bold">{rentingRooms}</p>
            <p className="text-gray-600">Số lượng phòng đang được thuê</p>
          </div>
        </div>

        <div className="bg-white flex justify-between w-full border p-4 rounded-lg">
          <div className="flex flex-col w-full pb-4">
            <p className="text-2xl font-bold">{customer.length}</p>
            <p className="text-gray-600">Số lượng khách hàng</p>
          </div>
        </div>
      </div>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-4">
        <Link to="new">Add new room</Link>
      </button>
      <div className="px-4">
        <table className=" min-w-full text-center text-sm">
          <thead className="border-b bg-neutral-800 font-medium text-white dark:border-neutral-500 dark:bg-neutral-900">
            <tr>
              <th className="text-xl px-6 py-4">ID</th>
              <th className="text-xl px-6 py-4">Name</th>
              <th className="text-xl px-6 py-4">Price</th>
              <th className="text-xl px-6 py-4">Status</th>
              <th className="text-xl px-6 py-4">Last Renting</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="text-lg">
            {places.map((place) => (
              <RoomItem place={place}></RoomItem>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Rooms;
