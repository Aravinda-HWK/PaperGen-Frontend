import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import { Stack } from '@mui/system';
import regitserTeacher from '../../../api/auth/registerTeacher';
import registerStudent from '../../../api/auth/registerStudent';
import { userSchema } from '../../../validations/UserValidation';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const AuthRegister = ({ title, subtext }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessege, setErrorMessege] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const [alignment, setAlignment] = useState('Teacher');

  const handleChange = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  const handleRegisterSubmit = async (event) => {
    event.preventDefault();
    setErrorMessege('');
    const loginData = {
      email: email,
      password: password,
    };
    try {
      await userSchema.validate(loginData, { abortEarly: false });

      if (alignment === 'Teacher') {
        try {
          const responseData = await regitserTeacher(loginData);
          if (responseData.error) {
            setErrorMessege(responseData.message);
            return;
          }
          window.location.href = `/auth/teacherLogin`;
        } catch (error) {
          setErrorMessege(error.errors[0]);
          return;
        }
      } else {
        try {
          const responseData = await registerStudent(loginData);
          if (responseData.error) {
            setErrorMessege(responseData.message);
            return;
          }
          window.location.href = `/auth/teacherLogin`;
        } catch (error) {
          setErrorMessege(error.errors[0]);
          return;
        }
      }
    } catch (error) {
      setErrorMessege(error.errors[0]);
      event.preventDefault();
      return;
    }
  };

  return (
    <form onSubmit={handleRegisterSubmit}>
      {title ? (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ToggleButtonGroup
          color="primary"
          value={alignment}
          exclusive
          onChange={handleChange}
          aria-label="Platform"
        >
          <ToggleButton value="Teacher">Teacher</ToggleButton>
          <ToggleButton value="Student">Student</ToggleButton>
        </ToggleButtonGroup>
      </div>
      <Typography
        fontWeight="700"
        variant="h6"
        mb={1}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '10px',
          fontFamily: 'Roboto',
        }}
      >
        Join PaperGen! Create your {alignment} account.
      </Typography>
      <Box>
        <Typography
          variant="subtitle1"
          fontWeight={600}
          component="label"
          htmlFor="email"
          mb="25px"
        >
          Email Address
        </Typography>
        <CustomTextField id="email" variant="outlined" fullWidth onChange={handleEmailChange} />

        <Typography
          variant="subtitle1"
          fontWeight={600}
          component="label"
          htmlFor="password"
          mb="5px"
        >
          Password
        </Typography>
        <CustomTextField
          id="password"
          variant="outlined"
          fullWidth
          onChange={handlePasswordChange}
          type="password" // Set the input type to "password"
        />

        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          type="submit" // Use type="submit" to trigger form submission
          sx={{ backgroundColor: '#003566', mt: 3 }}
        >
          Sign Up
        </Button>
        <Typography style={{ color: 'red', paddingTop: '10px' }}>{errorMessege}</Typography>
      </Box>
      <Stack direction="row" justifyContent="center" spacing={1} mt={2}>
        <Typography color="textSecondary" variant="h6" fontWeight="400">
          I have an account already.
        </Typography>
        <Typography
          component={Link}
          to="/auth/teacherLogin"
          fontWeight="500"
          sx={{
            textDecoration: 'none',
            color: 'primary.main',
          }}
        >
          Sign In
        </Typography>
      </Stack>
    </form>
  );
};

export default AuthRegister;
