import React, { useState } from "react";
import axios from "../services/api";
import "../CSS/AppointmentsPage.css";

function AppointmentsPage() {
  const [doctorId, setDoctorId] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [cancelReason, setCancelReason] = useState("");

  // Fetch all appointments for a doctor
  const fetchAppointments = async () => {
    try {
      const response = await axios.get(
        `/doctor/all-appointments/${doctorId}`
      );
      if (response.data.length === 0) {
        alert("No appointments found for this doctor.");
      }
      setAppointments(response.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      alert("Failed to fetch appointments. Please check the Doctor ID.");
    }
  };

  // Handle confirmation of an appointment
  const handleConfirmAppointment = async (appointmentId) => {
    try {
      const response = await axios.put(
        `/doctor/confirm-appointment/${appointmentId}`
      );
      alert("Appointment confirmed!");
      fetchAppointments(); // Refresh the list of appointments
    } catch (error) {
      console.error("Error confirming appointment:", error);
      alert("Failed to confirm appointment.");
    }
  };

  // Handle cancellation of an appointment
  const handleCancelAppointment = async (appointmentId) => {

    if (!cancelReason) {
      alert("Please provide a reason for cancellation.");
      return;
    }
    try {
      const response = await axios.put(
        `/doctor/cancel-appointment/${appointmentId}`,
        cancelReason
      );
      alert("Appointment cancelled successfully!");
      setCancelReason(""); // Clear the cancel reason input
      fetchAppointments(); // Refresh the list of appointments
    } catch (error) {
      console.error("Error cancelling appointment:", error);
      alert("Failed to cancel appointment.");
    }
  };

  return (
    <div className="appointments-page">
      <h2>Doctor Appointments</h2>

      {/* Doctor ID input to fetch appointments */}
      <div className="fetch-section">
        <label>Enter Doctor ID:</label>
        <input
          type="text"
          value={doctorId}
          onChange={(e) => setDoctorId(e.target.value)}
        />
        <button onClick={fetchAppointments}>Fetch Appointments</button>
      </div>

      {/* Display appointments in a table */}
      {appointments.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Appointment ID</th>
              <th>Patient Name</th>
              <th>Reason</th>
              <th>Appointment Date & Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.appointmentId}>
                <td>{appointment.appointmentId}</td>
                <td>{appointment.patient.name}</td>
                <td>{appointment.reason}</td>
                <td>{appointment.appointmentDateTime}</td>
                <td>{appointment.status}</td>
                <td>
                  {appointment.status === "Pending" && (
                    <>
                      <button onClick={() => handleConfirmAppointment(appointment.appointmentId)}>
                        Confirm
                      </button>
                      <button onClick={() => handleCancelAppointment(appointment.appointmentId)}>
                        Cancel
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}

            <tr>
                <th colSpan={6}>
                    {/* Input for cancellation reason */}
                    <div className="cancel-reason">
                    <textarea
                        value={cancelReason}
                        onChange={(e) => setCancelReason(e.target.value)}
                        placeholder="Provide reason for cancellation"
                    />
                    </div>
                </th>
            </tr>

          </tbody>
        </table>
      ) : doctorId && appointments.length === 0 ? (
        <div>
          <p>No appointments found for this doctor. Please try again later.</p>
        </div>
      ) : null}

        
      
    </div>
  );
}

export default AppointmentsPage;
