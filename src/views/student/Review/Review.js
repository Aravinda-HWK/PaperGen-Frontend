import React, { useEffect, useState } from 'react';
import { Container, Typography, Card, CardContent, Grid, Box } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { green, red } from '@mui/material/colors';
import { useParams } from 'react-router';
import { getReview } from 'src/api/paper/getReview';
import { set } from 'lodash';

const ReviewPaper = () => {
  const [answers, setAnswers] = useState([]);
  const [paperName, setPaperName] = useState('');
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
  }, []);

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
                alignItems: 'center',
                backgroundColor: answer.isCorrect ? green[50] : red[50],
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" component="h2">
                  {answer.question}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  Correct Answer: {answer.correctAnswer}
                </Typography>
                <Typography variant="body1">Your Answer: {answer.userAnswer}</Typography>
              </CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', pr: 2 }}>
                {answer.isCorrect ? (
                  <CheckCircleIcon sx={{ color: green[500], fontSize: 40 }} />
                ) : (
                  <CancelIcon sx={{ color: red[500], fontSize: 40 }} />
                )}
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ReviewPaper;
