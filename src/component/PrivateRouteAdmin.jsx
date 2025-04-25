// src/components/PrivateRouteAdmin.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRouteAdmin = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || user.vai_tro !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRouteAdmin;
