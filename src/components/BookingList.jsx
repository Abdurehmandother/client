import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem("userData"));
        const token = userData?.token;

        if (!token) {
          console.error("No token found, please log in");
          navigate("/login");
          return;
        }

        const response = await axios.get("http://localhost:5000/api/bookings", {
          headers: {
            "access-token": token,
          },
        });

        setBookings(response.data);
      } catch (err) {
        console.error("Failed to fetch bookings", err);

        // If token is invalid or expired, redirect to login
        if (
          err.response &&
          (err.response.status === 401 || err.response.status === 403)
        ) {
          alert("Session expired or unauthorized, please log in again.");
          localStorage.removeItem("userData");
          navigate("/login");
        }
      }
    };

    fetchBookings();
  }, [navigate]);

  return (
    <div className="container mt-5">
      <h3>📦 Confirmed Bookings</h3>
      <table className="table table-bordered mt-3">
        <thead className="table-light">
          <tr>
            <th>Name</th>
            <th>From</th>
            <th>To</th>
            <th>Items</th>
            <th>Moving Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b._id}>
              <td>{b.name}</td>
              <td>{b.fromAddress}</td>
              <td>{b.toAddress}</td>
              <td>{b.items}</td>
              <td>{new Date(b.movingDate).toLocaleDateString()}</td>
              <td>{b.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingList;
