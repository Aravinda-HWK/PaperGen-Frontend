import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

const CreateClassroom = (props) => {
  const { onClose, open } = props;
  const [className, setClassName] = React.useState('');
  const [description, setDescription] = React.useState('');

  const handleClassNameChange = (event) => {
    setClassName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = () => {
    const classroomData = {
      className,
      description,
    };
    console.log('Classroom Data:', classroomData);
    onClose();
  };

  return (
    <Dialog
      onClose={onClose}
      open={open}
      sx={{ '& .MuiPaper-root': { borderRadius: '20px', width: '500px', height: '370px' } }}
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
