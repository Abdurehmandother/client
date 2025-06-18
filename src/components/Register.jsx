import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  console.log("object Test 1");
  const handleRegister = async (e) => {
    console.log("object Test 2");

    e.preventDefault();
    try {
      console.log("object Test 3");

      await axios.post("http://localhost:5000/api/user/register", formData);
      console.log("object Test 4");

      alert("Registered successfully!");
      navigate("/login");
    } catch (err) {
      alert("Registration failed!");
      console.error(err);
    }
  };

  return (
    <div className="container mt-5 col-md-6">
      <h3 className="mb-4">Register</h3>
      <form onSubmit={handleRegister}>
        <div className="mb-3">
          <label>Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>
        <button className="btn btn-primary w-100">Register</button>
      </form>
    </div>
  );
};

export default Register;
