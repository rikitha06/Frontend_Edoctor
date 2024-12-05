import React, { useState } from "react";
import axios from "../services/api";
import "../CSS/Profile.css";

function Profile() {
  const [hasProfile, setHasProfile] = useState(false);
  const [doctorId, setDoctorId] = useState("");
  const [doctorProfile, setDoctorProfile] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    specialization: "",
    location: "",
    hospitalName: "",
    mobileNo: "",
    email: "",
    password: "",
    chargedPerVisit: "",
  });

  // Fetch Doctor Profile by ID
  const fetchProfile = async () => {
    try {
      const response = await axios.get(`/doctor/viewProfile?doctorId=${doctorId}`);
      setDoctorProfile(response.data);
      setHasProfile(true); // Show profile section
    } catch (error) {
      alert("Profile not found. Please check the Doctor ID.");
      console.error("Error fetching profile:", error);
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
      if (doctorProfile) {
        // Update existing profile
        const response = await axios.put(`/doctor/updateProfile?doctorId=${doctorId}`, doctorProfile);
        alert("Profile updated successfully!");
        setDoctorProfile(response.data); // Update profile state
      } else {
        // Add new profile
        const response = await axios.post("/doctor/addProfile", formData);
        alert("Profile added successfully! \n Check mail for doctorId");
        setDoctorProfile(response.data); // Set the new profile
        setHasProfile(true); // Switch to profile view
        setFormData({
          name: "",
          specialization: "",
          location: "",
          hospitalName: "",
          mobileNo: "",
          email: "",
          password: "",
          chargedPerVisit: "",
        });
      }
    } catch (error) {
      alert("Error saving profile. Please try again.");
      console.error("Error submitting profile:", error);
    }
  };

  return (
    <div className="profile-container">
      <h2>Doctor Profile</h2>

      {/* If no profile exists, show Add Profile or Fetch Profile section */}
      {!doctorProfile && (
        <>
          {!hasProfile && (
            <div className="fetch-profile-section">
              <h3>Already have a profile?</h3>
              <div>
                <label>Enter Doctor ID:</label>
                <input
                  type="text"
                  value={doctorId}
                  onChange={(e) => setDoctorId(e.target.value)}
                />
                <button onClick={fetchProfile}>Fetch Profile</button>
              </div>
            </div>
          )}

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
              <label>Specialization:</label>
              <input
                type="text"
                name="specialization"
                value={formData.specialization}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Location:</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Hospital Name:</label>
              <input
                type="text"
                name="hospitalName"
                value={formData.hospitalName}
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
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Password:</label>
              <input
                type="text"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Charged per Visit:</label>
              <input
                type="text"
                name="chargedPerVisit"
                value={formData.chargedPerVisit}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit">Add Profile</button>
          </form>
        </>
      )}

      {/* If profile exists, show the profile details */}
      {doctorProfile && (
        <>
          <h3>Profile Details</h3>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={doctorProfile.name || ""}
                onChange={(e) =>
                  setDoctorProfile({ ...doctorProfile, name: e.target.value })
                }
              />
            </div>
            <div>
              <label>Specialization:</label>
              <input
                type="text"
                name="specialization"
                value={doctorProfile.specialization || ""}
                onChange={(e) =>
                  setDoctorProfile({ ...doctorProfile, specialization: e.target.value })
                }
              />
            </div>
            <div>
              <label>Location:</label>
              <input
                type="text"
                name="location"
                value={doctorProfile.location || ""}
                onChange={(e) =>
                  setDoctorProfile({ ...doctorProfile, location: e.target.value })
                }
              />
            </div>
            <div>
              <label>Hospital Name:</label>
              <input
                type="text"
                name="hospitalName"
                value={doctorProfile.hospitalName || ""}
                onChange={(e) =>
                  setDoctorProfile({ ...doctorProfile, hospitalName: e.target.value })
                }
              />
            </div>
            <div>
              <label>Mobile Number:</label>
              <input
                type="tel"
                name="mobileNo"
                value={doctorProfile.mobileNo || ""}
                onChange={(e) =>
                  setDoctorProfile({ ...doctorProfile, mobileNo: e.target.value })
                }
              />
            </div>
            <div>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={doctorProfile.email || ""}
                onChange={(e) =>
                  setDoctorProfile({ ...doctorProfile, email: e.target.value })
                }
              />
            </div>
            <div>
              <label>Charged Per Visit:</label>
              <input
                type="text"
                name="chargedPerVisit"
                value={doctorProfile.chargedPerVisit || ""}
                onChange={(e) =>
                  setDoctorProfile({ ...doctorProfile, chargedPerVisit: e.target.value })
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

export default Profile;
