import React, { useState } from "react";
import axios from "../../services/api"; // Ensure correct path for admin API service
import "../../CSS/admin/AdminUpdateAppoint.css";
function AdminUpdateAppointment() {
  const [appointmentId, setAppointmentId] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [appointmentDateTime, setAppointmentDateTime] = useState("");
  const [reason, setReason] = useState("");

  const handleUpdate = async () => {
    const data = { doctorId, appointmentDateTime, reason };
    try {
      await axios.put(
        `${localStorage.getItem(
          "username"
        )}/admin/appointments/${appointmentId}`,
        data
      );
      alert("Appointment updated successfully!");
      setAppointmentId("");
      setDoctorId("");
      setAppointmentDateTime("");
      setReason("");
    } catch (error) {
      console.error("Error updating appointment:", error);
      alert("Failed to update appointment. Please try again.");
    }
  };

  return (
    <div className="admin-update-appointment">
      <h2>Admin Update Appointment</h2>
      <form className="appointment-form">
        <label>Appointment ID:</label>
        <input
          type="text"
          value={appointmentId}
          onChange={(e) => setAppointmentId(e.target.value)}
          placeholder="Enter Appointment ID"
        />
        <label>Doctor ID:</label>
        <input
          type="text"
          value={doctorId}
          onChange={(e) => setDoctorId(e.target.value)}
          placeholder="Enter Doctor ID"
        />
        <label>Appointment Date & Time:</label>
        <input
          type="datetime-local"
          value={appointmentDateTime}
          onChange={(e) => setAppointmentDateTime(e.target.value)}
        />
        <label>Reason:</label>
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Enter reason for the appointment"
        ></textarea>
        <button type="button" onClick={handleUpdate}>
          Update Appointment
        </button>
      </form>
    </div>
  );
}

export default AdminUpdateAppointment;
