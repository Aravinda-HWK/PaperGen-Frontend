import React from 'react';
import { Grid, Box, Card } from '@mui/material';

// components
import PageContainer from 'src/components/container/PageContainer';
import AuthLogin from './auth/AuthResetPassword';
import logoImage from 'src/assets/images/logos/Black logo - no background.png';
import backgroundImage from 'src/assets/images/backgrounds/books-beach.jpg';
import { useParams } from 'react-router-dom';

const ResetPassword = () => {
  let { id, token } = useParams();
  return (
    <PageContainer title="Reset Password" description="this is Reset Password page">
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
        <Grid container spacing={0} justifyContent="center" sx={{ height: '100vh' }}>
          <Grid
            item
            xs={12}
            sm={12}
            lg={4}
            xl={3}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Card elevation={9} sx={{ p: 4, zIndex: 1, width: '100%', maxWidth: '500px' }}>
              <img src={logoImage} alt="Our Publications Logo" style={{ maxWidth: '100%' }} />
              <AuthLogin title="Reset Password" id={id} token={token} />
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default ResetPassword;
