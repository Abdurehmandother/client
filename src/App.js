import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import InquiryForm from "./components/InquiryForm";
import AdminPanel from "./components/AdminPanel";
import Dashboard from "./components/Dashboard";
import BookingList from "./components/BookingList";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Login from "./components/Login";
import AdminRoute from "./AdminRoutes";
import PrivateRoute from "./privateRoute";

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

// Separate component so useLocation works properly
function AppContent() {
  const location = useLocation();
  const userData = localStorage.getItem("userData");
  const isAdmin = userData ? JSON.parse(userData) : null;
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div className="bg-light">
      {/* Only show Navbar if NOT on admin route and user is not admin */}
      {!isAdminRoute && !isAdmin?.user?.isAdmin && <Navbar />}

      <Routes>
        {isAdmin?.user?.isAdmin ? (
          <Route path="/" element={<AdminPanel />} />
        ) : (
          <Route path="/" element={<Dashboard />} />
        )}

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
  );
}

export default App;
