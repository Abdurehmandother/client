import React from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  // Try to get user info from localStorage (adjust if you use context)
  const userStr = localStorage.getItem("userData");
  const user = userStr ? JSON.parse(userStr) : null;

  const handleLogout = () => {
    localStorage.removeItem("userData");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow w-100 px-3 m-0">
      <div className="d-flex justify-content-between align-items-center w-100">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            src="https://placehold.co/40x40"
            alt="Company Logo"
            className="me-2 rounded-circle"
            style={{ width: "40px", height: "40px" }}
          />
          <strong>QuickMove</strong>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/form">
                Inquiry Form
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/bookings">
                Bookings
              </Link>
            </li>

            {/* Auth Links */}
            {!user && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
              </>
            )}

            {user && (
              <>
                <li className="nav-item nav-link text-light">
                  Hello, {user.user.name || "User"}
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-sm btn-outline-light ms-2"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
