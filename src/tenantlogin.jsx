







/*
import React from "react";
import { Link } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";

import "./tenantlogin.css";

function TenantLogin() {

            const navigate = useNavigate();

  const handleLogin = () => {
    // you can add validation later
    navigate("/dashboard");
  };
  return (
    <div className="page">
      {/* Top Navbar *//*}/*
      <div className="navbar">
        <div className="logo">RentEase</div>
        <div className="reload">⟳</div>
      </div>

      {/* Login Box *//*}/*
      <div className="login-card">
        <h2>Welcome Back</h2>
        <p className="subtitle">Sign in to your landlord account</p>

        <label>Email</label>
        <input type="email"  />

        <label>Password</label>
        <input type="password" />

        <button className="login-btn">Sign In</button>

        <p className="signup-text">
          Don’t have an account?{" "}
          <Link to="/signup" className="signup-link">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default TenantLogin;


*/



import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./tenantlogin.css";

function TenantLogin() {

  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/dashboard");
  };

  return (
    <div className="page">
      {/* Top Navbar */}
      <div className="navbar">
        <div className="logo">RentEase</div>
        <div className="reload">⟳</div>
      </div>

      {/* Login Box */}
      <div className="login-card">
        <h2>Welcome Back</h2>
        <p className="subtitle">Sign in to your landlord account</p>

        <label>Email</label>
        <input type="email" />

        <label>Password</label>
        <input type="password" />

        <button className="login-btn" onClick={handleLogin}>
          Sign In
        </button>

        <p className="signup-text">
          Don’t have an account?{" "}
          <Link to="/signup" className="signup-link">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default TenantLogin;
