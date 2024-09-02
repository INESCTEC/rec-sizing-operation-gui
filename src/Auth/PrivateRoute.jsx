import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const PrivateRoute = () => {
  const user = useAuth();
  if (!user || !user.token) return <Navigate to="/login" />;
  return <Outlet />;
};

export default PrivateRoute;