import React from 'react';
import { Typography } from '@mui/material';

const SubTopic = ({ text }) => {
  return (
    <>
      <Typography
        variant="h6"
        style={{
          fontSize: '15px',
          color: 'black',
          marginLeft: '10px',
        }}
      >
        {text}
      </Typography>
    </>
  );
};

export default SubTopic;
