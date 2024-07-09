import React, { useState } from 'react';
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Button,
  Typography,
  Container,
  Box,
} from '@mui/material';
import backGroundImage from 'src/assets/images/backgrounds/P9b2gR.jpg';

const Quiz = ({ questions, setAnswers, handleSubmit }) => {
  const [currentAnswers, setCurrentAnswers] = useState({});

  const handleChange = (questionId, answer) => {
    setCurrentAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setAnswers(currentAnswers);
    handleSubmit();
  };

  return (
    <Container>
      <form onSubmit={handleFormSubmit}>
        <div>
          {questions.map((question) => (
            <Box
              key={question.id}
              sx={{
                padding: 3,
                borderRadius: 5,
                boxShadow: 10,
                backgroundImage: `url(${backGroundImage})`,
                marginBottom: 3,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                {question.content}
              </Typography>
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label={question.content}
                  name={String(question.id)}
                  onChange={(e) => handleChange(question.id, e.target.value)}
                >
                  {question.sampleAnswer.map((option) => (
                    <FormControlLabel
                      key={option}
                      value={option}
                      control={<Radio />}
                      label={
                        <Typography variant="body1" sx={{ fontFamily: 'Arial, sans-serif' }}>
                          {option}
                        </Typography>
                      }
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </Box>
          ))}
        </div>
        <Button type="submit" variant="contained" color="primary">
          Submit Quiz
        </Button>
      </form>
    </Container>
  );
};

export default Quiz;
