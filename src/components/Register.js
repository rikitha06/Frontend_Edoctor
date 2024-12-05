import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api'; // Import the API service
import '../CSS/Register.css';

function Register() {
  const [formData, setFormData] = useState({
    role: 'PATIENT', // Default role
    username: '',
    password: '',
    email: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Update form data on input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      const response = await api.post('/auth/register', formData); 
      alert('Registration successful! Redirecting to Verify Email...');
      navigate('/verify-email', { state: { username: formData.username } });
    } catch (error) {
      console.error('Error occurred during registration:', error);
      const errorMessage =
        error.response?.data?.message || 'An error occurred. Please try again later.';
      alert(`Registration failed: ${errorMessage}`);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="form-container">
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        {/* Username Input */}
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            type="text"
            name="username"
            placeholder="Enter your username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Email Input */}
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Password Input */}
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Role Selection */}
        <div className="form-group">
          <label htmlFor="role">Role:</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleInputChange}
          >
            <option value="PATIENT">Patient</option>
            <option value="DOCTOR">Doctor</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn"
          disabled={loading} // Disable button during loading
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
}

export default Register;
