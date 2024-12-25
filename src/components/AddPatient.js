import React, { useState, useEffect } from "react";
import axios from "../services/api";
import "../CSS/AddPatient.css";

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
  const [errors, setErrors] = useState({
    name: "",
    mobileNo: "",
    bloodGroup: "",
    age: "",
    address: "",
  });

  const username = localStorage.getItem("username");

  const fetchProfile = async () => {
    if (username) {
      try {
        const response = await axios.get(`/${username}/patient/viewProfile`);
        setPatientProfile(response.data);
        setHasProfile(true);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    } else {
      alert("Login first to fetch profile.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Clear the error when user starts typing
  };

  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

    // Validate name
    if (!formData.name) {
      formErrors.name = "Name is required.";
      isValid = false;
    }

    // Validate mobile number
    if (!formData.mobileNo) {
      formErrors.mobileNo = "Mobile number is required.";
      isValid = false;
    } else if (!/^\d{10}$/.test(formData.mobileNo)) {
      formErrors.mobileNo = "Please enter a valid 10-digit mobile number.";
      isValid = false;
    }

    // Validate age
    if (!formData.age || formData.age <= 0) {
      formErrors.age = "Please enter a valid age.";
      isValid = false;
    }

    // Validate address
    if (!formData.address) {
      formErrors.address = "Address is required.";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // Don't submit the form if validation fails
    }

    try {
      setLoading(true);

      if (patientProfile) {
        // Update profile
        const response = await axios.put(
          `/${username}/patient/updateProfile`,
          formData
        );
        setPatientProfile(response.data);
        alert("Profile updated successfully!");
      } else {
        // Add profile
        const response = await axios.post(
          `/${username}/patient/addProfile`,
          formData
        );
        alert(
          "Profile added successfully! Check your email for the patient ID."
        );
        setPatientProfile(response.data);
        setHasProfile(true);
        setFormData({
          name: "",
          mobileNo: "",
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

      {/* Add or Edit Profile Form */}
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
              />
              {errors.name && <span className="error">{errors.name}</span>}
            </div>
            <div>
              <label>Mobile Number:</label>
              <input
                type="tel"
                name="mobileNo"
                value={formData.mobileNo}
                onChange={handleInputChange}
              />
              {errors.mobileNo && (
                <span className="error">{errors.mobileNo}</span>
              )}
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
              {errors.age && <span className="error">{errors.age}</span>}
            </div>
            <div>
              <label>Address:</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
              />
              {errors.address && (
                <span className="error">{errors.address}</span>
              )}
            </div>
            <button type="submit" disabled={loading}>
              {loading ? "Adding Profile..." : "Add Profile"}
            </button>
          </form>
        </>
      )}

      {/* Profile Details Section */}
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
              {errors.name && <span className="error">{errors.name}</span>}
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
              {errors.mobileNo && (
                <span className="error">{errors.mobileNo}</span>
              )}
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
              {errors.age && <span className="error">{errors.age}</span>}
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
              {errors.address && (
                <span className="error">{errors.address}</span>
              )}
            </div>
            <button type="submit">Update Profile</button>
          </form>
        </>
      )}
    </div>
  );
}

export default AddPatient;
