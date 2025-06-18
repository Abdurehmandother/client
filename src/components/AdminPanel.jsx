import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const navigate = useNavigate();
  const [inquiries, setInquiries] = useState([]);

  // 🟢 Function to convert inquiry into booking
  const handleBook = async (inquiry) => {
    try {
      const response = await axios.post("http://localhost:5000/api/bookings", {
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
    } catch (err) {
      console.error(err);
      alert("❌ Failed to create booking.");
    }
  };

  // 🔄 Fetch all inquiries from server
  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/inquiries");
        setInquiries(res.data);
      } catch (err) {
        console.error("Error fetching inquiries:", err);
      }
    };
    fetchInquiries();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">📨 Submitted Inquiries</h2>

      {inquiries.length === 0 ? (
        <p>No inquiries found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead className="thead-dark">
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
              {inquiries.map((inq) => (
                <tr key={inq._id}>
                  <td>{inq.name}</td>
                  <td>{inq.email}</td>
                  <td>{inq.phone}</td>
                  <td>{inq.fromAddress}</td>
                  <td>{inq.toAddress}</td>
                  <td>{inq.items}</td>
                  <td>{new Date(inq.movingDate).toLocaleDateString()}</td>
                  <td>
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => handleBook(inq)}
                    >
                      Book
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
