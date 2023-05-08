import React, { useEffect, useState } from "react";
import Header from "../../components/admin/Header";
import TopCards from "../../components/admin/TopCards";
import BarChart from "../../components/admin/BarChart";
import RecentOrders from "../../components/admin/RecentOrders";
import { getMainStatistics } from "../../api";

function AdminPage() {
  const [statistics, setStatistics] = useState();
  useEffect(() => {
    getMainStatistics().then((res) => setStatistics(res.data));
  }, []);
  if (!statistics) {
    return <p>Loading...</p>;
  }
  const {
    currMonthRevenue,
    roomsNumber,
    customerNumber,
    lastweekPayments,
    recentPayments,
  } = statistics;
  return (
    <main className="bg-gray-100 min-h-screen">
      <Header />
      <TopCards
        currMonthRevenue={currMonthRevenue}
        customerNumber={customerNumber}
        roomsNumber={roomsNumber}
      />
      <div className="p-4 grid md:grid-cols-3 grid-cols-1 gap-4">
        <BarChart lastweekPayments={lastweekPayments} />
        <RecentOrders recentPayments={recentPayments} />
      </div>
    </main>
  );
}

export default AdminPage;
