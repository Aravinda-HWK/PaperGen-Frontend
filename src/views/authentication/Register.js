import React from 'react';
import { Grid, Box, Card } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import AuthRegister from './auth/AuthRegister';
import backgroundImage from 'src/assets/images/backgrounds/glass-light-abstract-background-blue-background-3d-5120x2880-8738.jpg';
import logoImage from 'src/assets/images/logos/Black logo - no background.png';
import './Register.css';

const Register = () => (
  <PageContainer title="Register" description="this is Register page">
    <Box
      sx={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        '&:before': {
          content: '""',
          background: 'radial-gradient(#d2f1df, #d3d7fa, #bad8f4)',
          backgroundSize: '400% 400%',
          animation: 'gradient 15s ease infinite',
          position: 'absolute',
          height: '100%',
          width: '100%',
          opacity: '0.1',
        },
      }}
    >
      <Grid container spacing={0} justifyContent="auto" sx={{ height: '100vh' }}>
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Card
            elevation={20}
            sx={{
              p: 4,
              zIndex: 1,
              width: '100%',
              maxWidth: '500px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              borderRadius: '20px',
            }}
          >
            <img src={logoImage} alt="Our Company Logo" style={{ maxWidth: '50%' }} />

            <AuthRegister />
          </Card>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          {' '}
          <Card
            elevation={20}
            sx={{
              zIndex: 1,
              width: '100%',
              maxWidth: '1000px',
              marginLeft: '20px',
              marginRight: '12px',
              borderRadius: '20px',
            }}
          >
            <div className="container">
              <div className="wrapper">
                <div className="banner-image"></div>
                <h1>PaperGen</h1>
                <p>
                  Welcome to PaperGen! Join our platform to simplify the process of generating,
                  submitting, and evaluating academic papers. Create your account today and
                  experience seamless classroom management and insightful feedback. Sign up to start
                  enhancing your educational journey!
                </p>
              </div>
            </div>
          </Card>
        </Grid>
      </Grid>
    </Box>
  </PageContainer>
);

export default Register;
