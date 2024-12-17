import React, { useState } from "react";
import axios from "../services/api";
import "../CSS/CancelAppointment.css";

function CancelAppointment() {
  const [appointmentId, setAppointmentId] = useState("");
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");

  const handleCancel = async () => {
    try {
      await axios.delete(`/patient/appointments/${appointmentId}`);
      alert("Appointment canceled successfully!");
    } catch (error) {
      console.error("Error canceling appointment:", error);
    }
  };

  return (
    <div className="cancel-appointment">
      <h2>Cancel Appointment</h2>
      <form className="cancel-form">
        <label>Appointment ID:</label>
        <input
          type="text"
          value={appointmentId}
          onChange={(e) => setAppointmentId(e.target.value)}
          placeholder="Enter Appointment ID"
        />
        <label>Reason</label>
        <textarea
          placeholder="Reason for cancellation"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
        <button type="button" onClick={handleCancel}>
          Cancel Appointment
        </button>
      </form>
    </div>
  );
}

export default CancelAppointment;
