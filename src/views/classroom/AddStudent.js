import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import addStudent from 'src/api/student/addStudent';
import { Typography } from '@mui/material';

const AddStudent = (props) => {
  const { onClose, open, id } = props;
  const [email, setEmail] = React.useState('');
  const [message, setMessage] = React.useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async () => {
    if (email === '') {
      setMessage('Please enter email address');
      return;
    }
    if (!email.includes('@') || !email.includes('.')) {
      setMessage('Please enter a valid email address');
      return;
    }
    setMessage('');
    const studentData = {
      email,
      classroomID: id,
    };
    const response = await addStudent(studentData);
    console.log(response);
    if (!response.error) {
      setMessage('Student Added Successfully');
      setTimeout(() => {
        setMessage('');
        window.location.reload();
      }, 1000);
      onClose();
    } else {
      setMessage(response.message);
      return;
    }
  };

  return (
    <Dialog
      onClose={onClose}
      open={open}
      sx={{ '& .MuiPaper-root': { borderRadius: '20px', width: '500px', height: '240px' } }}
    >
      <DialogTitle
        sx={{
          textAlign: 'center',
          fontWeight: 'bold',
        }}
      >
        Add Student to Classroom
      </DialogTitle>
      <DialogContent>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'left',
            alignItems: 'center',
            padding: '10px',
          }}
        >
          <TextField
            required
            id="email"
            label="Enter Email Address"
            fullWidth
            variant="outlined"
            value={email}
            onChange={handleEmailChange}
          />
          {message === '' ? null : (
            <Typography
              variant="caption"
              sx={{
                mt: 2,
                fontSize: '1rem', // Increase the font size
                color: 'blue', // Set the color to blue
                fontWeight: 'bold', // Make the text bold
              }}
            >
              {message}
            </Typography>
          )}
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Add Student</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddStudent;
