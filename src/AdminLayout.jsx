import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./pages/admin/components/Sidebar";

function AdminLayout() {
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
