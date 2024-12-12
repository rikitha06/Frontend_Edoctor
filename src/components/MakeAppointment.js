import React, { useState, useEffect } from "react";
import axios from "../services/api";
import "../CSS/MakeAppointment.css";

function MakeAppointment() {
  const [doctorId, setDoctorId] = useState("");
  const [appointmentDateTime, setAppointmentDateTime] = useState("");
  const [reason, setReason] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [status, setStatus] = useState("Pending");
  const [patientId, setPatientId] = useState(""); // Assuming the patient ID is available
  const [editMode, setEditMode] = useState(false);
  const [editAppointmentId, setEditAppointmentId] = useState(null);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(`/patient/${patientId}/appointments`);
      setAppointments(response.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const handleAppointmentSubmission = async () => {
    if (!doctorId || !appointmentDateTime || !reason) {
      alert("All fields are mandatory!");
      return;
    }

    const appointmentData = {
      doctorId,
      patientId,
      appointmentDateTime,
      reason,
      status,
    };

    try {
      if (editMode) {
        await axios.put(`/patient/${patientId}/appointments/${editAppointmentId}`, appointmentData);
        alert("Appointment updated successfully!");
        setEditMode(false);
        setEditAppointmentId(null);
      } else {
        await axios.post("/patient/book-appointment", appointmentData);
        alert("Appointment booked successfully!");
      }
      fetchAppointments();
      setDoctorId("");
      setAppointmentDateTime("");
      setReason("");
    } catch (error) {
      console.error("Error booking/updating appointment:", error);
      alert("Failed to book/update appointment. Please try again.");
    }
  };

  const handleDeleteAppointment = async (appointmentId) => {
    try {
      await axios.delete(`/patient/${patientId}/appointments/${appointmentId}`);
      alert("Appointment deleted successfully!");
      fetchAppointments();
    } catch (error) {
      console.error("Error deleting appointment:", error);
      alert("Failed to delete appointment. Please try again.");
    }
  };

  const handleEditAppointment = (appointment) => {
    setDoctorId(appointment.doctorId);
    setAppointmentDateTime(appointment.appointmentDateTime);
    setReason(appointment.reason);
    setEditMode(true);
    setEditAppointmentId(appointment.appointmentId);
  };

  return (
    <div className="make-appointment">
      <h2>Book an Appointment</h2>
      <div className="appointment-form">
        <label htmlFor="doctorId">Doctor ID:</label>
        <input
          type="text"
          id="doctorId"
          value={doctorId}
          onChange={(e) => setDoctorId(e.target.value)}
        />

        <label htmlFor="appointmentDateTime">Appointment Date & Time:</label>
        <input
          type="datetime-local"
          id="appointmentDateTime"
          value={appointmentDateTime}
          onChange={(e) => setAppointmentDateTime(e.target.value)}
        />

        <label htmlFor="reason">Reason:</label>
        <textarea
          id="reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Reason for appointment"
        ></textarea>

        <button onClick={handleAppointmentSubmission}>
          {editMode ? "Update Appointment" : "Book Appointment"}
        </button>
      </div>

      <h3>Your Appointments</h3>
      <ul>
        {appointments.map((appointment) => (
          <li key={appointment.appointmentId}>
            <p>Doctor ID: {appointment.doctorId}</p>
            <p>Reason: {appointment.reason}</p>
            <p>Status: {appointment.status}</p>
            <p>Date & Time: {appointment.appointmentDateTime}</p>
            <button onClick={() => handleEditAppointment(appointment)}>
              Edit
            </button>
            <button onClick={() => handleDeleteAppointment(appointment.appointmentId)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MakeAppointment;