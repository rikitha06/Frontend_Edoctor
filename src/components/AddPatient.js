import React, { useState } from "react";
import axios from "../services/api";
import "../CSS/AddPatient.css";

const AddPatient = () => {
    const [hasPatient, setHasPatient] = useState(false);
    const [patientId, setPatientId] = useState("");
    const [patientProfile, setPatientProfile] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        mobileNo: "",
        email: "",
        password: "",
        bloodGroup: "",
        gender: "MALE",
        age: "",
        address: ""
    });
    const [loading, setLoading] = useState(false);

    // Fetch Patient Profile by ID
    const fetchPatientProfile = async () => {
        try {
            const response = await axios.get(`/patients/viewProfile?patientId=${patientId}`);
            setPatientProfile(response.data);
            setHasPatient(true);
        } catch (error) {
            alert("Patient profile not found. Please check the Patient ID.");
            console.error("Error fetching patient profile:", error);
        }
    };

    // Handle Form Input Changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Add or Update Patient Profile
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            if (patientProfile) {
                // Update existing profile
                const response = await axios.put(`/patients/updateProfile?patientId=${patientProfile.patientId}`, formData);
                alert("Patient profile updated successfully!");
                setPatientProfile(response.data);
            } else {
                // Add new profile
                const response = await axios.post("/patients/addProfile", formData);
                alert("Patient added successfully! \n Check email for Patient ID.");
                setPatientProfile(response.data);
                setHasPatient(true);
                setFormData({
                    name: "",
                    mobileNo: "",
                    email: "",
                    password: "",
                    bloodGroup: "",
                    gender: "MALE",
                    age: "",
                    address: ""
                });
            }
        } catch (error) {
            alert("Error saving profile. Please try again.");
            console.error("Error submitting profile:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="profile-container">
            <h2>Patient Profile</h2>

            {/* If no profile exists, show Add Profile or Fetch Profile section */}
            {!patientProfile && (
                <>
                    {!hasPatient && (
                        <div className="fetch-profile-section">
                            <h3>Already have a profile?</h3>
                            <div>
                                <label>Enter Patient ID:</label>
                                <input
                                    type="text"
                                    value={patientId}
                                    onChange={(e) => setPatientId(e.target.value)}
                                />
                                <button onClick={fetchPatientProfile}>Fetch Profile</button>
                            </div>
                        </div>
                    )}

                    <h3>Add Profile</h3>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Name:</label>
                            <input
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div>
                            <label>Mobile Number:</label>
                            <input
                                name="mobileNo"
                                value={formData.mobileNo}
                                onChange={handleInputChange}
                                required
                                pattern="\d{10}"
                                title="Mobile number must consist of 10 digits"
                            />
                        </div>
                        <div>
                            <label>Email:</label>
                            <input
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                                type="email"
                            />
                        </div>
                        <div>
                            <label>Password:</label>
                            <input
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                                minLength="8"
                            />
                        </div>
                        <div>
                            <label>Blood Group:</label>
                            <input
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
                                name="age"
                                type="number"
                                value={formData.age}
                                onChange={handleInputChange}
                                required
                                min="1"
                            />
                        </div>
                        <div>
                            <label>Address:</label>
                            <textarea
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <button type="submit" disabled={loading}>
                            {loading ? "Saving..." : "Add Patient"}
                        </button>
                    </form>
                </>
            )}

            {/* If profile exists, show the profile details */}
            {patientProfile && (
                <>
                    <h3>Profile Details</h3>
                    <form onSubmit={handleSubmit}>
                        {Object.keys(patientProfile).map((key) => (
                            <div key={key}>
                                <label>{key}:</label>
                                <input
                                    name={key}
                                    value={patientProfile[key] || ""}
                                    onChange={(e) =>
                                        setPatientProfile({
                                            ...patientProfile,
                                            [key]: e.target.value
                                        })
                                    }
                                    disabled={key === "patientId"}
                                />
                            </div>
                        ))}
                        <button type="submit">Update Profile</button>
                    </form>
                </>
            )}
        </div>
    );
};

export default AddPatient;
