import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../CSS/PatientDashboard.css";

function PatientDashboard() {
  const [showManageDropdown, setShowManageDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowManageDropdown((prevState) => !prevState);
  };

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
            <Link to="/view-doctors">View & Find Doctors</Link>
          </li>
          <li className="dropdown">
            <span onClick={toggleDropdown} className="dropdown-toggle">
              Manage Appointments
            </span>
            {showManageDropdown && (
              <ul className="dropdown-menu">
                <li>
                  <Link to="/make-appointment">Make Appointment</Link>
                </li>
                <li>
                  <Link to="/update-appointment">Update Appointment</Link>
                </li>
                <li>
                  <Link to="/cancel-appointment">Cancel Appointment</Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <Link to="/payments">Payments</Link>
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
