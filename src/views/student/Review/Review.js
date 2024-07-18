import React, { useEffect, useState } from 'react';
import { Container, Typography, Card, CardContent, Grid, Box } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { green, red } from '@mui/material/colors';
import { useParams } from 'react-router';
import { getReview } from 'src/api/paper/getReview';
import getAnalysis from 'src/api/paper/getAnalysis';
import Button from '@mui/material/Button';

const ReviewPaper = () => {
  const [answers, setAnswers] = useState([]);
  const [paperName, setPaperName] = useState('');
  const [analysis, setAnalysis] = useState({});
  const { id } = useParams();

  useEffect(async () => {
    // Fetch the review data
    const response = await getReview(id);

    // Convert the given response to the required format
    const fetchedAnswers = response.questions.map((question, index) => ({
      question: question,
      correctAnswer: response.realAnswers[index],
      userAnswer: response.answers[index],
      isCorrect: response.answers[index] === response.realAnswers[index],
    }));
    setPaperName(response.paperName);
    setAnswers(fetchedAnswers);
  }, [id]);

  const handleAnalysis = async (question, index, correctAnswer) => {
    console.log(question);
    const analysisResult = await getAnalysis(question, correctAnswer);
    console.log(analysisResult);
    setAnalysis((prev) => ({ ...prev, [index]: analysisResult.answer }));
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ textAlign: 'center', my: 4 }}>
        <Typography variant="h4" component="h1">
          Review Paper: {paperName}
        </Typography>
      </Box>
      <Grid container spacing={4}>
        {answers.map((answer, index) => (
          <Grid item xs={12} key={index}>
            <Card
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: answer.isCorrect ? green[50] : red[50],
                mb: 2,
              }}
            >
              <CardContent sx={{ width: '100%' }}>
                <Typography variant="h6" component="h2">
                  {answer.question}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  Correct Answer: {answer.correctAnswer}
                </Typography>
                <Typography variant="body1">Your Answer: {answer.userAnswer}</Typography>
              </CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', mb: 2 }}>
                {answer.isCorrect ? (
                  <CheckCircleIcon sx={{ color: green[500], fontSize: 40 }} />
                ) : (
                  <CancelIcon sx={{ color: red[500], fontSize: 40 }} />
                )}
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', mb: 2 }}>
                <Button
                  variant="contained"
                  onClick={() => handleAnalysis(answer.question, index, answer.correctAnswer)}
                  sx={{
                    backgroundColor: '#000',
                    color: '#fff',
                    fontSize: '14px',
                    padding: '8px 16px',
                    '&:hover': {
                      backgroundColor: '#333',
                    },
                  }}
                >
                  Get Analysis
                </Button>
              </Box>
              {analysis[index] && (
                <CardContent sx={{ width: '100%', backgroundColor: '#f5f5f5', p: 2 }}>
                  <Typography variant="body2" color="textSecondary">
                    Analysis: {analysis[index]}
                  </Typography>
                </CardContent>
              )}
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Button
          variant="contained"
          onClick={() => (window.location.href = '/student/result')}
          sx={{
            backgroundColor: '#000',
            color: '#fff',
            fontSize: '16px',
            padding: '10px 20px',
            '&:hover': {
              backgroundColor: '#333',
            },
          }}
        >
          Finish Review
        </Button>
      </Box>
    </Container>
  );
};

export default ReviewPaper;
