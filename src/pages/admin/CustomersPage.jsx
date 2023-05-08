import React, { useEffect, useState } from "react";
import { BsPersonFill, BsThreeDotsVertical } from "react-icons/bs";
import { adminData } from "../../data/sampleData";
import { Link } from "react-router-dom";
import { getAllCustomer } from "../../api";

function CustomersPage() {
  const [customers, setCustomers] = useState();
  useEffect(() => {
    getAllCustomer()
      .then((res) => setCustomers(res.data))
      .catch((err) => console.log(err));
  }, []);
  if (!customers) {
    return <p>Loading...</p>;
  }
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="flex justify-between p-4">
        <h2 className="font-bold text-lg ">Trang khách hàng</h2>
        <h2>Welcome Back, Clint</h2>
      </div>
      <div className="p-4">
        <div className="w-full m-auto p-4 border rounded-lg bg-white overflow-y-auto">
          <div className="my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer">
            <span className="font-bold">Name</span>
            <span className=" font-bold sm:text-left text-right">Email</span>
            <span className="font-bold hidden md:grid">Phone</span>
            <span className="font-bold hidden sm:grid">Gender</span>
          </div>
          <ul>
            {customers.map((customer) => (
              <Link to={`details`} state={customer}>
                <li
                  key={customer._id}
                  className="bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer"
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
                    <BsThreeDotsVertical />
                  </div>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CustomersPage;
