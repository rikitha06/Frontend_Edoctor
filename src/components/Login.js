import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api'; // Axios instance
import '../CSS/Login.css';

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      // Send POST request to backend
      const response = await api.post('auth/login', { username, password });
  
      // Store the username in localStorage
      localStorage.setItem('username', username);
  
      // Extract user data
      const user = response.data;

      setMessage(`Welcome ${user.name || 'User'}! Redirecting to dashboard...`);
  
      // Redirect based on user role
      switch (user.role) {
        case 'ADMIN':
          navigate('/admin-dashboard');
          break;
        case 'DOCTOR':
          navigate(`/doctor-dashboard`);  // Send username in the URL path
          break;
        case 'PATIENT':
          navigate('/patient-dashboard');
          break;
        default:
          navigate('/home'); // Fallback for unknown roles
      }
    } catch (error) {
      // Handle error
      const errorMessage =
        error.response?.data?.error || 'Login failed. Please check your credentials.';
      setMessage(errorMessage);
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <button className="btn-primary" type="submit">
          Login
        </button>
      </form>
      <div className="login-footer">
        <Link to="/forgot-password" className="forgot-password-link">
          Forgot Password?
        </Link>
        <Link to="/register" className="register-link">
          Don't have an account? Register
        </Link>
      </div>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default Login;
