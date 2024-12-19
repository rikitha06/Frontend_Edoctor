import React, { useState, useEffect } from "react";
import axios from "../services/api";
import "../CSS/Doctor_Profile.css";

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
    chargedPerVisit: "",
  });
  const [loading, setLoading] = useState(false);
  const username = localStorage.getItem("username");

  // Fetch Doctor Profile by ID
  const fetchProfile = async () => {
    if(username) {
      try {
        const response = await axios.get(`/doctor/${username}/viewProfile`);
        setDoctorProfile(response.data);
        setHasProfile(true); // Show profile section
      } catch (error) {
        alert("Profile not found. Please check the Doctor ID.");
        console.error("Error fetching profile:", error);
      }
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

      if (doctorProfile) {
        // Update existing profile (skip email and password)
        const response = await axios.put(`/doctor/${username}/updateProfile`, formData);
        alert("Profile updated successfully!");
        setDoctorProfile(response.data); // Update profile state
      } else {
        // Add new profile
        const response = await axios.post(`/doctor/${username}/addProfile`, formData);
        alert("Profile added successfully! Check mail for doctorId");
        setDoctorProfile(response.data); // Set the new profile
        setHasProfile(true); // Switch to profile view
        setFormData({
          name: "",
          specialization: "",
          location: "",
          hospitalName: "",
          mobileNo: "",
          chargedPerVisit: "",
        });
        setDoctorId(response.data.doctorId);
      }
    } catch (error) {
      alert("Error saving profile. Please try again.");
      console.error("Error submitting profile:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch doctor profile if doctorId is already set
    if (username) {
      fetchProfile();
    }
  }, [doctorId]);

  return (
    <div className="profile-container">
      <h2>Doctor Profile</h2>

      {/* If no profile exists, show Add Profile or Fetch Profile section */}
      {!doctorProfile && (
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
              <label>Charged per Visit:</label>
              <input
                type="text"
                name="chargedPerVisit"
                value={formData.chargedPerVisit}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit" disabled={loading}>
              {loading ? 'Adding Profile...' : 'Add Profile'}
            </button>
          </form>
        </>
      )}

      {/* If profile exists, show the profile details */}
      {doctorProfile && (
        <>
          <h3>Profile Details</h3>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Doctor ID:</label>
              <input
                type="text"
                name="doctorId"
                value={doctorProfile.doctorId || ""}
                disabled
              />
            </div>
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
