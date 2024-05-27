import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const DropDownList = ({ label, items, onchange }) => {
  const handleChange = (event) => {
    onchange(event.target.value); // Update the selectedValue state when the value changes
  };
  return (
    <Box sx={{ minWidth: 120 }} >
      <FormControl fullWidth >
        <InputLabel  data-testid="Select an option" id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Age"
          onChange={handleChange}
          sx={{
            '&:hover': {
              transform: 'scale(1.01)', // Increase the size on hover
              transition: 'all 0.5s ease-in-out', // Add a smooth transition effect
              padding: '3px',
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.4)', // Add a shadow effect on hover
            },
          }}
          data-testid="dropdown-test"
        >
          {items.map((item) => (
            <MenuItem key={item} value={item} >
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default DropDownList;
