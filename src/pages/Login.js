import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css"; // Ensure this path is correct

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        // ✅ Redirect to Home if already logged in
        if (localStorage.getItem("isLoggedIn")) {
            navigate("/");
        }
    }, [navigate]);

    const handleLogin = () => {
        if (username && password) {
            localStorage.setItem("isLoggedIn", "true"); // ✅ Save login status
            navigate("/"); // Redirect to Home Page after login
        }
    };

    const handleCancel = () => {
        setUsername("");
        setPassword("");
    };

    return (
        <div className="login-wrapper">
            <div className="login-container">
                <h2>Login</h2>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div className="button-container">
                    <button
                        className={`login-btn ${!username || !password ? "disabled" : ""}`}
                        onClick={handleLogin}
                        disabled={!username || !password}
                    >
                        Login
                    </button>
                    <button className="cancel-btn" onClick={handleCancel}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
