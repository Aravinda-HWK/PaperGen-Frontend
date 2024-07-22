import React, { useState, useEffect } from 'react';
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
import BackgoundImage from 'src/assets/images/Paper/pexels-didsss-3527796.jpg';
import getPapers from 'src/api/paper/getPapers';
import createQuestion from 'src/api/question/createQuestion';
import correctQuestion from 'src/api/question/getCorrectQuestion';
import jwt from 'jwt-decode';
import Cookies from 'universal-cookie';

const QuestionComponent = () => {
  const [question, setQuestion] = useState('');
  const [answers, setAnswers] = useState(Array(5).fill(''));
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [papers, setPapers] = useState([]);
  const [selectedPaper, setSelectedPaper] = useState('');
  const [numberOfQuestions, setNumberOfQuestions] = useState(0);
  const [message, setMessage] = useState('');
  const [suggestedQuestion, setSuggestedQuestion] = useState('');
  const [showCorrections, setShowCorrections] = useState(false);

  const fetchData = async () => {
    try {
      const cookies = new Cookies();
      const token = cookies.get('token');
      const id = jwt(token).id;
      const data = await getPapers({ teacherId: id });
      setPapers(data);
    } catch (err) {
      window.location.href = '/auth/teacherLogin';
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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

  const handlePaperChange = (e) => {
    const selectedPaperId = e.target.value;
    const paper = papers.find((p) => p.id === selectedPaperId);
    setSelectedPaper(selectedPaperId);
    setNumberOfQuestions(paper.numberOfQuestions);
  };

  const handleCheckGrammar = async () => {
    try {
      const data = await correctQuestion({
        question,
      });
      setSuggestedQuestion(data.answer);
      setShowCorrections(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAcceptCorrections = () => {
    setQuestion(suggestedQuestion);
    setShowCorrections(false);
  };

  const handleRejectCorrections = () => {
    setShowCorrections(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    const data = {
      content: question,
      sampleAnswer: answers,
      correctAnswer,
      paperId: selectedPaper,
    };
    const response = await createQuestion(data);
    if (!response.error) {
      setSubmitted(true);
      setMessage('Question is created successfully!');
    } else {
      setSubmitted(false);
    }
  };

  return (
    <PageContainer title="Paper" description="this is Paper Page">
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
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{
            color: '#000',
            fontWeight: 'bold',
            textShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
          }}
        >
          Create Question
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
              <InputLabel id="paper-select-label">Select Paper</InputLabel>
              <Select
                labelId="paper-select-label"
                value={selectedPaper}
                onChange={handlePaperChange}
                label="Select Paper"
              >
                {papers.map((paper) => (
                  <MenuItem key={paper.id} value={paper.id}>
                    {paper.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {selectedPaper && (
              <Box marginBottom={2}>
                <Typography variant="body1">
                  Number of Available Questions: {numberOfQuestions}
                </Typography>
              </Box>
            )}
            <Box marginBottom={2}>
              <Paper
                elevation={5}
                sx={{ padding: '0.5rem', backgroundColor: 'rgba(0, 0, 0, 0.05)' }}
              >
                <TextField
                  label="Question"
                  variant="outlined"
                  fullWidth
                  value={question}
                  onChange={handleQuestionChange}
                  required
                  multiline
                />
              </Paper>
            </Box>
            {answers.map((answer, index) => (
              <Box key={index} marginBottom={2}>
                <Paper
                  elevation={5}
                  sx={{ padding: '0.5rem', backgroundColor: 'rgba(0, 0, 0, 0.05)' }}
                >
                  <TextField
                    label={`Answer ${index + 1}`}
                    variant="outlined"
                    fullWidth
                    value={answer}
                    onChange={(e) => handleAnswerChange(index, e)}
                    required
                  />
                </Paper>
              </Box>
            ))}
            <FormControl
              variant="outlined"
              fullWidth
              margin="normal"
              required
              sx={{ padding: '0.5rem', backgroundColor: 'rgba(0, 0, 0, 0.05)' }}
            >
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
            <Box marginBottom={2}>
              <Typography variant="body1" sx={{ color: 'green' }}>
                {message}
              </Typography>
            </Box>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleCheckGrammar}
              sx={{ marginLeft: '1rem' }}
            >
              Check Grammar
            </Button>
          </form>
        </Paper>
        {showCorrections && (
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
              Suggested Corrections
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: '1rem' }}>
              Original Question: {question}
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: '1rem' }}>
              Corrected Question: {suggestedQuestion}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{ marginRight: '1rem' }}
              onClick={handleAcceptCorrections}
            >
              Accept Corrections
            </Button>
            <Button variant="contained" color="secondary" onClick={handleRejectCorrections}>
              Reject Corrections
            </Button>
          </Paper>
        )}
      </Container>
    </PageContainer>
  );
};

export default QuestionComponent;
