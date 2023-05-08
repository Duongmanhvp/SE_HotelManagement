import React, { useContext } from "react";
import UserContext from "../../context/UserContext";
import LoginPage from "../../pages/customer/LoginPage";
import { Navigate, Outlet } from "react-router-dom";

function RequiredAuth() {
  const [user] = useContext(UserContext);
  if (!user) {
    return <Navigate to={"/login"}></Navigate>;
  }
  return <Outlet></Outlet>;
}

export default RequiredAuth;
