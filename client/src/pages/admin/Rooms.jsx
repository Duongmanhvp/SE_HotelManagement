import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllCustomer, getAllPlace } from "../../api";
import RoomItem from "../../components/admin/RoomItem";
import Header from "../../components/admin/Header";
import { deletePlace } from "../../api";
import Loading from "../../components/customer/Loading";

function Rooms() {
  const [places, setPlaces] = useState();
  const [customer, setCustomer] = useState();
  const [selectId, setSelectId] = useState();
  const [overlay, setOverlay] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    getAllPlace()
      .then((res) => setPlaces(res.data))
      .catch((err) => console.log(err));
    getAllCustomer()
      .then((res) => setCustomer(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDetele = async () => {
    try {
      const res = await deletePlace(selectId);
      setOverlay(false);
      setPlaces(places.filter((p) => p._id !== selectId));
    } catch (error) {
      alert("Delete failed");
    }
  };

  if (!places || !customer) {
    return <Loading></Loading>;
  }
  const rentingRooms = places.reduce((curr, place) => {
    if (place.availability) {
      return curr + 1;
    } else {
      return curr;
    }
  }, 0);

  return (
    <>
      <div>
        <Header pagename={"Rooms page"}></Header>
        <div className="grid lg:grid-cols-5 gap-4 p-4">
          <div className="lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg">
            <div className="flex flex-col w-full pb-4">
              <p className="text-2xl font-bold">{places.length}</p>
              <p className="text-gray-600">Room number</p>
            </div>
          </div>
          <div className="lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg">
            <div className="flex flex-col w-full pb-4">
              <p className="text-2xl font-bold">{rentingRooms}</p>
              <p className="text-gray-600">Number of rooms being rented</p>
            </div>
          </div>

          <div className="bg-white flex justify-between w-full border p-4 rounded-lg">
            <div className="flex flex-col w-full pb-4">
              <p className="text-2xl font-bold">{customer.length}</p>
              <p className="text-gray-600">Customer number</p>
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

                <th></th>
              </tr>
            </thead>
            <tbody className="text-lg">
              {places.map((place) => (
                <RoomItem
                  place={place}
                  onclick={() => {
                    setOverlay(true);
                    setSelectId(place._id);
                  }}
                ></RoomItem>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {overlay && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-slate-300/40">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl px-8 py-4">
            <h2 className="text-xl font-semibold">
              Confirm to delete room. This action cannot rollback!
            </h2>
            <div className="flex items-center justify-between px-[10%] mt-6">
              <button
                onClick={handleDetele}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Delete
              </button>
              <button
                onClick={() => setOverlay(false)}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Rooms;
