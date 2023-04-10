import { Route, Routes } from "react-router-dom";
import LangdingPage from "./pages/landing/LangdingPage";
import IndexPage from "./pages/customer/IndexPage.jsx";
import LoginPage from "./pages/customer/LoginPage";
import Layout from "./layout/Layout";
import RegisterPage from "./pages/customer/RegisterPage";
import ProfilePage from "./pages/customer/ProfilePage.jsx";
import PlacesPage from "./pages/customer/PlacesPage";
import PlacesFormPage from "./pages/customer/PlacesFormPage";
import PlacePage from "./pages/customer/PlacePage";
import BookingsPage from "./pages/customer/BookingsPage";
import BookingPage from "./pages/customer/BookingPage";
import HomeLayout from "./layout/HomeLayout";
import AdminPage from "./pages/admin/AdminPage";
import AdminLayout from "./layout/AdminLayout";
import ProductsPage from "./pages/admin/ProductsPage";
import CustomersPage from "./pages/admin/CustomersPage";
import CustomersDetail from "./pages/admin/CustomersDetail";
import OrderDetail from "./pages/admin/OrderDetail";
import Rooms from "./pages/admin/Rooms";
import PaymentPage from "./pages/customer/PaymentPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<IndexPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/account" element={<ProfilePage />} />
        <Route path="/account/places" element={<PlacesPage />} />
        <Route path="/account/places/new" element={<PlacesFormPage />} />
        <Route path="/account/places/:id" element={<PlacesFormPage />} />
        <Route path="/place/:id" element={<PlacePage />} />
        <Route path="/account/bookings" element={<BookingsPage />} />
        <Route path="/account/bookings/:id" element={<BookingPage />} />
        <Route
          path="/account/bookings/payment"
          element={<PaymentPage></PaymentPage>}
        ></Route>
        <Route path="/admin" element={<AdminPage></AdminPage>}></Route>
      </Route>
      <Route path="/home" element={<HomeLayout></HomeLayout>}>
        <Route index element={<LangdingPage></LangdingPage>}></Route>
      </Route>
      <Route path="/admin" element={<AdminLayout></AdminLayout>}>
        <Route index element={<AdminPage></AdminPage>}></Route>
        <Route path="orders" element={<ProductsPage></ProductsPage>}></Route>
        <Route
          path="customers"
          element={<CustomersPage></CustomersPage>}
        ></Route>
        <Route
          path="customers/:id"
          element={<CustomersDetail></CustomersDetail>}
        ></Route>
        <Route
          path="orders/orderdetails"
          element={<OrderDetail></OrderDetail>}
        ></Route>
        <Route path="rooms" element={<Rooms></Rooms>}></Route>
      </Route>
    </Routes>
  );
}

export default App;
