import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import VerifyEmail from './components/VerifyEmail';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import Doctor_Profile from './components/Doctor_Profile';
import DoctorDashboard from './components/DoctorDashboard';
import AvailabilityPage from './components/AvailabilityPage';
import AppointmentsPage from './components/AppointmentsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
        <Route path="/availability" element={<AvailabilityPage/>}/>
        <Route path="/appointments" element={<AppointmentsPage />} />
        <Route path="/doctor-profile" element={<Doctor_Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
