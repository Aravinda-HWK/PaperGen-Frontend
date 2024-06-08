import React from 'react';
import Button from '@mui/material/Button';

const BlackButton = ({ label, onClick }) => {
  return (
    <Button
      data-testid="Click me" // Test id for testing
      variant="contained"
      color="primary"
      onClick={onClick}
      sx={{
        backgroundColor: 'black', // Background color
        '&:hover': {
          backgroundColor: 'blue', // Darker shade on hover
        },
        '&:active': {
          backgroundColor: 'blue', // Even darker shade on click
        },
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.8)', // Shadow effect
        borderRadius: '10px', // Rounded corners
        fontSize: '16px', // Font size
        padding: '10px 20px', // Padding
        fontWeight: 'bold', // Bold font weight
        elevation: 10, // Elevation
      }}
    >
      {label}
    </Button>
  );
};

export default BlackButton;
