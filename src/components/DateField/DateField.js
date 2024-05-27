import React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const DateField = ({ text, width }) => {
  return (
    <div style={{ width: width, marginRight: '20px' }}>
      <LocalizationProvider dateAdapter={AdapterDayjs} data-testid="Label">
        <DemoContainer components={['DatePicker']}>
          <DatePicker
            label={text}
            inputProps={{
              style: { width: '350px' }, // Set the width here
            }}
          />
        </DemoContainer>
      </LocalizationProvider>
    </div>
  );
};

export default DateField;
