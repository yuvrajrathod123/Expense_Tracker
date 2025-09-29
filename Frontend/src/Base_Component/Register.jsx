import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register({ onRegister }) {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const API = "https://miniature-rotary-phone-45vr9jg65vrhw9j-5000.app.github.dev"; // backend URL

               
  const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("Form data:", formData.name);

  try {
    const res = await axios.post(`${API}/auth/register`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(res.data);
    alert("✅ Registered successfully!");
  } catch (err) {
    console.error(err.response);
    alert("❌ " + (err.response?.data?.message || "Registration failed"));
  }
};




  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-gradient bg-success bg-opacity-75">
      <div className="card shadow-lg p-4" style={{ width: "400px" }}>
        <h2 className="text-center mb-3 fw-bold">Create Account</h2>
        <p className="text-muted text-center mb-4">
          Register to get started
        </p>

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

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

          {/* Register Button */}
          <button
            type="submit"
            className="btn btn-success w-100 fw-semibold"
          >
            Register
          </button>
        </form>

        {/* Extra Options */}
        <div className="d-flex justify-content-between mt-3">
            <Link to="/login" lassName="text-decoration-none"> Already have an account?</Link>
        
          <a href="#" className="text-decoration-none">
            Forgot Password?
          </a>
        </div>
      </div>
    </div>
  );
}
