import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import createClassroom from 'src/api/classroom/createClassrrom';
import { Typography } from '@mui/material';

const CreateClassroom = (props) => {
  const { onClose, open, id } = props;
  const [className, setClassName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [message, setMessage] = React.useState('');

  const handleClassNameChange = (event) => {
    setClassName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = async () => {
    if (className === '') {
      setMessage('Classroom name is required');
      return;
    }
    setMessage('');
    const classroomData = {
      name: className,
      description: description,
      teacherID: id,
    };
    const response = await createClassroom(classroomData);
    if (!response.error) {
      setMessage('Classroom created successfully');
      setTimeout(() => {
        setMessage('');
        window.location.reload();
      }, 1000);
    }
    onClose();
  };

  return (
    <Dialog
      onClose={onClose}
      open={open}
      sx={{ '& .MuiPaper-root': { borderRadius: '20px', width: '500px', height: '380px' } }}
    >
      <DialogTitle
        sx={{
          textAlign: 'center',
          fontWeight: 'bold',
        }}
      >
        Create Classroom
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
            id="classroom-name"
            label="Enter classroom name"
            fullWidth
            variant="outlined"
            value={className}
            onChange={handleClassNameChange}
            sx={{ mb: 2 }}
          />
          <TextField
            id="classroom-description"
            label="Enter description"
            fullWidth
            variant="outlined"
            multiline
            rows={4}
            value={description}
            onChange={handleDescriptionChange}
            sx={{ mt: 2 }}
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
        <Button onClick={handleSubmit}>Create</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateClassroom;
