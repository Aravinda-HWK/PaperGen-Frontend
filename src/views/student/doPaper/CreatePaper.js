import React, { useState, useEffect } from 'react';
import { Container, Button, Typography, Box } from '@mui/material';
import { useParams } from 'react-router';
import getPaperGivenId from 'src/api/paper/getPaperGivenId';
import getQuestionPaper from 'src/api/question/getQuestionPaper';
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
    setIsQuizStarted(true);
    const now = new Date();
    setStartTime(now);
    setEndTime(new Date(now.getTime() + 30 * 60000)); // 30-minute quiz duration
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
        <Box>
          <Typography variant="h4" gutterBottom>
            Quiz Information
          </Typography>
          <Typography variant="body1">
            Number of Questions: {paper.usedNumberOfQuestions}
          </Typography>
          <Typography variant="body1">Start Time: {formatDate(paper.startTime)}</Typography>
          <Typography variant="body1">End Time: {formatDate(paper.endTime)}</Typography>
          <Button variant="contained" color="primary" onClick={startQuiz}>
            Start Quiz
          </Button>
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
