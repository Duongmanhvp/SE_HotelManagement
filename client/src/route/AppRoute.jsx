import React from "react";
import { Route, Routes } from "react-router-dom";
import RequiredAuth from "../components/customer/RequiredAuth";
import AdminLayout from "../layout/AdminLayout";
import Layout from "../layout/Layout";
import AdminPage from "../pages/admin/AdminPage";
import CustomersDetail from "../pages/admin/CustomersDetail";
import CustomersPage from "../pages/admin/CustomersPage";
import OrdersPage from "../pages/admin/OrdersPage";
import Rooms from "../pages/admin/Rooms";
import BookingPage from "../pages/customer/BookingPage";
import BookingsPage from "../pages/customer/BookingsPage";
import IndexPage from "../pages/customer/IndexPage.jsx";
import LoginPage from "../pages/customer/LoginPage";
import PaymentPage from "../pages/customer/PaymentPage";
import PlacePage from "../pages/customer/PlacePage";
import PlacesPage from "../pages/customer/PlacesPage";
import ProfilePage from "../pages/customer/ProfilePage.jsx";
import RegisterPage from "../pages/customer/RegisterPage";
import DeniedAccessPage from "../pages/error/DeniedAccessPage";
import NotFoundPage from "../pages/error/NotFoundPage";
import LangdingPage from "../pages/landing/LangdingPage";
import NewRoom from "../pages/admin/NewRoom";
import ProfileUpdate from "../pages/customer/ProfileUpdate";
import ChangePassword from "../pages/customer/ChangePassword";

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
          <Route path="/account/bookings" element={<BookingsPage />} />
          <Route
            path="/account/bookings/:bookingId"
            element={<BookingPage />}
          />
          <Route
            path="/account/update"
            element={<ProfileUpdate></ProfileUpdate>}
          ></Route>
          <Route
            path="/account/password"
            element={<ChangePassword></ChangePassword>}
          ></Route>
          <Route
            path="/account/bookings/payment"
            element={<PaymentPage></PaymentPage>}
          ></Route>
        </Route>
        <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>
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
        <Route path="rooms/new" element={<NewRoom></NewRoom>}></Route>

        <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>
      </Route>
    </Routes>
  );
}

export default AppRoute;
