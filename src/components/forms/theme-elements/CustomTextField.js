import React from 'react';
import { styled } from '@mui/material/styles';
import { TextField } from '@mui/material';

const CustomTextField = styled((props) => <TextField {...props} />)(({ theme }) => ({
  '& .MuiOutlinedInput-input::-webkit-input-placeholder': {
    color: theme.palette.text.secondary,
    opacity: '0',
  },
  '& .MuiOutlinedInput-input.Mui-disabled::-webkit-input-placeholder': {
    color: theme.palette.text.secondary,
    opacity: '1',
  },
  '& .MuiOutlinedInput-root': {
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    transition: 'box-shadow 0.3s ease, padding 0.3s ease', // Add transitions for box shadow and padding
    width: '100%',
    padding: '2px', // Initial padding
    height: 'auto', // Initial height
  },
  '&:hover .MuiOutlinedInput-root': {
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.7)',
    padding: '4px', // Expanded padding on hover
    height: 'auto', // Expanded height on hover
  },
}));

export default function CustomTextFieldExpandedOnHover(props) {
  return <CustomTextField {...props} />;
}
