import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';

const Header = () => {
  const handleLogin = () => {
    window.location.href = '/auth/teacherLogin';
  };

  const handleRegister = () => {
    window.location.href = '/auth/register';
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          PaperGen
        </Typography>
        <Button color="inherit" onClick={handleLogin}>
          Login
        </Button>
        <Button color="inherit" onClick={handleRegister}>
          Register
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
