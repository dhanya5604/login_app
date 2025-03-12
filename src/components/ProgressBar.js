import React from "react";
import "../styles/ProgressBar.css";

const ProgressBar = ({ label, value, total, color }) => {
    const percentage = total > 0 ? (value / total) * 100 : 0; // Dynamic scaling

    return (
        <div className="progress-container">
            <div className="progress-label">
                <span>{label}: {value}</span>
                <span>{Math.round(percentage)}%</span>
            </div>
            <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${percentage}%`, backgroundColor: color }}></div>
            </div>
        </div>
    );
};

export default ProgressBar;
