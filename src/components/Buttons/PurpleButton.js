import React from 'react';
import Button from '@mui/material/Button';

const PurpleButton = ({ label, onClick }) => {
  return (
    <Button
      data-testid="Click me" // Test id for testing
      variant="contained"
      color="primary"
      onClick={onClick}
      sx={{
        backgroundColor: '#1f244f', // Purple color
        '&:hover': {
          backgroundColor: '#7b1fa2', // Darker shade on hover
        },
        '&:active': {
          backgroundColor: '#4a148c', // Even darker shade on click
        },
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Shadow effect
        borderRadius: '5px', // Rounded corners
        fontSize: '16px', // Font size
        padding: '10px 20px', // Padding
        fontWeight: 'bold', // Bold font weight
      }}
    >
      {label}
    </Button>
  );
};

export default PurpleButton;
