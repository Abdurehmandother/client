import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InquiryForm from "./components/InquiryForm";
import AdminPanel from "./components/AdminPanel";
import Dashboard from "./components/Dashboard";
import BookingList from "./components/BookingList";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Login from "./components/Login";
import AdminRoute from "./AdminRoutes";
import PrivateRoute from "./privateRoute"; // 🆕

function App() {
  const storedUser = localStorage.getItem("userData");
  const user = storedUser ? JSON.parse(storedUser) : null;

  return (
    <Router>
      <div className="bg-light">
        {/* Show navbar only if not an admin */}
        {user ? !user?.user?.isAdmin && <Navbar /> : <Navbar />}

        <Routes>
          <Route path="/" element={<Dashboard />} />

          {/* 🔐 Protected Routes for logged-in users */}
          <Route
            path="/form"
            element={
              <PrivateRoute>
                <InquiryForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/bookings"
            element={
              <PrivateRoute>
                <BookingList />
              </PrivateRoute>
            }
          />

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* 🔒 Admin-only route */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminPanel />
              </AdminRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
