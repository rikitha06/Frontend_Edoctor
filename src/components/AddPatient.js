import React, { useState, useEffect } from "react";
import axios from "../services/api";
import "../CSS/AddPatient.css";

// hello
function AddPatient() {
  const [hasProfile, setHasProfile] = useState(false);
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
  const username = localStorage.getItem("username");

  // Fetch Patient Profile by Username
  const fetchProfile = async () => {
    if(username) {
      try {
        const response = await axios.get(`/${username}/patient/viewProfile`);
        setPatientProfile(response.data);
        setHasProfile(true); // Show profile section
      } catch (error) {
        alert("You don't have a profile currently.");
        console.error("Error fetching profile:", error);
      }
    }
    else {
      alert("Login first to fetch profile.");
    }
  };

  // Handle Form Input Changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Add or Update Profile
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      if (patientProfile) {
        // Update existing profile
        const response = await axios.put(`/${username}/patient/updateProfile`, formData);
        alert("Profile updated successfully!");
        setPatientProfile(response.data); // Update profile state
      } else {
        // Add new profile
        const response = await axios.post(`/${username}/patient/addProfile`, formData);
        alert("Profile added successfully! Check your email for the patient ID.");
        setPatientProfile(response.data); // Set the new profile
        setHasProfile(true); // Switch to profile view
        setFormData({
          name: "",
          mobileNo: "",
          email: "",
          bloodGroup: "",
          gender: "MALE",
          age: "",
          address: "",
        });
      }
    } catch (error) {
      alert("Error saving profile. Please try again.");
      console.error("Error submitting profile:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (username) {
      fetchProfile();
    }
  }, []);

  return (
    <div className="profile-container">
      <h2>Patient Profile</h2>

      {/* If no profile exists, show Add Profile or Fetch Profile section */}
      {!patientProfile && (
        <>
          <h3>Add Profile</h3>
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
            <div>
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
        </>
      )}

      {/* If profile exists, show the profile details */}
      {patientProfile && (
        <>
          <h3>Profile Details</h3>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Patient ID:</label>
              <input
                type="text"
                name="patientId"
                value={patientProfile.patientId || ""}
                disabled
              />
            </div>
            <div>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={patientProfile.name || ""}
                onChange={(e) =>
                  setPatientProfile({ ...patientProfile, name: e.target.value })
                }
              />
            </div>
            <div>
              <label>Mobile Number:</label>
              <input
                type="tel"
                name="mobileNo"
                value={patientProfile.mobileNo || ""}
                onChange={(e) =>
                  setPatientProfile({
                    ...patientProfile,
                    mobileNo: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={patientProfile.email || ""}
                disabled
              />
            </div>
            <div>
              <label>Blood Group:</label>
              <input
                type="text"
                name="bloodGroup"
                value={patientProfile.bloodGroup || ""}
                onChange={(e) =>
                  setPatientProfile({
                    ...patientProfile,
                    bloodGroup: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label>Gender:</label>
              <select
                name="gender"
                value={patientProfile.gender || ""}
                onChange={(e) =>
                  setPatientProfile({
                    ...patientProfile,
                    gender: e.target.value,
                  })
                }
              >
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHERS">Others</option>
              </select>
            </div>
            <div>
              <label>Age:</label>
              <input
                type="number"
                name="age"
                value={patientProfile.age || ""}
                onChange={(e) =>
                  setPatientProfile({
                    ...patientProfile,
                    age: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label>Address:</label>
              <textarea
                name="address"
                value={patientProfile.address || ""}
                onChange={(e) =>
                  setPatientProfile({
                    ...patientProfile,
                    address: e.target.value,
                  })
                }
              />
            </div>
            <button type="submit">Update Profile</button>
          </form>
        </>
      )}
    </div>
  );
}

export default AddPatient;
