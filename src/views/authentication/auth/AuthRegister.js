import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import LoadingNotification from 'src/components/LoadNotification/LoadingNotofication';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import { Stack } from '@mui/system';
import regitserpublisher from '../../../api/auth/register';
import { userSchema } from '../../../validations/UserValidation';
import swal from 'sweetalert';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const AuthRegister = ({ title, subtext }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessege, setErrorMessege] = useState('');
  const [loading, setLoading] = useState(false);

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
    // const loginData = {
    //   name: name,
    //   username: username,
    //   email: email,
    //   phonenumber: phoneNumber,
    //   password: password,
    // };
    // console.log(loginData);
    // const isValid = await userSchema.isValid(loginData);
    // const message = await userSchema.validate(loginData).catch((err) => {
    //   return err.message;
    // });
    // event.preventDefault();
    // if (!isValid) {
    //   setErrorMessege(message);
    // } else {
    //   setLoading(true);
    //   swal({
    //     title: 'Done!',
    //     text: 'Wait for sending OTP.',
    //     icon: 'info',
    //     timer: 5000,
    //     button: false,
    //   });
    //   try {
    //     const responseData = await regitserpublisher(loginData);
    //     if (responseData.message === 'OTP is sent successfully.') {
    //       console.log(responseData);
    //       window.location.href = `/auth/otpverification?id=${responseData.data.publisherId}&email=${responseData.data.email}`;
    //     } else {
    //       setLoading(false);
    //       setErrorMessege(responseData.message);
    //     }
    //   } catch (error) {
    //     console.log('Error', error);
    //   }
    // }
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
        {loading && <LoadingNotification />}
        <Typography style={{ color: 'red' }}>{errorMessege}</Typography>
      </Box>
      <Stack direction="row" justifyContent="center" spacing={1} mt={3}>
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
