import Header from "../components/landing/Header";
import { Outlet } from "react-router-dom";
import Footer from "../components/customer/Footer";

export default function Layout() {
  return (
    <div className="py-4 px-8 flex flex-col min-h-screen mx-auto mt-20 bg-gray-100">
      <Header />
      <Outlet />
      <Footer></Footer>
    </div>
  );
}
