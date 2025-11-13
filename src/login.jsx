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









import React, { useState } from "react";
import "./Login.css";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className={`login-container ${isSignUp ? "sign-up-mode" : ""}`}>
      {/* 🔹 Sign In Form */}
      <div className="form-container sign-in-container">
        <form className="form">
          <h1>Sign In</h1>
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <a href="#">Forgot your password?</a>
          <button type="submit">Sign In</button>
        </form>
      </div>

      {/* 🔹 Sign Up Form */}
      <div className="form-container sign-up-container">
        <form className="form">
          <h1>Create Account</h1>
          <input type="text" placeholder="Name" required />
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <input type="phone number" placeholder="Phone Number" required />
          <button type="submit">Sign Up</button>
        </form>
      </div>

      {/* 🔹 Overlay Section (Purple) */}
      <div className="overlay-container">
        {isSignUp ? (
          // When in Sign-Up mode ➤ Show only "Sign In" side on the left
          <div className="overlay-panel">
            <h1>Welcome Back!</h1>
            <p>To keep connected with us please with your personal info</p>
            <button className="ghost" onClick={() => setIsSignUp(false)}>
              Sign In
            </button>
          </div>
        ) : (
          // When in Sign-In mode ➤ Show only "Sign Up" side
          <div className="overlay-panel">
            <h1>Welcome to RentHouse!</h1>
            <p>Log in to continue managing your rental account</p>
            <button className="ghost" onClick={() => setIsSignUp(true)}>
              Sign Up
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;


