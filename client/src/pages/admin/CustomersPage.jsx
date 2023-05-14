import React, { useEffect, useState } from "react";

import { getAllCustomer } from "../../api";
import CustomerItem from "../../components/admin/CustomerItem";
import Header from "../../components/admin/Header";
import { deleteUser } from "../../api";
import Loading from "../../components/customer/Loading";

function CustomersPage() {
  const [customers, setCustomers] = useState();
  const [selectId, setSelectId] = useState();
  const [overlay, setOverlay] = useState(false);
  useEffect(() => {
    getAllCustomer()
      .then((res) => setCustomers(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDetele = async () => {
    try {
      const res = await deleteUser(selectId);
      if (res.status === 200) {
        alert("Delete user success");
      }
      setOverlay(false);
      setCustomers(customers.filter((c) => c._id !== selectId));
    } catch (error) {
      alert("Delete failed");
    }
  };
  if (!customers) {
    return <Loading></Loading>;
  }
  return (
    <>
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
                <CustomerItem
                  customer={customer}
                  onclick={() => {
                    setOverlay(true);
                    setSelectId(customer._id);
                  }}
                ></CustomerItem>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {overlay && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-slate-300/40">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl px-8 py-4">
            <h2 className="text-xl font-semibold">
              Confirm to delete user. This action cannot rollback!
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

export default CustomersPage;
