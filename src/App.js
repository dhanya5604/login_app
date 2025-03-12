import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Invoice from "./pages/Invoice";
import Expenses from "./pages/Expenses";
import Settings from "./pages/Settings";
import Navbar from "./components/Navbar"; 
import "./styles/Login.css";

// Function to conditionally show/hide Navbar
function Layout() {
    const location = useLocation();
    const hideNavbar = location.pathname === "/login"; // Hide navbar on login page

    return (
        <>
            {!hideNavbar && <Navbar />} {/* Show Navbar only when NOT on login */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/invoice" element={<Invoice />} />
                <Route path="/expenses" element={<Expenses />} />
                <Route path="/settings" element={<Settings />} />
            </Routes>
        </>
    );
}

function App() {
    return (
        <Router>
            <Layout />
        </Router>
    );
}

export default App;
