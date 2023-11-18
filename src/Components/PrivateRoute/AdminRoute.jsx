import React from "react";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const UserData = JSON.parse(localStorage.getItem("yourInfo"));

  if (UserData?.role == "super-admin" && UserData?.emailVerified != false) {
    return children;
  }
  return <Navigate to="/adminResidence" />;
};

export default AdminRoute;
