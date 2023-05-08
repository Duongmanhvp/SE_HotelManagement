import React from "react";
import { Link, useNavigate } from "react-router-dom";
import PlaceCard from "../../components/customer/PlaceCard";
import { _places } from "../../data/sampleData";
import { getAllCustomer, getAllPlace } from "../../api";
import { useState, useEffect } from "react";

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
    // <div className="bg-gray-100 min-h-screen">p
    //   <div className="flex justify-between px-4 pt-4">
    //     <h2 className="font-bold text-lg ">Thống kê phòng</h2>
    //     <h2>Welcome Back, Clint</h2>
    //   </div>
    //   <div className="px-4">
    //     <div className="mt-8 grid gap-x-6 gap-y-8 xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    //       {places.length > 0 &&
    //         places.map((place) => (
    //           <Link to={"/place/" + place._id}>
    //             <PlaceCard place={place}></PlaceCard>
    //           </Link>
    //         ))}
    //     </div>
    //   </div>
    // </div>
    <>
      <div className="grid lg:grid-cols-5 gap-4 p-4">
        <div className="lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg">
          <div className="flex flex-col w-full pb-4">
            <p className="text-2xl font-bold">{places.length}</p>
            <p className="text-gray-600">Số lượng phòng</p>
          </div>
          {/* <p className="bg-blue2/30 flex justify-center items-center p-5 font-bold rounded-lg">
          <span className="text-blue3 text-lg">+18%</span>
        </p> */}
        </div>
        <div className="lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg">
          <div className="flex flex-col w-full pb-4">
            <p className="text-2xl font-bold">{rentingRooms}</p>
            <p className="text-gray-600">Số lượng phòng đang được thuê</p>
          </div>
          {/* <p className="bg-blue2/30 flex justify-center items-center p-5 font-bold rounded-lg">
          <span className="text-blue3 text-lg">+11%</span>
        </p> */}
        </div>

        <div className="bg-white flex justify-between w-full border p-4 rounded-lg">
          <div className="flex flex-col w-full pb-4">
            <p className="text-2xl font-bold">{customer.length}</p>
            <p className="text-gray-600">Số lượng khách hàng</p>
          </div>
          {/* <p className="bg-blue2/30 flex justify-center items-center p-5 font-bold rounded-lg">
          <span className="text-blue3 text-lg">+17%</span>
        </p> */}
        </div>
      </div>
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
            /* <Link to={`/place/${place._id}`} className="block"> */
            <tr
              className="border-b dark:border-neutral-500 cursor-pointer hover:bg-slate-100"
              onClick={() => {
                navigate(`/place/${place._id}`);
              }}
            >
              <td className="whitespace-nowrap  px-6 py-4">{place._id}</td>
              <td className="whitespace-nowrap  px-6 py-4">{place.name}</td>
              <td className="whitespace-nowrap  px-6 py-4">
                ${place.price.$numberDecimal}
              </td>
              <td className="whitespace-nowrap  px-6 py-4">
                {place.availability ? (
                  <span className="text-red-600">Not renting</span>
                ) : (
                  <span className="text-green-600">Renting</span>
                )}
              </td>
              <td className="whitespace-nowrap  px-6 py-4">None</td>
            </tr>
            /* </Link> */
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Rooms;
