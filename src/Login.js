import React from "react";
import "./Login.css";

const Login = () => {
  return (
    <div className="login-container">
      <h2>Login</h2>
      <form>
        <label>Email</label>
        <input type="email" placeholder="Enter your email" required />

        <label>Password</label>
        <input type="password" placeholder="Enter your password" required />

        <div className="button-group">
          <button type="submit">Submit</button>
          <button type="button" className="cancel">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
