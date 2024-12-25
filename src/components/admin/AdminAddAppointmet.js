import React, { useState } from "react";
import axios from "../../services/api"; // Ensure the correct path to your API service

function AdminAddAppointment() {
  const [patientId, setPatientId] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [appointmentDateTime, setAppointmentDateTime] = useState("");
  const [reason, setReason] = useState("");

  const handleAppointmentSubmission = async () => {
    const data = { patientId, doctorId, appointmentDateTime, reason };
    try {
      await axios.post(`${localStorage.getItem("username")}/admin/add-appointment`, data);
      alert("Appointment added successfully!");
      setPatientId("");
      setDoctorId("");
      setAppointmentDateTime("");
      setReason("");
    } catch (error) {
      console.error("Error adding appointment:", error);
      alert("Failed to add appointment. Please try again.");
    }
  };

  return (
    <div className="add-appointment">
      <h2>Add Appointment (Admin)</h2>
      <form className="appointment-form">
        <label>Patient ID:</label>
        <input
          type="text"
          value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
          placeholder="Enter Patient ID"
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
          placeholder="Enter reason for appointment"
        ></textarea>
        <button type="button" onClick={handleAppointmentSubmission}>
          Add Appointment
        </button>
      </form>
    </div>
  );
}

export default AdminAddAppointment;
