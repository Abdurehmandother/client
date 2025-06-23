import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"; // <-- import Link

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/user/login",
        formData
      );
      const userData = {
        token: res.data.token,
        user: res.data.user,
      };
      const isAdmin = userData.user.isAdmin;
      setFormData(null);

      // Store under 'userData' key (not 'token')
      localStorage.setItem("userData", JSON.stringify(userData));
      alert("Login successful!");
      isAdmin ? navigate("/admin") : navigate("/");
    } catch (err) {
      alert("Login failed!");
      console.error(err);
    }
  };

  return (
    <div className="container mt-5 col-md-6">
      <h3 className="mb-4">Login</h3>
      <form onSubmit={handleLogin}>
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
        <button className="btn btn-success w-100">Login</button>
      </form>
      <p className="mt-3">
        New User?{" "}
        <Link to="/register" className="text-primary">
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;
