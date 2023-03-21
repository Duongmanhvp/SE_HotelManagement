import { Route, Routes } from "react-router-dom";
import LangdingPage from "./pages/landing/LangdingPage";
import IndexPage from "./pages/IndexPage.jsx";
import LoginPage from "./pages/LoginPage";
import Layout from "./Layout";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage.jsx";
import PlacesPage from "./pages/PlacesPage";
import PlacesFormPage from "./pages/PlacesFormPage";
import PlacePage from "./pages/PlacePage";
import BookingsPage from "./pages/BookingsPage";
import BookingPage from "./pages/BookingPage";
import HomeLayout from "./HomeLayout";
import AdminPage from "./pages/admin/AdminPage";
import AdminLayout from "./AdminLayout";
import ProductsPage from "./pages/admin/ProductsPage";
import CustomersPage from "./pages/admin/CustomersPage";
import CustomersDetail from "./pages/admin/CustomersDetail";

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
        <Route path="/admin" element={<AdminPage></AdminPage>}></Route>
      </Route>
      <Route path="/home" element={<HomeLayout></HomeLayout>}>
        <Route index element={<LangdingPage></LangdingPage>}></Route>
      </Route>
      <Route path="/admin" element={<AdminLayout></AdminLayout>}>
        <Route index element={<AdminPage></AdminPage>}></Route>
        <Route path="products" element={<ProductsPage></ProductsPage>}></Route>
        <Route
          path="customers"
          element={<CustomersPage></CustomersPage>}
        ></Route>
        <Route
          path="customers/:id"
          element={<CustomersDetail></CustomersDetail>}
        ></Route>
      </Route>
    </Routes>
  );
}

export default App;
