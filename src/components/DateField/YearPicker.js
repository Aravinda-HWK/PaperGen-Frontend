import React, { useState } from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Paper, Typography } from '@mui/material';

const YearPicker = ({ label, onInputChange, output }) => {
  const [isHovered, setIsHovered] = useState(false);
  const printDate = (date) => {
    onInputChange(date.format('YYYY'));
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
        transition: 'all 0.3s ease-in-out', // Add a transition effect
      }}
    >
      <div style={{ marginRight: '20px', backgroundColor: '#fafaf7' }}>
        <Typography
          variant="h7"
          component="div"
          sx={{
            flexGrow: 1,
            fontSize: '15px',
            color: 'black',
            textAlign: 'justify',
            marginLeft: '1px',
            marginTop: '1px',
          }}
        >
          Year Stablished: <span style={{ color: 'blue', fontStyle: 'italic' }}>{output}</span>
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker']}>
            <DatePicker
              label={label}
              views={['year']}
              onChange={printDate}
              sx={{
                width: '100%',
                backgroundColor: '#f0f0f0',
                borderRadius: '5px',
              }}
            />
          </DemoContainer>
        </LocalizationProvider>
      </div>
    </Paper>
  );
};

export default YearPicker;
