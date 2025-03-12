import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/Navbar.css"; // Import the CSS file

const Navbar = () => {
    const navigate = useNavigate();

    // ✅ Check if user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn"); // ✅ Remove login status
        navigate("/login"); // Redirect to login page
    };

    // ✅ Hide Navbar if not logged in
    if (!isLoggedIn) return null;

    return (
        <nav className="navbar">
            <div className="nav-container">
                <h1 className="logo">Dashboard</h1>
                <ul className="nav-links">
                    <li><NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>Home</NavLink></li>
                    <li><NavLink to="/invoice" className={({ isActive }) => isActive ? "active" : ""}>Invoice</NavLink></li>
                    <li><NavLink to="/expenses" className={({ isActive }) => isActive ? "active" : ""}>Expenses</NavLink></li>
                    <li><NavLink to="/settings" className={({ isActive }) => isActive ? "active" : ""}>Settings</NavLink></li>
                </ul>
                <button className="logout-btn" onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
