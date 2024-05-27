import React from 'react';
import './LoadingNotification.css'; // Create a CSS file for styling

const LoadingNotification = () => {
  return (
    <div className="loading-notification">
      <div className="spinner"></div>
      <h1>Sending email for OTP verification...</h1>
    </div>
  );
};

export default LoadingNotification;


