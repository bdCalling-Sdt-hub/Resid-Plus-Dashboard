import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const UserData = JSON.parse(localStorage.getItem("yourInfo"));

  console.log(UserData);

  if (
    UserData?.approved != false &&
    UserData?.isBanned == "false" &&
    UserData?.emailVerified != false &&
    UserData?.role == "admin"
  ) {
    return children;
  } else {
    return <Navigate to="/signin" />;
  }
};

export default PrivateRoute;
