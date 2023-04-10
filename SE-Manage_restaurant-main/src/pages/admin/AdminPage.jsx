import React from "react";
import Header from "../../components/admin/Header";
import TopCards from "../../components/admin/TopCards";
import BarChart from "../../components/admin/BarChart";
import RecentOrders from "../../components/admin/RecentOrders";

function AdminPage() {
  return (
    <main className="bg-gray-100 min-h-screen">
      <Header />
      <TopCards />
      <div className="p-4 grid md:grid-cols-3 grid-cols-1 gap-4">
        <BarChart />
        <RecentOrders />
      </div>
    </main>
  );
}

export default AdminPage;
