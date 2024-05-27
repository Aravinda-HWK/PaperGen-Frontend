import React from 'react';
import { Card } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import BookRegister from './BookRegister/BookRegister';
import backgroundImg from 'src/assets/images/backgrounds/registerbg1.jpg';


const Register2 = () => (
  <PageContainer title="Book Register" description="ENTER YOUR BOOK DETAILS">
    <Card
      elevation={9}
      sx={{
        p: 4,
        zIndex: 1,
        width: '100%',
        maxWidth: '1200px',
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <BookRegister />
    </Card>
  </PageContainer>
);

export default Register2;
