import React, { useState, useEffect } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import BackgoundImage from 'src/assets/images/Paper/light-background-ikyjig15tfb42tv5.jpg';
import { getAuthToken } from '../authentication/auth/TeacherAuthLogin';
import getClassrroms from 'src/api/classroom/getClassrroms';
import createPaper from 'src/api/paper/createPaper';
import jwt from 'jwt-decode';

const CreatePaper = () => {
  const [paper, setPaper] = useState({
    name: '',
    description: '',
    numberOfQuestions: '',
    startTime: '',
    endTime: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [classrooms, setClassrooms] = useState([]);
  const [selectedClassroom, setSelectedClassroom] = useState('');
  const [selectedClassroomIndex, setSelectedClassroomIndex] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaper({ ...paper, [name]: value });
  };

  const handleClassroomChange = (event) => {
    const selectedValue = event.target.value;
    const [selectedIndex, selectedName] = selectedValue.split('-');
    setSelectedClassroom(selectedName);
    setSelectedClassroomIndex(selectedIndex);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name: paper.name,
      description: paper.description,
      numberOfQuestions: Number(paper.numberOfQuestions),
      startTime: paper.startTime,
      endTime: paper.endTime,
      classroomId: classrooms[selectedClassroomIndex].id,
    };
    console.log(data);
    const response = await createPaper(data);
    if (!response.error) {
      setSubmitted(true);
      setError('');
    } else {
      setError(response.error);
    }
  };

  const fetchData = async () => {
    try {
      const token = getAuthToken();
      const id = jwt(token).id;
      const data = await getClassrroms(id);
      setClassrooms(data);
    } catch (err) {
      window.location.href = '/auth/teacherLogin';
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <PageContainer title="Create Paper" description="Create a new paper">
      <Container
        maxWidth="md"
        sx={{
          backgroundImage: `url(${BackgoundImage})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Create Paper
        </Typography>
        <Paper elevation={20} style={{ padding: '2rem', marginBottom: '2rem' }}>
          <form onSubmit={handleSubmit}>
            <FormControl
              variant="outlined"
              fullWidth
              margin="normal"
              required
              sx={{ padding: '0.5rem', backgroundColor: 'rgba(0, 0, 0, 0.05)' }}
            >
              <InputLabel id="correct-answer-label">Classroom Names</InputLabel>
              <Select
                labelId="correct-answer-label"
                value={`${selectedClassroomIndex}-${selectedClassroom}`}
                onChange={handleClassroomChange}
                label="Classroom Names"
              >
                {classrooms.map((classroom, index) => (
                  <MenuItem key={index} value={`${index}-${classroom.name}`}>
                    {classroom.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box marginBottom={2}>
              <Paper
                elevation={5}
                sx={{ padding: '0.5rem', backgroundColor: 'rgba(0, 0, 0, 0.05)' }}
              >
                <TextField
                  label="Name"
                  variant="outlined"
                  fullWidth
                  name="name"
                  value={paper.name}
                  onChange={handleChange}
                  required
                />
              </Paper>
            </Box>
            <Box marginBottom={2}>
              <Paper
                elevation={5}
                sx={{ padding: '0.5rem', backgroundColor: 'rgba(0, 0, 0, 0.05)' }}
              >
                <TextField
                  label="Description"
                  variant="outlined"
                  fullWidth
                  name="description"
                  value={paper.description}
                  onChange={handleChange}
                  required
                />
              </Paper>
            </Box>
            <Box marginBottom={2}>
              <Paper
                elevation={5}
                sx={{ padding: '0.5rem', backgroundColor: 'rgba(0, 0, 0, 0.05)' }}
              >
                <TextField
                  label="Number of Questions"
                  variant="outlined"
                  fullWidth
                  type="number"
                  name="numberOfQuestions"
                  value={paper.numberOfQuestions}
                  onChange={handleChange}
                  required
                />
              </Paper>
            </Box>
            <Box marginBottom={2}>
              <Paper
                elevation={5}
                sx={{ padding: '0.5rem', backgroundColor: 'rgba(0, 0, 0, 0.05)' }}
              >
                <TextField
                  label="Start Time"
                  variant="outlined"
                  fullWidth
                  type="datetime-local"
                  name="startTime"
                  value={paper.startTime}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  required
                />
              </Paper>
            </Box>
            <Box marginBottom={2}>
              <Paper
                elevation={5}
                sx={{ padding: '0.5rem', backgroundColor: 'rgba(0, 0, 0, 0.05)' }}
              >
                <TextField
                  label="End Time"
                  variant="outlined"
                  fullWidth
                  type="datetime-local"
                  name="endTime"
                  value={paper.endTime}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  required
                />
              </Paper>
            </Box>
            {error && (
              <Typography variant="body1" color="error">
                {error}
              </Typography>
            )}

            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </form>
        </Paper>
        {submitted && (
          <Paper
            elevation={20}
            sx={{
              padding: '2rem',
              marginTop: '2rem',
              backgroundColor: '#f9f9f9',
              borderRadius: '8px',
              border: '1px solid #ddd',
            }}
          >
            <Typography variant="h6" component="h2" gutterBottom>
              Submitted Paper
            </Typography>
            <Box sx={{ marginBottom: '1rem' }}>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                Name:
              </Typography>
              <Typography variant="body2" sx={{ marginLeft: '1rem' }}>
                {paper.name}
              </Typography>
            </Box>
            <Box sx={{ marginBottom: '1rem' }}>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                Description:
              </Typography>
              <Typography variant="body2" sx={{ marginLeft: '1rem' }}>
                {paper.description}
              </Typography>
            </Box>
            <Box sx={{ marginBottom: '1rem' }}>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                Number of Questions:
              </Typography>
              <Typography variant="body2" sx={{ marginLeft: '1rem' }}>
                {paper.numberOfQuestions}
              </Typography>
            </Box>
            <Box sx={{ marginBottom: '1rem' }}>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                Start Time:
              </Typography>
              <Typography variant="body2" sx={{ marginLeft: '1rem' }}>
                {new Date(paper.startTime).toLocaleString()}
              </Typography>
            </Box>
            <Box sx={{ marginBottom: '1rem' }}>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                End Time:
              </Typography>
              <Typography variant="body2" sx={{ marginLeft: '1rem' }}>
                {new Date(paper.endTime).toLocaleString()}
              </Typography>
            </Box>
          </Paper>
        )}
      </Container>
    </PageContainer>
  );
};

export default CreatePaper;
