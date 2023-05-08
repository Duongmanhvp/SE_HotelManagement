import React from "react";
import { Route, Routes } from "react-router-dom";
import LangdingPage from "../pages/landing/LangdingPage";
import IndexPage from "../pages/customer/IndexPage.jsx";
import LoginPage from "../pages/customer/LoginPage";
import Layout from "../layout/Layout";
import RegisterPage from "../pages/customer/RegisterPage";
import ProfilePage from "../pages/customer/ProfilePage.jsx";
import PlacesPage from "../pages/customer/PlacesPage";
import PlacesFormPage from "../pages/customer/PlacesFormPage";
import PlacePage from "../pages/customer/PlacePage";
import BookingsPage from "../pages/customer/BookingsPage";
import BookingPage from "../pages/customer/BookingPage";
import PaymentPage from "../pages/customer/PaymentPage";
import AdminPage from "../pages/admin/AdminPage";
import AdminLayout from "../layout/AdminLayout";
import OrdersPage from "../pages/admin/OrdersPage";
import CustomersPage from "../pages/admin/CustomersPage";
import CustomersDetail from "../pages/admin/CustomersDetail";
import OrderDetail from "../pages/admin/OrderDetail";
import Rooms from "../pages/admin/Rooms";
import RequiredAuth from "../components/customer/RequiredAuth";
import DeniedAccessPage from "../pages/error/DeniedAccessPage";

function AppRoute() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          path="/denied"
          element={<DeniedAccessPage></DeniedAccessPage>}
        ></Route>
        <Route path="/home" element={<LangdingPage></LangdingPage>}></Route>
        <Route index element={<IndexPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/place/:placeId" element={<PlacePage />} />
        <Route path="/" element={<RequiredAuth></RequiredAuth>}>
          <Route path="/account" element={<ProfilePage />} />
          <Route path="/account/places" element={<PlacesPage />} />
          <Route path="/account/places/new" element={<PlacesFormPage />} />
          <Route path="/account/places/:id" element={<PlacesFormPage />} />
          <Route path="/account/bookings" element={<BookingsPage />} />
          <Route
            path="/account/bookings/:bookingId"
            element={<BookingPage />}
          />
          <Route
            path="/account/bookings/payment"
            element={<PaymentPage></PaymentPage>}
          ></Route>
        </Route>
      </Route>

      <Route path="/admin" element={<AdminLayout></AdminLayout>}>
        <Route index element={<AdminPage></AdminPage>}></Route>
        <Route path="orders" element={<OrdersPage></OrdersPage>}></Route>
        <Route
          path="customers"
          element={<CustomersPage></CustomersPage>}
        ></Route>
        <Route
          path="customers/details"
          element={<CustomersDetail></CustomersDetail>}
        ></Route>
        <Route
          path="orders/details/:bookingId"
          element={<BookingPage></BookingPage>}
        ></Route>
        <Route path="rooms" element={<Rooms></Rooms>}></Route>
      </Route>
    </Routes>
  );
}

export default AppRoute;
