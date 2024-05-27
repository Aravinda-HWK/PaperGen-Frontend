import React from 'react';
import { Typography } from '@mui/material';

const MainTopic = ({ text }) => {
  return (
    <>
      <Typography
        variant="h5"
        style={{
          fontSize: '27px',
          fontWeight: 'bold',
          fontFamily: 'YourCustomFont, sans-serif', // Use your custom font
          color: '#193152', // Dark blue shade of color
          textAlign: 'center',
          marginBottom: '0px',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)', // Shadow effect for text
        }}
      >
        {text}
      </Typography>
    </>
  );
};

export default MainTopic;
