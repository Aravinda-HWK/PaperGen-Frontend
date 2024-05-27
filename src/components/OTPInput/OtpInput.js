import React, { useState, useEffect, useRef } from 'react';

const OtpInput = ({ numInputs = 6, onChange }) => {
  const [otp, setOtp] = useState(new Array(numInputs).fill(''));
  const inputRefs = useRef(new Array(numInputs));

  // Function to handle input changes
  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!isNaN(value) && value !== '') {
      // Update the OTP array with the new value
      otp[index] = value;
      setOtp([...otp]);

      // Move focus to the next input
      if (index < numInputs - 1) {
        inputRefs.current[index + 1].focus();
      }

      // If all inputs are filled, trigger the onChange callback
      if (!otp.includes('')) {
        onChange(otp.join(''));
      }
    }
  };

  // Function to handle backspace key
  const handleBackspace = (e, index) => {
    if (e.key === 'Backspace' && index > 0 && otp[index] === '') {
      // Move focus to the previous input and clear its value
      inputRefs.current[index - 1].focus();
      otp[index - 1] = '';
      setOtp([...otp]);
    }
  };

  // Function to prevent Backspace and Delete keypress
  const handleKeyDown = (e) => {
    if (e.key === 'Backspace' || e.key === 'Delete') {
      e.preventDefault();
    }
  };

  // Use useEffect to set focus on the first input when the component mounts
  useEffect(() => {
    inputRefs.current[0].focus();
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '0 auto',
      }}
    >
      <div className="otp-input">
        {otp.map((digit, index) => (
          <input
            key={index}
            type="text"
            maxLength="1"
            value={digit}
            onChange={(e) => handleChange(e, index)}
            onKeyUp={(e) => handleBackspace(e, index)}
            onKeyDown={handleKeyDown} // Prevent Backspace and Delete
            ref={(input) => (inputRefs.current[index] = input)}
            style={{
              width: '50px', // Adjust the width as needed
              height: '50px', // Adjust the height as needed
              borderRadius: '50%', // Make the input round
              marginRight: '10px', // Add space between inputs
              textAlign: 'center', // Center-align text
              boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.9)', // Add shadow to individual inputs
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default OtpInput;
