import React, { useState, useEffect } from 'react';
import { Box, Fab, CircularProgress } from '@mui/material';
import { Check } from '@mui/icons-material';
import { green } from '@mui/material/colors';
import { Save } from '@mui/icons-material';
import UpdateData from 'src/api/classroom/updateData';

const UserAction = ({ params, rowId, setRowId }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const { id, ...data } = params.row;
    const sendData = {
      ...data,
      id: id,
    };
    console.log(sendData);
    const response = await UpdateData(sendData);
    console.log(response);
    if (response.message === 'User data is updated successfully.') {
      setSuccess(true);
      setRowId(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (rowId === params.id && success) {
      setSuccess(false);
    }
  }, [rowId]);
  return (
    <>
      <Box
        sx={{
          m: 1,
          position: 'relative',
        }}
      >
        {success ? (
          <Fab
            color="primary"
            sx={{
              width: 40,
              height: 40,
              bgcolor: green[500],
              '&:hover': { bgcolor: green[700] },
            }}
          >
            <Check />
          </Fab>
        ) : (
          <Fab
            color="primary"
            sx={{
              width: '40px',
              height: '40px',
            }}
            disabled={params.id !== rowId || loading}
            onClick={handleSubmit}
          >
            <Save />
          </Fab>
        )}
        {loading && (
          <CircularProgress
            size={52}
            sx={{
              color: green[500],
              position: 'absolute',
              top: -6,
              left: -6,
              zIndex: 1,
            }}
          />
        )}
      </Box>
    </>
  );
};

export default UserAction;
