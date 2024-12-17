// Import React and Axios
import React, { useState } from "react";
import axios from "../services/api";
import "../CSS/AddPatient.css";

const AddPatient = () => {
  const [patientId, setPatientId] = useState("");
  const [patientProfile, setPatientProfile] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    mobileNo: "",
    email: "",
    bloodGroup: "",
    gender: "MALE",
    age: "",
    address: "",
  });

  const fetchPatientProfile = async () => {
    try {
      const response = await axios.get(
        `/patient/viewProfile?patientId=${patientId}`
      );
      setPatientProfile(response.data);
    } catch (error) {
      alert("Profile not found. Check Patient ID.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (patientProfile) {
        await axios.put(
          `/patient/updateProfile?patientId=${patientId}`,
          formData
        );
        alert("Profile updated successfully!");
      } else {
        await axios.post("/patient/addProfile", formData);
        alert("Profile added successfully!");
      }
    } catch (error) {
      alert("Error saving profile.");
    }
  };

  return (
    <div className="profile-container">
      <h2>Patient Profile</h2>

      <div>
        <label>Patient ID:</label>
        <input
          type="text"
          value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
        />
        <button onClick={fetchPatientProfile}>Fetch Profile</button>
      </div>

      <form onSubmit={handleSubmit}>
        {["name", "mobileNo", "email", "bloodGroup", "age", "address"].map(
          (key) => (
            <div key={key}>
              <label>{key}:</label>
              <input
                name={key}
                value={formData[key]}
                onChange={handleInputChange}
                required
              />
            </div>
          )
        )}
        <button type="submit">
          {patientProfile ? "Update" : "Add"} Profile
        </button>
      </form>
    </div>
  );
};

export default AddPatient;
