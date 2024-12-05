import React, { useState } from "react";
import axios from "../services/api";
import "../CSS/AppointmentsPage.css";
import "../CSS/Modal.css";

function AppointmentsPage() {
  const [doctorId, setDoctorId] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [cancelReason, setCancelReason] = useState("");
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [actionType, setActionType] = useState("");
  const [isFetching, setIsFetching] = useState(false); // Add this state for fetching status
  

  // Fetch all appointments for a doctor
  const fetchAppointments = async () => {
    try {
      setIsFetching(true); // Set fetching state to true before starting the API call
      const response = await axios.get(`/doctor/all-appointments/${doctorId}`);
      
      if (response.data.length === 0) {
        alert("Currently you have no appointments pending.");
      } else {
        setAppointments(response.data);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
      alert("Failed to fetch appointments. Please check the Doctor ID.");
    } finally {
      setIsFetching(false); // Set isFetching to false after fetching is done
    }
  };


  const handleFetchAppointments = async () => {
    fetchAppointments();
  };

  // Open confirmation modal for action
  const openConfirmationModal = (appointmentId, action) => {
    setSelectedAppointment(appointmentId);
    setActionType(action);
    setShowConfirmationModal(true);
  };

  // Close confirmation modal
  const closeConfirmationModal = () => {
    setShowConfirmationModal(false);
    setSelectedAppointment(null);
    setActionType("");
  };

  // Handle confirmation of an appointment
  const handleConfirmAppointment = async () => {
    try {
      const response = await axios.put(
        `/doctor/confirm-appointment/${selectedAppointment}`
      );
      fetchAppointments(); // Refresh the list of appointments
      closeConfirmationModal();
    } catch (error) {
      console.error("Error confirming appointment:", error);
      alert("Failed to confirm appointment.");
      closeConfirmationModal();
    }
  };

  // Handle cancellation of an appointment
  const handleCancelAppointment = async () => {
    if (!cancelReason) {
      alert("Please provide a reason for cancellation.");
      return;
    }
    try {
      const response = await axios.put(
        `/doctor/cancel-appointment/${selectedAppointment}`,
        { cancelReason }
      );
      setCancelReason(""); // Clear the cancel reason input
      fetchAppointments(); // Refresh the list of appointments
      closeConfirmationModal();
    } catch (error) {
      console.error("Error cancelling appointment:", error);
      alert("Failed to cancel appointment.");
      closeConfirmationModal();
    }
  };

  return (
    <div className="appointments-page">
      <h2>My Appointments</h2>

      {/* Doctor ID input to fetch appointments */}
      <div className="fetch-section">
        <label>Enter Doctor ID:</label>
        <input
          type="text"
          value={doctorId}
          onChange={(e) => setDoctorId(e.target.value)}
        />
        <button onClick={handleFetchAppointments}>Fetch Appointments</button>
      </div>

      {/* Display appointments in a table */}
      {isFetching ? (
        <p>Loading appointments...</p> // Show loading message while fetching
      ) : appointments.length > 0 ? (
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
                      <button
                        onClick={() =>
                          openConfirmationModal(appointment.appointmentId, "confirm")
                        }
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() =>
                          openConfirmationModal(appointment.appointmentId, "cancel")
                        }
                      >
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
      ) : null}

      {/* Confirmation Modal */}
      {showConfirmationModal && (
        <div className="confirmation-modal">
          <div className="modal-content">
            <p>
              Are you sure you want to {actionType} this appointment?
            </p>
            <div className="modal-actions">
              <button onClick={actionType === "confirm" ? handleConfirmAppointment : handleCancelAppointment}>
                Yes
              </button>
              <button onClick={closeConfirmationModal}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AppointmentsPage;
