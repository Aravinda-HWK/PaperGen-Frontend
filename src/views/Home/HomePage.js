import React from 'react';
import { CssBaseline, Container } from '@material-ui/core';
import Header from './Header';
import HeroSection from './HeroSection';
import Features from './Features';
import Footer from './Footer';

const Home = () => {
  return (
    <>
      <CssBaseline />
      <Header />
      <Container maxWidth="lg">
        <HeroSection />
        <Features />
      </Container>
      <Footer />
    </>
  );
};

export default Home;
