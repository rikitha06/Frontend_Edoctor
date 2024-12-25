import React, { useState } from "react";
import axios from "../../services/api";
import "../../CSS/admin/AdminPatient.css";

function AdminAddPatient() {
  const [patientUsername, setPatientUsername] = useState("");
  const [patientProfile, setPatientProfile] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    mobileNo: "",
    bloodGroup: "",
    gender: "MALE",
    age: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);

  const username = localStorage.getItem("username"); // Admin's username

  // Check if patient profile exists
  const checkProfile = async () => {
    if (!patientUsername) {
      alert("Enter a patient username to check.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(
        `/${username}/admin/patientProfile?patientUsername=${patientUsername}`
      );

      if (response.data === "Create profile") {
        alert("No profile exists. Proceed to create one.");
        setPatientProfile(null); // No profile exists
      } else {
        alert("Profile already exists. Cannot add a new profile.");
        setPatientProfile(response.data); // Existing profile
      }
    } catch (error) {
      console.error("Error checking profile:", error);
      alert("Error fetching profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Add a new patient profile
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post(
        `/${username}/admin/patientAdd?patientUsername=${patientUsername}`,
        formData
      );

      alert("Profile added successfully! Check the email for the patient ID.");
      setFormData({
        name: "",
        mobileNo: "",
        bloodGroup: "",
        gender: "MALE",
        age: "",
        address: "",
      });
    } catch (error) {
      console.error("Error adding profile:", error);
      alert("Error adding profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-add-patient-container">
      <h2>Admin Add Patient</h2>

      {/* Section to check if a profile exists */}
      <div className="check-profile-section">
        <label>Enter Patient Username:</label>
        <input
          type="text"
          value={patientUsername}
          onChange={(e) => setPatientUsername(e.target.value)}
        />
        <button onClick={checkProfile} disabled={loading}>
          {loading ? "Checking..." : "Check Profile"}
        </button>
      </div>

      {/* If profile exists, show profile details */}
      {patientProfile && (
        <div className="profile-details">
          <h3>Profile Details</h3>
          <p>
            <strong>Name:</strong> {patientProfile.name}
          </p>
          <p>
            <strong>Mobile No:</strong> {patientProfile.mobileNo}
          </p>
          <p>
            <strong>Blood Group:</strong> {patientProfile.bloodGroup}
          </p>
          <p>
            <strong>Gender:</strong> {patientProfile.gender}
          </p>
          <p>
            <strong>Age:</strong> {patientProfile.age}
          </p>
          <p>
            <strong>Address:</strong> {patientProfile.address}
          </p>
        </div>
      )}

      {/* If no profile exists, show the form to add a profile */}
      {!patientProfile && patientUsername && (
        <div className="add-profile-section">
          <h3>Add New Patient Profile</h3>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Mobile Number:</label>
              <input
                type="tel"
                name="mobileNo"
                value={formData.mobileNo}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Blood Group:</label>
              <input
                type="text"
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Gender:</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
              >
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHERS">Others</option>
              </select>
            </div>
            <div className="age">
              <label>Age:</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Address:</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
              />
            </div>
            <button type="submit" disabled={loading}>
              {loading ? "Adding Profile..." : "Add Profile"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default AdminAddPatient;
