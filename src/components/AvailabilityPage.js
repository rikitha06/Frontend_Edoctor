import React, { useState, useEffect } from "react";
import axios from "../services/api";
import "../CSS/AvailabilityPage.css";

function AvailabilityPage() {
  const [availabilities, setAvailabilities] = useState([]); // Store fetched availabilities
  const [formData, setFormData] = useState({
    fromDate: "",
    endDate: "",
  }); // Form data for add/update
  const [editAvailabilityId, setEditAvailabilityId] = useState(''); // Track edit mode
  const username = localStorage.getItem("username");

  useEffect(() => {
    // Automatically fetch availabilities on page load
    const fetchInitialAvailabilities = async () => {
      if(username) {
        try {
          const response = await axios.get(`/doctor/${username}/availability/viewAvailability`);
          if (response.data.length === 0) {
            alert("No availabilities found. Please add availability.");
          } else {
            setAvailabilities(response.data);
          }
        } catch (error) {
          console.error("Error fetching availabilities:", error);
          alert("Failed to fetch availabilities. Please check your login session.");
        }
      }
      else {
        alert("Login to fetch availabilities.");
      }
    };

    fetchInitialAvailabilities();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editAvailabilityId) {
        const response = await axios.put(
          `/doctor/${username}/availability/updateAvailability?id=${editAvailabilityId}`,
          formData
        );
        alert("Availability updated successfully!");
        setEditAvailabilityId(null);
      } else {
        const response = await axios.post(
          `/doctor/${username}/availability/addAvailability`,
          formData
        );
        alert("Availability added successfully!");
      }
      setFormData({fromDate: "", endDate: "" });
      fetchAvailabilities(); // Refresh availabilities
    } catch (error) {
      console.error("Error saving availability:", error);
      alert("Failed to save availability. Please try again.");
    }
  };

  const fetchAvailabilities = async () => {
    try {
      const response = await axios.get(`/doctor/${username}/availability/viewAvailability`);
      setAvailabilities(response.data);
    } catch (error) {
      console.error("Error fetching availabilities:", error);
    }
  };

  const handleEdit = (availability) => {
    setEditAvailabilityId(availability.availabilityId);
    setFormData({
      fromDate: availability.fromDate,
      endDate: availability.endDate,
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this availability?")) {
      try {
        await axios.delete(`/doctor/${username}/availability/deleteAvailability?id=${id}`);
        alert("Availability deleted successfully!");
        fetchAvailabilities();
      } catch (error) {
        console.error("Error deleting availability:", error);
        alert("Failed to delete availability. Please try again.");
      }
    }
  };

  return (
    <div className="availability-page">
      <h2>Doctor Availability</h2>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>From Date</th>
            <th>End Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {availabilities.map((availability) => (
            <tr key={availability.availabilityId}>
              <td>{availability.availabilityId}</td>
              <td>{availability.fromDate}</td>
              <td>{availability.endDate}</td>
              <td>
                <button onClick={() => handleEdit(availability)}>Update</button>
                <button onClick={() => handleDelete(availability.availabilityId)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>{editAvailabilityId ? "Update Availability" : "Add Availability"}</h3>
      <form onSubmit={handleSubmit}>
        <label>From Date:</label>
        <input
          type="date"
          name="fromDate"
          value={formData.fromDate}
          onChange={handleInputChange}
          required
        />
        <label>End Date:</label>
        <input
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleInputChange}
          required
        />
        <button type="submit">{editAvailabilityId ? "Update" : "Add"} Availability</button>
      </form>
    </div>
  );
}

export default AvailabilityPage;
