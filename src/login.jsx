/*
import React, { useState } from "react";
import "./login.css";

function Login() {  // <-- Component name must be capitalized
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      setMessage("All fields are required!");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }
    setMessage("Signup successful!");
    console.log("Form Data Submitted:", formData);
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
        <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} />
        <button type="submit">Sign Up</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default Login;  // <-- must match component name
*/






// src/login.jsx
import React from "react";
import "./Login.css";

const Login = () => {
  return (
    <div className="login-page">
      <div className="overlay">
        <div className="content">
          <h1 className="title">Welcome to RentHouse</h1>
          <h2 className="subtitle">Find your perfect home with ease</h2>
          <p className="info">Log in to continue managing your rental account.</p>

          <form className="login-form">
            <input
              type="email"
              placeholder="Email address"
              className="input-field"
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="input-field"
              required
            />
            <button type="submit" className="login-btn">
              Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;


