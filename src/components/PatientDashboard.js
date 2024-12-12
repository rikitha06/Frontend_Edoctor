import React from "react";
import { Link } from "react-router-dom";
import "../CSS/PatientDashboard.css";

function PatientDashboard() {
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Welcome, Patient!</h1>
      </header>
      <nav className="dashboard-navbar">
        <ul>
          <li>
            <Link to="/add-patient">Profile</Link>
          </li>
          <li>
            <Link to="/view-doctors">View Doctors</Link>
          </li>
          <li>
            <Link to="/make-appointment">Make Appointment</Link>
          </li>
          <li>
            <Link to="/">Logout</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default PatientDashboard;
