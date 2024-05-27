import { Box, Typography, Button, Stack } from '@mui/material';
import React, { useState } from 'react';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import resetPasswordFunction from 'src/api/auth/resetpassword';
import { resetPasswordSchema } from '../../../validations/ResetPassword';
import swal from 'sweetalert';

const AuthResetPassword = ({ title, subtitle, subtext, id, token }) => {
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    setError('');
    e.preventDefault();

    const data = {
      password: password,
      id: id,
      token: token,
    };

    const isValid = await resetPasswordSchema.isValid(data);
    const message = await resetPasswordSchema.validate(data).catch((err) => {
      return err.message;
    });
    console.log(data);
    if (!isValid) {
      setError(message);
    } else {
      try {
        const response = await resetPasswordFunction(data);
        if (response.message !== 'Password is updated successfully.') {
          setError(response.message);
        } else {
          swal({
            title: "Done!",
            text: "Password is updated successfully.",
            icon: "success",
            timer: 2000000,
            button: false
          })
        }
      } catch (error) {
        setError(error.message);
      }
    }
  };

  return (
    <form>
      {title ? (
        <Typography fontWeight="700" variant="h4" mb={1} align="center">
          {title}
        </Typography>
      ) : null}

      {subtext}

      <Stack>
        <Box>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="password"
            mb="5px"
          >
            New Password
          </Typography>
          <CustomTextField
            id="password"
            variant="outlined"
            type="password" // Set the input type to "password"
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
          />
        </Box>
      </Stack>
      <br />
      <Box>
        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          type="submit" // Use type="submit" to trigger form submission
          sx={{ backgroundColor: '#003566' }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Box>
      <Typography style={{ color: 'red' }}>{error}</Typography>
      {subtitle}
    </form>
  );
};

export default AuthResetPassword;
