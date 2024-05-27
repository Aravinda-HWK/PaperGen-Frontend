import React, { useState } from 'react';
import { Typography, TextField } from '@mui/material';
import { Paper } from '@mui/material';

const TextBox = ({ inputText, label, width, type, isMultiline, onInputChange, defaultValue }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleInputChange = (event) => {
    const newValue = event.target.value;
    onInputChange(newValue); // Call the callback with the new value
  };

  return (
    <Paper
      elevation={isHovered ? 10 : 3} // Change elevation on hover
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        padding: isHovered ? '15px' : '10px', // Adjust padding on hover
        width: '100%',
        maxWidth: '1000px',
        margin: '0 auto',
        backgroundColor: '#fafaf7',
        transition: 'all 0.6s ease-in-out', // Add a transition effect
      }}
    >
      <div style={{ width: width, marginRight: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Typography
            variant="h7"
            component="div"
            sx={{
              flexGrow: 1,
              fontSize: '15px',
              color: 'black',
              textAlign: 'justify',
              marginLeft: '10px',
              marginTop: '10px',
            }}
          >
            {inputText}:{' '}
            <span style={{ color: 'blue', fontStyle: defaultValue ? 'italic' : 'normal' }}>
              {defaultValue}
            </span>
          </Typography>
        </div>

        <TextField
          id="outlined-basic"
          label={label}
          type={type}
          variant="filled"
          multiline={isMultiline}
          sx={{
            width: '100%',
            backgroundColor: '#f0f0f0',
            // padding: '5px',
            borderRadius: '5px',
          }}
          onChange={handleInputChange} // Add this to handle input change
        />
      </div>
    </Paper>
  );
};

export default TextBox;
