import axios from "axios";
import { useContext, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import AccountNav from "../AccountNav";
import PlacesPage from "./PlacesPage";

export default function ProfilePage() {
  const [redirect, setRedirect] = useState(null);

  async function logout() {
    setRedirect("/");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }
  return (
    <div>
      <AccountNav />
      {localStorage.getItem("name") && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {localStorage.getItem("name")} (
          {localStorage.getItem("email")})<br />
          <button onClick={logout} className="primary max-w-sm mt-2">
            Logout
          </button>
        </div>
      )}
      {!localStorage.getItem("name") && <PlacesPage />}
    </div>
  );
}
