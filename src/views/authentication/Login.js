import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Box, Card, Stack, Typography } from '@mui/material';
import './Login.css';
// components
import PageContainer from 'src/components/container/PageContainer';
import AuthLogin from './auth/AuthLogin';
import logoImage from 'src/assets/images/logos/AReader3Dpublishers-reduced.png';
import backgroundImage from 'src/assets/images/backgrounds/loginBackground.jpg';

const Login2 = () => {
  const handleDownloadReader = () => {
    const apkPath = 'https://play.google.com/store/games?hl=en&gl=US';
    window.location.href = apkPath;
  };
  const handleDownloadAR = () => {
    const apkPath = 'https://play.google.com/store/games?hl=en&gl=US';
    // const apkPath = process.env.PUBLIC_URL + '/your-app.apk';
    window.location.href = apkPath;
  };

  return (
    <PageContainer title="Login" description="this is Login page">
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
            opacity: '0.3',
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
            {' '}
            <Card
              elevation={9}
              sx={{
                zIndex: 1,
                width: '100%',
                maxWidth: '1000px',
                marginLeft: '20px',
                marginRight: '12px',
                borderRadius: '12px',
              }}
            >
              <div className="container">
                <div className="wrapper">
                  <div className="banner-image"></div>
                  <h1>Interactive Book Reader</h1>
                  <p>
                    Unlock the World of Reading with Our All-in-One Book App! Explore a Multiverse
                    of Genres, Discover Word Meanings, Listen to Audio Books, and Dive into
                    Augmented Reality Adventures – All at Your Fingertips!
                  </p>
                </div>
                <div className="button-wrapper">
                  <button className="btn fill" onClick={handleDownloadReader}>
                    BOOK READER
                  </button>
                  <button className="btn fill" onClick={handleDownloadAR}>
                    AR READER
                  </button>
                </div>
              </div>
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
            <Card elevation={9} sx={{ p: 4, zIndex: 1, width: '100%', maxWidth: '500px' }}>
              <img src={logoImage} alt="Our Publications Logo" style={{ maxWidth: '100%' }} />
              <AuthLogin
                subtitle={
                  <Stack direction="row" spacing={1} justifyContent="center" mt={3}>
                    <Typography color="textSecondary" variant="h6" fontWeight="500">
                      Want to become a publisher?
                    </Typography>
                    <Typography
                      component={Link}
                      to="/auth/register"
                      fontWeight="500"
                      sx={{
                        textDecoration: 'none',
                        color: 'primary.main',
                      }}
                    >
                      Create an account
                    </Typography>
                  </Stack>
                }
              />
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Login2;
