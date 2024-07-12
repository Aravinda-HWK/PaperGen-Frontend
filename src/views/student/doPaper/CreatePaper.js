import React, { useState, useEffect } from 'react';
import { Container, Button, Typography, Box } from '@mui/material';
import { useParams } from 'react-router';
import getPaperGivenId from 'src/api/paper/getPaperGivenId';
import getQuestionPaper from 'src/api/question/getQuestionPaper';
import background from 'src/assets/images/backgrounds/cd3906fd55422cb3bc7db578b9c9a1b3.jpeg';
import submitPaper from 'src/api/paper/submitPaper';
import Quiz from './Quiz';
import moment from 'moment';
import Cookies from 'universal-cookie';
import jwt from 'jwt-decode';

const CreatePaper = () => {
  const [questions, setQuestions] = useState([]);
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false);
  const [paper, setPaper] = useState({});
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const { id } = useParams();
  const [studentId, setStudentId] = useState(null);
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);

  useEffect(() => {
    fetchQuestions();
    fetchUser();
  }, []);

  const fetchQuestions = async () => {
    const response = await getPaperGivenId(id);
    const questions = await getQuestionPaper(id);
    setQuestions(questions);
    setTotalQuestions(response.usedNumberOfQuestions);
    setPaper(response);
  };

  const fetchUser = async () => {
    try {
      const cookies = new Cookies();
      const token = cookies.get('student_token');
      const id = jwt(token).id;
      setStudentId(id);
    } catch (err) {
      window.location.href = '/auth/teacherLogin';
    }
  };

  const startQuiz = () => {
    console.log(paper.startTime, paper.endTime, new Date());

    // Convert startTime and endTime to Date objects
    const startTime = new Date(paper.startTime);
    const endTime = new Date(paper.endTime);
    const currentTime = new Date();

    // Check if the current time is within the start and end time of the quiz
    // if (currentTime < startTime || currentTime > endTime) {
    //   alert('Quiz is not available at the moment. Please check the start and end time.');
    //   return;
    // }

    // Calculate the duration by subtracting the start time from the end time
    setIsQuizStarted(true);

    // Set start and end times
    setStartTime(currentTime);
  };

  const handleAnswerChange = (currentAnswers) => {
    setAnswers(currentAnswers);
  };

  const handleSubmit = () => {
    setIsQuizSubmitted(true);
  };

  const formatDate = (date) => {
    return moment(date).format('MMMM Do YYYY, h:mm:ss a');
  };

  const setAnswers = async (currentAnswers) => {
    let userData = {};
    // Change the string to integer
    userData.paperID = parseInt(id);
    userData.studentID = parseInt(studentId);

    let answers = [];
    for (let i of questions) {
      // Corrected line
      let answer = {};
      answer.questionId = i.id;
      if (currentAnswers[i.id] === undefined) {
        answer.answer = '';
      } else {
        answer.answer = currentAnswers[i.id];
      }
      answers.push(answer);
    }
    userData.answer = answers;
    const response = await submitPaper(userData);
    setScore(response.score);
    setEndTime(new Date());
    console.log(response);
  };

  const calculatePercentage = () => {
    if (totalQuestions === 0) return 0;
    return ((score / totalQuestions) * 100).toFixed(2);
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
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          mt={4}
          p={2}
          borderRadius={4}
          boxShadow={3}
          bgcolor="background.paper"
        >
          <Typography variant="h5" gutterBottom>
            Quiz Submitted! Thank you.
          </Typography>
          <Typography variant="h6" color="primary">
            Start Time: {formatDate(startTime)}
          </Typography>
          <Typography variant="h6" color="primary">
            End Time: {formatDate(endTime)}
          </Typography>
          <Typography
            variant="h4"
            color="black"
            style={{
              fontWeight: 'bold',
              padding: '10px 20px',
              borderRadius: '8px',
              border: '2px solid',
              borderColor: '#f50057',
              marginTop: '10px',
            }}
          >
            Your score: {calculatePercentage()}%
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default CreatePaper;
