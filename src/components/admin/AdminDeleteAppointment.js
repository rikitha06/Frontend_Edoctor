import React, { useEffect, useState } from "react";
import axios from "../../services/api";
import "../../CSS/admin/AdminDeleteAppointment.css";

function AdminDeleteAppointment() {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch all appointments when the component loads
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          `${localStorage.getItem("username")}/admin/appointments`
        );
        setAppointments(response.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  // Delete a specific appointment
  const handleDelete = async (appointmentId) => {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      try {
        await axios.delete(
          `${localStorage.getItem("username")}/admin/appointments/${appointmentId}`
        );
        alert("Appointment deleted successfully!");

        // Remove the deleted appointment from the local state
        setAppointments((prevAppointments) =>
          prevAppointments.filter((appointment) => appointment.id !== appointmentId)
        );
      } catch (error) {
        console.error("Error deleting appointment:", error);
        alert("Failed to delete appointment. Please try again.");
      }
    }
  };

  return (
    <div className="admin-delete-appointment">
      <h2>Admin Manage Appointments</h2>
      {isLoading ? (
        <p>Loading appointments...</p>
      ) : (
        <table className="appointments-table">
          <thead>
            <tr>
              <th>Appointment ID</th>
              <th>Doctor Name</th>
              <th>Patient Name</th>
              <th>Appointment Date & Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  No appointments available.
                </td>
              </tr>
            ) : (
              appointments.map((appointment) => (
                <tr key={appointment.id}>
                  <td>{appointment.id}</td>
                  <td>{appointment.doctorName}</td>
                  <td>{appointment.patientName}</td>
                  <td>{appointment.dateTime}</td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(appointment.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminDeleteAppointment;
