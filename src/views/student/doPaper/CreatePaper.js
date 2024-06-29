import React, { useState, useEffect } from 'react';
import { Container, Button, Typography, Box } from '@mui/material';
import { useParams } from 'react-router';
import Quiz from './Quiz';

const CreatePaper = () => {
  const [questions, setQuestions] = useState([]);
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false);
  const [answers, setAnswers] = useState({});
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    // Fetch questions from the database (mocked here)
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    // Replace with your actual API call
    const response = await fetch('/api/questions');
    const data = await response.json();
    setQuestions(data);
  };

  const startQuiz = () => {
    setIsQuizStarted(true);
    const now = new Date();
    setStartTime(now);
    setEndTime(new Date(now.getTime() + 30 * 60000)); // Assuming a 30 minute quiz duration
  };

  const handleSubmit = () => {
    setIsQuizSubmitted(true);
    // Handle submission logic here, e.g., send answers to the backend
    console.log('Submitted answers:', answers);
  };

  return (
    <Container>
      {!isQuizStarted && !isQuizSubmitted && (
        <Box>
          <Typography variant="h4" gutterBottom>
            Quiz Information
          </Typography>
          <Typography variant="body1">Number of Questions: {questions.length}</Typography>
          <Typography variant="body1">Quiz Duration: 30 minutes</Typography>
          <Button variant="contained" color="primary" onClick={startQuiz}>
            Start Quiz
          </Button>
        </Box>
      )}
      {isQuizStarted && !isQuizSubmitted && (
        <Quiz questions={questions} setAnswers={setAnswers} handleSubmit={handleSubmit} />
      )}
      {isQuizSubmitted && (
        <Typography variant="h5" gutterBottom>
          Quiz Submitted! Thank you.
        </Typography>
      )}
    </Container>
  );
};

export default CreatePaper;
