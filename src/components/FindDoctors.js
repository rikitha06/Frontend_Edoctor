import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import axios from "../services/api";
import "../CSS/FindDoctors.css";

function FindDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchSpecialization, setSearchSpecialization] = useState("");
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const username = localStorage.getItem("username");

  // Fetch all doctors
  const fetchAllDoctors = async () => {
    try {
      const response = await axios.get(`/${username}/patient/findDoctors`);
      setDoctors(response.data);
      setFilteredDoctors(response.data);
    } catch (error) {
      console.error("Error fetching all doctors:", error);
      alert("Failed to fetch doctors. Please try again later.");
    }
  };

  // Fetch doctors by Name
  const fetchDoctorsByName = async () => {
    if (searchName.trim() === "") {
      alert("Please enter a doctor's name.");
      return;
    }

    setFilteredDoctors([]);
    setSearchSpecialization("");

    try {
      const response = await axios.get(`/${username}/patient/findDoctorsByName?doctorName=${searchName}`);
      if (response.data && response.data.length > 0) {
        setFilteredDoctors(response.data);
      } else {
        setFilteredDoctors([]); // No doctors found, so clear results
        alert("No doctors found for the given name.");
      }
    } catch (error) {
      console.error("Error fetching doctor by name:", error);
      alert("Failed to fetch doctor details. Please try again later.");
    }
  };

  // Fetch doctors by Specialization
  const fetchDoctorsBySpecialization = async () => {
    if (searchSpecialization.trim() === "") {
      alert("Please enter a specialization.");
      return;
    }

    setFilteredDoctors([]);
    setSearchName("");

    try {
      const response = await axios.get(`/${username}/patient/findDoctorsBySpecialization?specialization=${searchSpecialization}`);
      if (response.data && response.data.length > 0) {
        setFilteredDoctors(response.data);
      } else {
        setFilteredDoctors([]); // No doctors found, so clear results
        alert("No doctors found for the selected specialization.");
      }
    } catch (error) {
      console.error("Error fetching doctors by specialization:", error);
      alert("Failed to fetch doctors. Please try again later.");
    }
  };

  return (
    <div className="find-doctors-page">
      <h2>Find Doctors</h2>

      {/* Options to find doctors */}
      <div className="fetch-options">
        {/* Find all doctors */}
        <button onClick={fetchAllDoctors}>View All Doctors</button>

        {/* Find doctors by name */}
        <div className="search-section">
          <label>Enter Name:</label>
          <input
            type="text"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            placeholder="Enter Name"
          />
          <button onClick={fetchDoctorsByName}>Search Doctor by Name</button>
        </div>

        {/* Find doctors by specialization */}
        <div className="search-section">
          <label>Enter Specialization:</label>
          <input
            type="text"
            value={searchSpecialization}
            onChange={(e) => setSearchSpecialization(e.target.value)}
            placeholder="Enter Specialization"
          />
          <button onClick={fetchDoctorsBySpecialization}>Search Doctor by Specialization</button>
        </div>
      </div>

      {/* Display doctors in card format */}
      <div className="doctor-cards-container">
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doctor) => (
            <div className="doctor-card" key={doctor.doctorId}>
              <h3>Dr. {doctor.name}</h3>
              <p><strong>Specialization:</strong> {doctor.specialization}</p>
              <p><strong>Location:</strong> {doctor.location}</p>
              <p><strong>Hospital:</strong> {doctor.hospitalName}</p>
              <p><strong>Charge Per Visit:</strong> ₹{doctor.chargedPerVisit}</p>
              <Link to={`/doctor-details/${doctor.doctorId}`}>
                <button>Get Details</button>
              </Link>
            </div>
          ))
        ) : (
          <p className="no-results">No doctors found. Try another search option.</p>
        )}
      </div>
    </div>
  );
}

export default FindDoctors;
