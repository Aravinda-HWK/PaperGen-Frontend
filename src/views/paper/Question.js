import React, { useState } from 'react';
import PageContainer from 'src/components/container/PageContainer';
import {
  Container,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  Box,
  Button,
  Paper,
} from '@mui/material';

const QuestionComponent = () => {
  const [question, setQuestion] = useState('');
  const [answers, setAnswers] = useState(Array(5).fill(''));
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleAnswerChange = (index, e) => {
    const newAnswers = answers.slice();
    newAnswers[index] = e.target.value;
    setAnswers(newAnswers);
  };

  const handleCorrectAnswerChange = (e) => {
    setCorrectAnswer(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Handle form submission, e.g., save to a server or display the data
  };

  return (
    <PageContainer title="Paper" description="this is Paper Page">
      <Container maxWidth="md">
        <Paper elevation={3} style={{ padding: '2rem', marginBottom: '2rem' }}>
          <form onSubmit={handleSubmit}>
            <Box marginBottom={4}>
              <TextField
                label="Question"
                variant="outlined"
                fullWidth
                value={question}
                onChange={handleQuestionChange}
                required
                multiline
              />
            </Box>
            {answers.map((answer, index) => (
              <Box key={index} marginBottom={2}>
                <TextField
                  label={`Answer ${index + 1}`}
                  variant="outlined"
                  fullWidth
                  value={answer}
                  onChange={(e) => handleAnswerChange(index, e)}
                  required
                />
              </Box>
            ))}
            <FormControl variant="outlined" fullWidth margin="normal" required>
              <InputLabel id="correct-answer-label">Correct Answer</InputLabel>
              <Select
                labelId="correct-answer-label"
                value={correctAnswer}
                onChange={handleCorrectAnswerChange}
                label="Correct Answer"
              >
                {answers.map((answer, index) => (
                  <MenuItem key={index} value={answer}>
                    {answer || `Answer ${index + 1}`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </form>
        </Paper>
        {submitted && (
          <Paper elevation={3} style={{ padding: '2rem' }}>
            <Typography variant="h6" component="h2" gutterBottom>
              Submitted Question and Answers
            </Typography>
            <Typography variant="body1">
              <strong>Question:</strong> {question}
            </Typography>
            <Typography variant="body1">
              <strong>Answers:</strong>
            </Typography>
            <ul>
              {answers.map((answer, index) => (
                <li key={index}>{answer}</li>
              ))}
            </ul>
            <Typography variant="body1">
              <strong>Correct Answer:</strong> {correctAnswer}
            </Typography>
          </Paper>
        )}
      </Container>
    </PageContainer>
  );
};

export default QuestionComponent;
