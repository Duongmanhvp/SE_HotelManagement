import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import UserContext from "../../context/UserContext";

function RequiredAuth() {
  const [user] = useContext(UserContext);
  if (!user) {
    return <Navigate to={"/login"}></Navigate>;
  }
  return <Outlet></Outlet>;
}

export default RequiredAuth;
