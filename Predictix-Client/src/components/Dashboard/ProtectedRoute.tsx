import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const isAuthenticated = !!localStorage.getItem("authToken"); 
  return isAuthenticated ? children : <Navigate to="/login" />;
}
