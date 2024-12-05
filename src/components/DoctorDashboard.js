import React from "react";
import { Link } from "react-router-dom";
import "../CSS/DoctorDashboard.css";

function DoctorDashboard() {
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Welcome, Doctor!</h1>
      </header>
      <nav className="dashboard-navbar">
        <ul>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/availability">Availability</Link>
          </li>
          <li>
            <Link to="/appointments">Appointments</Link>
          </li>
          <li>
            <Link to="/logout">Logout</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default DoctorDashboard;
