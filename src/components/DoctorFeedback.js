import React, { useState, useEffect } from "react";
import api from "../services/api"; // Assuming your axios instance is here
import "../CSS/DoctorFeedback.css";

function DoctorFeedback({ username }) { // Assuming username is passed as a prop or managed by state
  const [avgRating, setAvgRating] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchFeedbackData = () => {
    setIsLoading(true);
    setError(null);

    // Adjust API calls to use the passed username
    Promise.all([
      api.get(`/api/${username}/feedback/doctorAvg`),
      api.get(`/api/${username}/feedback/doctor`),
    ])
      .then(([avgRatingResponse, feedbackResponse]) => {
        setAvgRating(avgRatingResponse.data); // Expecting average rating data
        setFeedbacks(feedbackResponse.data); // Expecting feedback list
      })
      .catch((err) => {
        console.error("Error fetching feedback data:", err);
        setError("Failed to fetch feedback data. Please try again.");
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (username) {
      fetchFeedbackData();
    }
  }, [username]);

  return (
    <div className="feedback-container">
      <h2>Feedback</h2>
      {isLoading ? (
        <p>Loading feedback...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <>
          <div className="avg-rating">
            <strong>Average Rating:</strong> {avgRating || "Not available"}
          </div>
          <table className="feedback-table">
            <thead>
              <tr>
                <th>Feedback ID</th>
                <th>Rating</th>
                <th>Feedback</th>
              </tr>
            </thead>
            <tbody>
              {feedbacks.length > 0 ? (
                feedbacks.map((feedback) => (
                  <tr key={feedback.id}>
                    <td>{feedback.id}</td>
                    <td>{feedback.rating}</td>
                    <td>{feedback.feedbackText}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">No feedback available</td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default DoctorFeedback;
