import React, { useState } from 'react';
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Button,
  Typography,
  Container,
} from '@mui/material';

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
        {questions.map((question) => (
          <div key={question.id}>
            <Typography variant="h6">{question.content}</Typography>
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
                    label={option}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </div>
        ))}
        <Button type="submit" variant="contained" color="primary">
          Submit Quiz
        </Button>
      </form>
    </Container>
  );
};

export default Quiz;
