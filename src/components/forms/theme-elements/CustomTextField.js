import React from 'react';
import { styled } from '@mui/material/styles';
import { TextField } from '@mui/material';

const CustomTextField = styled((props) => <TextField {...props} />)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    boxShadow: '0px 5px 5px rgba(0, 0, 0, 0.4)',
    transition: 'box-shadow 1s ease, padding 1s ease',
    width: '100%',
    padding: '1px',
    height: 'auto',
    elevation: 3,
  },
}));

export default function CustomTextFieldExpandedOnHover(props) {
  return <CustomTextField {...props} />;
}
