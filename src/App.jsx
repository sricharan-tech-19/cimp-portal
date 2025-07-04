import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import Dashboard from "./pages/Dashboard";
import CreateClub from "./pages/CreateClub";
import ManageMembers from "./pages/ManageMembers";
import AssignRoles from "./pages/AssignRoles";
import Login from "./pages/login";
import PrivateRoute from "./components/PrivateRoute"; // ✅ import

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 p-6">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />

          {/* ✅ Protect routes here */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/create-club"
            element={
              <PrivateRoute>
                <CreateClub />
              </PrivateRoute>
            }
          />
          <Route
            path="/manage-members"
            element={
              <PrivateRoute>
                <ManageMembers />
              </PrivateRoute>
            }
          />
          <Route
            path="/assign-roles"
            element={
              <PrivateRoute>
                <AssignRoles />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
