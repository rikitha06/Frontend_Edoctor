import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../CSS/VerifyEmail.css';

function VerifyEmail() {
  const location = useLocation();
  const navigate = useNavigate();
  const [verificationCode, setVerificationCode] = useState('');
  const username = location.state?.username || '';

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8080/api/auth/verify-email?code=${verificationCode}&username=${username}`,
        {
          method: 'POST',
        }
      );

      if (response.ok) {
        alert('Email verified successfully! Redirecting to Login...');
        navigate('/login');
      } else {
        alert('Verification failed.');
      }
    } catch (error) {
      alert('Error occurred during verification.');
    }
  };

  return (
    <div className="form-container">
      <h2>Verify Email</h2>
      <form onSubmit={handleVerify}>
        <input
          type="text"
          placeholder="Verification Code"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
          required
        />
        <button type="submit" className="btn">Verify</button>
      </form>
    </div>
  );
}

export default VerifyEmail;
