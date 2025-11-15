import React from "react";
import { Link } from "react-router-dom";
import "./tenantsignup.css";

function TenantSignup() {
  return (

     <div className="signup-page"> 
        


    {/*<div className="signup-page">*/}
      <div className="signup-card">
        <h2>Create Account</h2>
        <p className="subtitle">Sign up to start managing your properties</p>

        <label>Full Name</label>
        <input type="text" />

        <label>Email</label>
        <input type="email" />

        <label>Phone Number</label>
        <input type="text"  />

        <label>Password</label>
        <input type="password" />

        <label>Confirm Password</label>
        <input type="password" />

        <button className="signup-btn">Create Account</button>

        <p className="signin-link">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}

export default TenantSignup;