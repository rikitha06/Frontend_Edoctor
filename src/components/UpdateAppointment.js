import React, { useState } from "react";
import axios from "../services/api";
import "../CSS/UpdateAppointment.css";

function UpdateAppointment() {
  const [appointmentId, setAppointmentId] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [appointmentDateTime, setAppointmentDateTime] = useState("");
  const [reason, setReason] = useState("");

  const handleUpdate = async () => {
    const data = { doctorId, appointmentDateTime, reason };
    try {
      await axios.put(`/patient/appointments/${appointmentId}`, data);
      alert("Appointment updated successfully!");
    } catch (error) {
      console.error("Error updating appointment:", error);
    }
  };

  return (
    <div className="update-appointment">
      <h2>Update Appointment</h2>
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
          placeholder="Enter reason"
        ></textarea>
        <button type="button" onClick={handleUpdate}>
          Update Appointment
        </button>
      </form>
    </div>
  );
}

export default UpdateAppointment;
