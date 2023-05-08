import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../components/admin/Sidebar";
import UserContext from "../context/UserContext";

function AdminLayout() {
  const [user] = useContext(UserContext);
  if (!user) {
    return <Navigate to={"/login"}></Navigate>;
  }
  if (user.role !== "ADMIN") {
    return <Navigate to={"/denied"}></Navigate>;
  }
  return (
    <div className="flex">
      <Sidebar></Sidebar>
      <main className="ml-20 w-full">
        <Outlet></Outlet>
      </main>
    </div>
  );
}

export default AdminLayout;
