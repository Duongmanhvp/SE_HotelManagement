import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { deletePlace } from "../../api";

function RoomItem({ place }) {
  const [dropdown, setDropdown] = useState(false);
  const navigate = useNavigate();
  const handleDropdown = (e) => {
    e.stopPropagation();

    setDropdown(!dropdown);
  };
  const handleDetele = async () => {
    try {
      const res = await deletePlace(place._id);
      if (res.status === 200) {
        alert("Delete place success");
      }
    } catch (error) {
      alert("Delete failed");
    }
  };
  return (
    <tr
      className="relative border-b dark:border-neutral-500 cursor-pointer hover:bg-slate-100"
      onClick={() => {
        navigate(`/place/${place._id}`);
      }}
    >
      <td className="whitespace-nowrap px-6 py-4">{place._id}</td>
      <td className="whitespace-nowrap px-6 py-4">{place.name}</td>
      <td className="whitespace-nowrap px-6 py-4">${place.price}</td>
      <td className="whitespace-nowrap px-6 py-4">
        {place.availability ? (
          <span className="text-red-600">Not renting</span>
        ) : (
          <span className="text-green-600">Renting</span>
        )}
      </td>
      <td className="whitespace-nowrap  px-6 py-4">None</td>
      <td onClick={handleDropdown}>
        <BsThreeDotsVertical />
      </td>
      {dropdown && (
        <ul className="absolute top-full right-0 border-2 rounded-lg w-40 z-10 bg-white text-left text-base">
          <li
            onClick={() => {
              setDropdown(false);
            }}
            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <Link to={`/place/${place._id}`}>View details</Link>
          </li>
          <li
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setDropdown(false);
            }}
            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <Link to={`/place/${place._id}/update`}>Update room</Link>
          </li>
          <li
            onClick={() => {
              handleDetele();
              setDropdown(false);
            }}
            className="cursor-pointer block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 text-red-600"
          >
            Delete
          </li>
        </ul>
      )}
    </tr>
  );
}

export default RoomItem;
