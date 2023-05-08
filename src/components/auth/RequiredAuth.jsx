import React, { useContext } from "react";
import UserContext from "../../context/UserContext";
import { Navigate, Outlet } from "react-router-dom";

function RequiredAuth() {
  const [user] = useContext(UserContext);
  if (user) {
    return <Outlet></Outlet>;
  }
  return <Navigate to={"/login"}></Navigate>;
}

export default RequiredAuth;
