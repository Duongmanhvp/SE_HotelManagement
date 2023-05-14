import React, { useState } from "react";
import { BsPersonFill, BsThreeDotsVertical } from "react-icons/bs";
import { Link } from "react-router-dom";

function CustomerItem({ customer, onclick }) {
  const [dropdown, setDropdown] = useState(false);

  const handleDropdown = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setDropdown(!dropdown);
  };

  return (
    <div className="relative">
      <Link to={`details`} state={customer}>
        <li
          key={customer._id}
          className=" bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer"
        >
          <div className="flex items-center">
            <div className="bg-blue1/10 p-3 rounded-lg">
              <BsPersonFill className="text-blue1" />
            </div>
            <p className="pl-4">{customer.name}</p>
          </div>
          <p className="text-gray-600 sm:text-left text-right">
            {customer.email}
          </p>
          <p className="hidden md:flex">{customer.phone}</p>
          <div className="sm:flex hidden justify-between items-center">
            <p>{customer.gender}</p>
            <div className="p-2" onClick={handleDropdown}>
              <BsThreeDotsVertical />
            </div>
          </div>
        </li>
      </Link>
      {dropdown && (
        <ul className="absolute top-full right-0 border-2 rounded-lg w-40 z-10 bg-white">
          <li
            onClick={() => {
              setDropdown(false);
            }}
            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <Link to={"details"} state={customer}>
              View Details
            </Link>
          </li>
          <li
            onClick={() => {
              onclick();
              setDropdown(false);
            }}
            className="cursor-pointer block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 text-red-600"
          >
            Delete
          </li>
        </ul>
      )}
    </div>
  );
}

export default CustomerItem;
