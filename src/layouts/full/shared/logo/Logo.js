import React from 'react';
import { Link } from 'react-router-dom';
import logoImage from 'src/assets/images/logos/AReader3Dpublishers.png'; // Adjust the path to your PNG image
import { styled } from '@mui/material';

const LinkStyled = styled(Link)(() => ({
  height: '70px',
  width: '180px',
  overflow: 'hidden',
  display: 'block',
}));

const Logo = () => {
  return (
    <LinkStyled to="/">
      <img src={logoImage} alt="Logo" height={110} />
    </LinkStyled>
  );
};

export default Logo;
