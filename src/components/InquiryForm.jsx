import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const InquiryForm = () => {
  const navigate = useNavigate();
  const [quote, setQuote] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    fromAddress: "",
    toAddress: "",
    movingDate: "",
    items: "",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Get stored user token
      const stored = localStorage.getItem("userData");
      const token = stored ? JSON.parse(stored).token : null;

      console.log("👉 Token being sent:", token); // Debug log to check token presence

      const res = await axios.post(
        "http://localhost:5000/api/inquiries",
        formData,
        {
          headers: {
            "access-token": token, // Make sure header key matches backend middleware expectation
          },
        }
      );

      setSuccess("Inquiry submitted successfully!");
      setError("");
      setFormData({
        name: "",
        phone: "",
        fromAddress: "",
        toAddress: "",
        movingDate: "",
        items: "",
      });
      navigate("/");
    } catch (err) {
      console.error("Submission Error:", err);
      setError(
        err.response?.data?.error || "Something went wrong. Please try again."
      );
      setSuccess("");
    }
  };

  const handleGetQuote = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/inquiries/quote",
        {
          items: formData.items,
          fromAddress: formData.fromAddress,
          toAddress: formData.toAddress,
        }
      );
      setQuote(res.data.estimate);
    } catch (err) {
      setQuote("Error generating quote");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Moving Inquiry Form</h2>
      <form onSubmit={handleSubmit} className="shadow p-4 rounded bg-light">
        {success && <div className="alert alert-success">{success}</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Phone Number</label>
          <input
            name="phone"
            className="form-control"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">From Address</label>
          <input
            name="fromAddress"
            className="form-control"
            value={formData.fromAddress}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">To Address</label>
          <input
            name="toAddress"
            className="form-control"
            value={formData.toAddress}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Moving Date</label>
          <input
            type="date"
            name="movingDate"
            className="form-control"
            value={formData.movingDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Items to Move</label>
          <textarea
            name="items"
            className="form-control"
            rows="3"
            value={formData.items}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="button"
          onClick={handleGetQuote}
          className="btn btn-secondary w-100 mb-3"
        >
          Get Estimate
        </button>

        {quote && (
          <div className="alert alert-info text-center">
            Estimated Price: <strong>£{quote}</strong>
          </div>
        )}

        <button type="submit" className="btn btn-primary w-100">
          Submit Inquiry
        </button>
      </form>
    </div>
  );
};

export default InquiryForm;
