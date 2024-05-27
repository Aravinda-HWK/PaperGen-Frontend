import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import LoadingNotification from 'src/components/LoadNotification/LoadingNotofication';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import { Stack } from '@mui/system';
import regitserpublisher from '../../../api/auth/register';
import { userSchema } from '../../../validations/UserValidation';
import swal from 'sweetalert';

const AuthRegister = ({ title, subtitle, subtext }) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessege, setErrorMessege] = useState('');
  const [loading, setLoading] = useState(false);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRegisterSubmit = async (event) => {
    const loginData = {
      name: name,
      username: username,
      email: email,
      phonenumber: phoneNumber,
      password: password,
    };
    console.log(loginData);
    const isValid = await userSchema.isValid(loginData);
    const message = await userSchema.validate(loginData).catch((err) => {
      return err.message;
    });
    event.preventDefault();
    if (!isValid) {
      setErrorMessege(message);
    } else {
      setLoading(true);
      swal({
        title: "Done!",
        text: "Wait for sending OTP.",
        icon: "info",
        timer: 5000,
        button: false
      })
      try {
        const responseData = await regitserpublisher(loginData);

        if (responseData.message === 'OTP is sent successfully.') {
          console.log(responseData);
          window.location.href = `/auth/otpverification?id=${responseData.data.publisherId}&email=${responseData.data.email}`;
        } else {
          setLoading(false);
          setErrorMessege(responseData.message);
        }
      } catch (error) {
        console.log('Error', error);
      }
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

      <Box>
        <Stack mb={5}>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="name"
            mb="5px"
          >
            Name
          </Typography>
          <CustomTextField id="name" variant="outlined" fullWidth onChange={handleNameChange} />

          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="name"
            mb="5px"
          >
            Username
          </Typography>
          <CustomTextField id="name" variant="outlined" fullWidth onChange={handleUsernameChange} />

          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="email"
            mb="5px"
            mt="25px"
          >
            Email Address
          </Typography>
          <CustomTextField id="email" variant="outlined" fullWidth onChange={handleEmailChange} />

          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="email"
            mb="5px"
            mt="25px"
          >
            Phone Number
          </Typography>
          <CustomTextField
            id="email"
            variant="outlined"
            fullWidth
            onChange={handlePhoneNumberChange}
          />

          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="password"
            mb="5px"
            mt="25px"
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
        </Stack>
        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          type="submit" // Use type="submit" to trigger form submission
          sx={{ backgroundColor: '#003566' }}
        >
          Sign Up
        </Button>
        {loading && <LoadingNotification />}
        <Typography style={{ color: 'red' }}>{errorMessege}</Typography>
      </Box>
      {subtitle}
    </form>
  );
};

export default AuthRegister;
