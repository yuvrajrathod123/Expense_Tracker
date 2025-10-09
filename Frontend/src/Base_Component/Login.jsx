import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // backend URL
  const API = "https://miniature-rotary-phone-45vr9jg65vrhw9j-5000.app.github.dev";


  const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("Form data:", formData.email);

  try {
    const res = await axios.post(`${API}/auth/login`, formData, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true, // important for HTTP-only cookie
    });

    localStorage.setItem("accessToken", res.data.accessToken);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    console.log(res.data);
    navigate('/');
  } catch (err) {
    console.error(err.response);
    alert("❌ " + (err.response?.data?.message || "login failed"));
  }
};

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-gradient bg-primary bg-opacity-75">
      <div className="card shadow-lg p-4" style={{ width: "400px" }}>
        <h2 className="text-center mb-3 fw-bold">Welcome Back</h2>
        <p className="text-muted text-center mb-4">
          Please login to your account
        </p>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Email address</label>
            <input
              type="email"
              name="email"
              placeholder="example@email.com"
              value={formData.email}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="btn btn-primary w-100 fw-semibold"
          >
            Login
          </button>
        </form>

        {/* Extra Options */}
        <div className="d-flex justify-content-between mt-3">
          <a href="#" className="text-decoration-none">
            Forgot Password?
          </a>
            <Link to="/register" lassName="text-decoration-none">Create Account</Link>
        </div>
      </div>
    </div>
  );
}
