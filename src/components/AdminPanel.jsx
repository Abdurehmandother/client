import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaClipboardList, FaCheckCircle, FaTrashAlt, FaPlusCircle } from "react-icons/fa";

const AdminPanel = () => {
  const [inquiries, setInquiries] = useState([]);
  const [bookings, setBookings] = useState([]);

  const fetchInquiries = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/inquiries");
      setInquiries(res.data);
    } catch (err) {
      console.error("Error fetching inquiries:", err);
    }
  };

  const fetchBookings = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/bookings/all");
      setBookings(response.data);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    }
  };

  useEffect(() => {
    fetchInquiries();
    fetchBookings();
  }, []);

  const handleBook = async (inquiry) => {
    try {
      await axios.post("http://localhost:5000/api/bookings", {
        id: inquiry._id,
        name: inquiry.name,
        email: inquiry.email,
        phone: inquiry.phone,
        fromAddress: inquiry.fromAddress,
        toAddress: inquiry.toAddress,
        items: inquiry.items,
        movingDate: inquiry.movingDate,
        quote: inquiry.quote || 0,
      });
      alert("✅ Booking created successfully!");
      fetchBookings();
      fetchInquiries(); // remove inquiry from list
    } catch (err) {
      console.error(err);
      alert("❌ Failed to create booking.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this inquiry?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/inquiries/${id}`);
      alert("🗑️ Inquiry deleted successfully!");
      fetchInquiries();
    } catch (err) {
      console.error(err);
      alert("❌ Failed to delete inquiry.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">📨 Admin Dashboard</h2>

      {/* Stat boxes */}
      <div className="row mb-4 text-center">
        <div className="col-md-6 mb-3 mb-md-0">
          <div className="card shadow-sm bg-info text-white">
            <div className="card-body">
              <FaClipboardList size={40} className="mb-2" />
              <h5>Total Inquiries</h5>
              <h3>{inquiries.length}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card shadow-sm bg-success text-white">
            <div className="card-body">
              <FaCheckCircle size={40} className="mb-2" />
              <h5>Completed Bookings</h5>
              <h3>{bookings.length}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Inquiry Table */}
      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>From</th>
              <th>To</th>
              <th>Items</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center">No inquiries found.</td>
              </tr>
            ) : (
              inquiries.map((inq) => (
                <tr key={inq._id}>
                  <td>{inq.name}</td>
                  <td>{inq.email}</td>
                  <td>{inq.phone}</td>
                  <td>{inq.fromAddress}</td>
                  <td>{inq.toAddress}</td>
                  <td>{inq.items}</td>
                  <td>{new Date(inq.movingDate).toLocaleDateString()}</td>
                  <td className="d-flex">
                    <button
                      className="btn btn-sm btn-success me-2"
                      title="Book"
                      onClick={() => handleBook(inq)}
                    >
                      <FaPlusCircle /> Book
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      title="Delete"
                      onClick={() => handleDelete(inq._id)}
                    >
                      <FaTrashAlt /> Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPanel;
