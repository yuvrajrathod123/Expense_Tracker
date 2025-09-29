import { useState } from "react";
import { Link } from "react-router-dom";


export default function Login({ onLogin }) {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(formData);
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
