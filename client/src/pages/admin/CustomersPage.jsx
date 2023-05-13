import React, { useEffect, useState } from "react";

import { getAllCustomer } from "../../api";
import CustomerItem from "../../components/admin/CustomerItem";
import Header from "../../components/admin/Header";

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
      <Header pagename={"Customers page"}></Header>
      <div className="p-4">
        <div className="w-full m-auto p-4 border rounded-lg bg-white">
          <div className="my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer">
            <span className="font-bold">Name</span>
            <span className=" font-bold sm:text-left text-right">Email</span>
            <span className="font-bold hidden md:grid">Phone</span>
            <span className="font-bold hidden sm:grid">Gender</span>
          </div>
          <ul>
            {customers.map((customer) => (
              <CustomerItem customer={customer}></CustomerItem>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CustomersPage;
