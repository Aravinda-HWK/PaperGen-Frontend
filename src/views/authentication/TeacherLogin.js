import React from 'react';
import { Grid, Box, Card, Stack, Typography } from '@mui/material';
import './Login.css';
// components
import PageContainer from 'src/components/container/PageContainer';
import TeacherAuthLogin from './auth/TeacherAuthLogin';
import logoImage from 'src/assets/images/logos/Black logo - no background.png';

const TeacherLogin = () => {
  return (
    <PageContainer title="Login" description="this is Login page">
      <Box
        sx={{
          backgroundImage: `url(https://4kwallpapers.com/images/wallpapers/glass-light-abstract-background-blue-background-3d-3840x2160-8742.jpg)`,
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
              <TeacherAuthLogin />
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
                    Welcome to PaperGen, the ultimate platform for educators and students to manage
                    and evaluate academic papers. Streamline your learning experience with easy
                    paper generation, submission tracking, and insightful feedback. Log in to get
                    started!
                  </p>
                </div>
              </div>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default TeacherLogin;
