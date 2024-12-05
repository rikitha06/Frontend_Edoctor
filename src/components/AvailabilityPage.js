import React, { useState, useEffect } from "react";
import axios from "../services/api";
import "../CSS/AvailabilityPage.css";

function AvailabilityPage() {
  const [doctorId, setDoctorId] = useState("");
  const [availabilities, setAvailabilities] = useState([]);
  const [formData, setFormData] = useState({
    doctorId: "",
    fromDate: "",
    endDate: "",
  });
  const [editAvailabilityId, setEditAvailabilityId] = useState(null);

  // Fetch all availabilities for a doctor
  const fetchAvailabilities = async () => {
    try {
      const response = await axios.get(
        `/doctor/availability/view?doctorId=${doctorId}`
      );

      if(response.data.length === 0) {
        alert("You have no availabilities currently. \nPlease add availability")
      }

      setAvailabilities(response.data);
    } catch (error) {
      console.error("Error fetching availabilities:", error);
      alert("Failed to fetch availabilities. Please check the Doctor ID.");
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Add or Update Availability
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editAvailabilityId) {
        // Update existing availability
        const response = await axios.put(
          `/doctor/availability/update?id=${editAvailabilityId}`,
          formData
        );
        alert("Availability updated successfully!");
        setDoctorId(response.data.doctorId);
        setEditAvailabilityId(null);
      } else {
        // Add new availability
        const response = await axios.post(
          "/doctor/availability/add",
          formData
        );
        alert("Availability added successfully!");
        setDoctorId(response.data.doctorId);
      }
      setFormData({ doctorId: "", fromDate: "", endDate: "" });
      fetchAvailabilities(); // Refresh the table
    } catch (error) {
      console.error("Error saving availability:", error);
      alert("Failed to save availability. Please try again.");
    }
  };

  // Delete Availability
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this availability?")) {
      try {
        await axios.delete(`/doctor/availability/delete?id=${id}`);
        alert("Availability deleted successfully!");
        fetchAvailabilities(); // Refresh the table
      } catch (error) {
        console.error("Error deleting availability:", error);
        alert("Failed to delete availability. Please try again.");
      }
    }
  };

  // Set form for editing an availability
  const handleEdit = (availability) => {
    setEditAvailabilityId(availability.availabilityId);
    setFormData({
      doctorId: availability.doctorId,
      fromDate: availability.fromDate,
      endDate: availability.endDate,
    });
  };

  return (
    <div className="availability-page">
      <h2>Doctor Availability</h2>

      {/* Fetch Doctor Availabilities */}
      <div className="fetch-section">
        <label>Enter Doctor ID:</label>
        <input
          type="text"
          value={doctorId}
          onChange={(e) => setDoctorId(e.target.value)}
        />
        <button onClick={fetchAvailabilities}>Fetch Availabilities</button>
      </div>

      {/* Display Availabilities in a Table */}
      {availabilities.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Doctor ID</th>
              <th>From Date</th>
              <th>End Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {availabilities.map((availability) => (
              <tr key={availability.availabilityId}>
                <td>{availability.availabilityId}</td>
                <td>{availability.doctorId}</td>
                <td>{availability.fromDate}</td>
                <td>{availability.endDate}</td>
                <td>
                  <button onClick={() => handleEdit(availability)}>Update</button>
                  <button onClick={() => handleDelete(availability.availabilityId)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Add or Update Availability Form */}
      <h3>{editAvailabilityId ? "Update Availability" : "Add Availability"}</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Doctor ID:</label>
          <input
            type="text"
            name="doctorId"
            value={formData.doctorId}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>From Date:</label>
          <input
            type="date"
            name="fromDate"
            value={formData.fromDate}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>End Date:</label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">
          {editAvailabilityId ? "Update Availability" : "Add Availability"}
        </button>
      </form>
    </div>
  );
}

export default AvailabilityPage;
