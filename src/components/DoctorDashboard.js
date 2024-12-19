import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api"; // Assuming this is where your axios instance is stored
import "../CSS/DoctorDashboard.css";

function DoctorDashboard() {
  const [doctorName, setDoctorName] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch doctor's profile based on username stored in localStorage
  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username) {
      api
        .get(`/doctor/${username}/viewProfile`)
        .then((response) => {
          setDoctorName(response.data.name); // Assuming 'name' is the doctor's name from the response
        })
        .catch((error) => {
          console.error("Error fetching profile:", error);
          setDoctorName(null);
        })
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  // Logout function to clear localStorage and redirect
  const handleLogout = () => {
    localStorage.removeItem("username");
    navigate("/login"); // Redirect to login page or home
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Welcome{doctorName ? `, Dr. ${doctorName}` : " Doctor"}!</h1>
      </header>
      {isLoading ? (
        <p>Loading profile...</p>
      ) : (
        <nav className="dashboard-navbar">
          <ul>
            <li>
              <Link to="/doctor-profile">Profile</Link>
            </li>
            <li>
              <Link to="/availability">Availability</Link>
            </li>
            <li>
              <Link to="/appointments">Appointments</Link>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}

export default DoctorDashboard;
