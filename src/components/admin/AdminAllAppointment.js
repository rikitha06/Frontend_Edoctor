import React, { useEffect, useState } from "react";
import axios from "../../services/api";
import "../../CSS/admin/AdminAllAppointment.css";

function AdminAllAppointment() {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch appointments from the backend
    axios
      .get(`${localStorage.getItem("username")}/admin/appointments`)
      .then((response) => {
        setAppointments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching appointments:", error);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const handleDelete = (appointmentId) => {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      axios
        .delete(`/admin/appointments/${appointmentId}`)
        .then(() => {
          alert("Appointment deleted successfully!");
          setAppointments(appointments.filter((appt) => appt.id !== appointmentId));
        })
        .catch((error) => {
          console.error("Error deleting appointment:", error);
        });
    }
  };

  return (
    <div className="admin-all-appointments">
      <h2>All Appointments</h2>
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
              <th>Reason</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length === 0 ? (
              <tr>
                <td colSpan="7">No appointments available.</td>
              </tr>
            ) : (
              appointments.map((appointment) => (
                <tr key={appointment.id}>
                  <td>{appointment.id}</td>
                  <td>{appointment.doctorName}</td>
                  <td>{appointment.patientName}</td>
                  <td>{appointment.dateTime}</td>
                  <td>{appointment.reason}</td>
                  <td>{appointment.status}</td>
                  <td>
                    <button
                      className="update-btn"
                      onClick={() => alert("Update functionality coming soon!")}
                    >
                      Update
                    </button>
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

export default AdminAllAppointment;
