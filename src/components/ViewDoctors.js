import React, { useState, useEffect } from "react";
import axios from "../services/api";
import "../CSS/Doctor_Profile.css";

function ViewDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [searchDoctorId, setSearchDoctorId] = useState("");
  const [filteredDoctor, setFilteredDoctor] = useState(null);

  // Fetch all doctors on component mount
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("/doctor/getAllDoctors");
        setDoctors(response.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
        alert("Failed to fetch doctors. Please try again later.");
      }
    };

    fetchDoctors();
  }, []);

  // Fetch a specific doctor by ID
  const fetchDoctorById = async () => {
    try {
      const response = await axios.get(`/doctor/viewProfile?doctorId=${searchDoctorId}`);
      setFilteredDoctor(response.data);
    } catch (error) {
      console.error("Error fetching doctor by ID:", error);
      alert("Doctor not found. Please check the Doctor ID.");
    }
  };

  return (
    <div className="view-doctors-container">
      <h2>View Doctors</h2>

      {/* Search Section */}
      <div className="search-section">
        <label>Search by Doctor ID:</label>
        <input
          type="text"
          value={searchDoctorId}
          onChange={(e) => setSearchDoctorId(e.target.value)}
          placeholder="Enter Doctor ID"
        />
        <button onClick={fetchDoctorById}>Fetch</button>
      </div>

      {/* Display Filtered Doctor */}
      {filteredDoctor && (
        <div className="filtered-doctor">
          <h3>Doctor Details</h3>
          <p><strong>ID:</strong> {filteredDoctor.doctorId}</p>
          <p><strong>Name:</strong> {filteredDoctor.name}</p>
          <p><strong>Specialization:</strong> {filteredDoctor.specialization}</p>
          <p><strong>Location:</strong> {filteredDoctor.location}</p>
          <p><strong>Hospital:</strong> {filteredDoctor.hospitalName}</p>
          <p><strong>Charged Per Visit:</strong> {filteredDoctor.chargedPerVisit}</p>
          <p><strong>Available Date and Time:</strong> {filteredDoctor.availability}</p>
        </div>
      )}

      {/* Display All Doctors */}
      <div className="all-doctors">
        <h3>All Doctors</h3>
        {doctors.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Specialization</th>
                <th>Location</th>
                <th>Hospital</th>
                <th>Charged Per Visit</th>
                <th>Available Date and Time</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((doctor) => (
                <tr key={doctor.doctorId}>
                  <td>{doctor.doctorId}</td>
                  <td>{doctor.name}</td>
                  <td>{doctor.specialization}</td>
                  <td>{doctor.location}</td>
                  <td>{doctor.hospitalName}</td>
                  <td>{doctor.chargedPerVisit}</td>
                  <td>{doctor.availability}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No doctors available.</p>
        )}
      </div>
    </div>
  );
}

export default ViewDoctors;
