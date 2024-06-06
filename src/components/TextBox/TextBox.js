import React from 'react';
import { Typography, TextField } from '@mui/material';
import { Paper } from '@mui/material';

const TextBox = ({ inputText, label, width, type, isMultiline, onInputChange, defaultValue }) => {
  const handleInputChange = (event) => {
    const newValue = event.target.value;
    onInputChange(newValue); // Call the callback with the new value
  };

  return (
    <Paper
      elevation={20}
      style={{
        padding: '10px',
        width: '100%',
        maxWidth: '1000px',
        margin: '0 auto',
        background: 'linear-gradient(135deg, rgba(113, 111, 134, 0.8), rgba(33, 15, 86, 0.8))',
        transition: 'all 0.6s ease-in-out',
        borderRadius: '10px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.7)',
        elevation: '20',
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
              fontWeight: 'bold',
            }}
          >
            {inputText}:{' '}
            <span style={{ color: 'white', fontStyle: defaultValue ? 'italic' : 'normal' }}>
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
            borderRadius: '5px',
          }}
          onChange={handleInputChange}
        />
      </div>
    </Paper>
  );
};

export default TextBox;
