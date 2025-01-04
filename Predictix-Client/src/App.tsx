import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./components/Login/LoginPage";
import Dashboard from "./components/Dashboard/Dashboard";
import ProtectedRoute from "./components/Dashboard/ProtectedRoute";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Login */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Dashbord */}
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Default path*/}
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}
