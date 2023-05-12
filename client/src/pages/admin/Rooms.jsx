import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getAllCustomer, getAllPlace } from "../../api";

function Rooms() {
  const [places, setPlaces] = useState();
  const [customer, setCustomer] = useState();
  const navigate = useNavigate();
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
      <button className="">
        <Link to="new">Add new room</Link>
      </button>
      <table className=" min-w-full text-center text-sm">
        <thead className="border-b bg-neutral-800 font-medium text-white dark:border-neutral-500 dark:bg-neutral-900">
          <tr>
            <th className="text-xl px-6 py-4">ID</th>
            <th className="text-xl px-6 py-4">Name</th>
            <th className="text-xl px-6 py-4">Price</th>
            <th className="text-xl px-6 py-4">Status</th>
            <th className="text-xl px-6 py-4">Last Renting</th>
          </tr>
        </thead>
        <tbody className="text-lg">
          {places.map((place) => (
            <tr
              className="border-b dark:border-neutral-500 cursor-pointer hover:bg-slate-100"
              onClick={() => {
                navigate(`/place/${place._id}`);
              }}
            >
              <td className="whitespace-nowrap  px-6 py-4">{place._id}</td>
              <td className="whitespace-nowrap  px-6 py-4">{place.name}</td>
              <td className="whitespace-nowrap  px-6 py-4">${place.price}</td>
              <td className="whitespace-nowrap  px-6 py-4">
                {place.availability ? (
                  <span className="text-red-600">Not renting</span>
                ) : (
                  <span className="text-green-600">Renting</span>
                )}
              </td>
              <td className="whitespace-nowrap  px-6 py-4">None</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Rooms;
