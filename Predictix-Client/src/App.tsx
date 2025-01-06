import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend"; // For browser-based drag-and-drop
import LoginPage from "./components/Login/LoginPage";
import Dashboard from "./components/Dashboard/Dashboard";
import ProtectedRoute from "./components/Dashboard/ProtectedRoute";

export default function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Router>
        <Routes>
          {/* Login */}
          <Route path="/login" element={<LoginPage />} />

          {/* Protected Dashboard */}
          <Route
            path="/dashboard/*"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Default Path */}
          <Route path="*" element={<LoginPage />} />
        </Routes>
      </Router>
    </DndProvider>
  );
}
