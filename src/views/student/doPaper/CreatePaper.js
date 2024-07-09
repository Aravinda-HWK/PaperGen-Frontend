import React, { useState, useEffect } from 'react';
import { Container, Button, Typography, Box } from '@mui/material';
import { useParams } from 'react-router';
import getPaperGivenId from 'src/api/paper/getPaperGivenId';
import getQuestionPaper from 'src/api/question/getQuestionPaper';
import background from 'src/assets/images/backgrounds/cd3906fd55422cb3bc7db578b9c9a1b3.jpeg';
import Quiz from './Quiz';
import moment from 'moment';

const CreatePaper = () => {
  const [questions, setQuestions] = useState([]);
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false);
  const [answers, setAnswers] = useState({});
  const [paper, setPaper] = useState({});
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    const response = await getPaperGivenId(id);
    const questions = await getQuestionPaper(id);
    setQuestions(questions);
    console.log(questions);
    setPaper(response);
  };

  const startQuiz = () => {
    console.log(paper.startTime, paper.endTime, new Date());

    // Convert startTime and endTime to Date objects
    const startTime = new Date(paper.startTime);
    const endTime = new Date(paper.endTime);
    const currentTime = new Date();

    // Check if the current time is within the start and end time of the quiz
    if (currentTime < startTime || currentTime > endTime) {
      alert('Quiz is not available at the moment. Please check the start and end time.');
      return;
    }

    // Calculate the duration by subtracting the start time from the end time
    const duration = endTime - startTime;
    setIsQuizStarted(true);

    // Set start and end times
    setStartTime(currentTime);
    setEndTime(new Date(currentTime.getTime() + duration));
  };

  const handleAnswerChange = (currentAnswers) => {
    setAnswers(currentAnswers);
  };

  const handleSubmit = () => {
    setIsQuizSubmitted(true);
    console.log(answers);
  };

  const formatDate = (date) => {
    return moment(date).format('MMMM Do YYYY, h:mm:ss a');
  };

  return (
    <Container>
      {!isQuizStarted && !isQuizSubmitted && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '120vh', // Full viewport height to center vertically
            backgroundImage: `url(${background})`, // Background image
          }}
        >
          <Box
            sx={{
              padding: 4, // Padding inside the box
              borderRadius: 3, // Border radius
              boxShadow: 10, // Elevation level, equivalent to boxShadow: theme.shadows[3]
              backgroundColor: 'white', // Background color of the box
              maxWidth: 400, // Optional: max width of the box
              textAlign: 'center', // Optional: center text inside the box
            }}
          >
            <Typography variant="h4" gutterBottom>
              Quiz Information
            </Typography>
            <Typography variant="body1">
              <b> Number of Questions:</b> {paper.usedNumberOfQuestions}
            </Typography>
            <Typography variant="body1">
              <b>Start Time:</b> {formatDate(paper.startTime)}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                marginBottom: 2,
              }}
            >
              <b>End Time:</b> {formatDate(paper.endTime)}
            </Typography>
            <Button variant="contained" color="primary" onClick={startQuiz}>
              Start Quiz
            </Button>
          </Box>
        </Box>
      )}
      {isQuizStarted && !isQuizSubmitted && (
        <Quiz questions={questions} setAnswers={handleAnswerChange} handleSubmit={handleSubmit} />
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
