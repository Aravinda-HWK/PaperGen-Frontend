import React from 'react';
import { Typography, Button, Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import backgroundImage from '../../../src/assets/images/backgrounds/HD-wallpaper-purple-abtstract-color-soft-purple-glitter.jpg';
import logo from '../../../src/assets/images/logos/Black logo - no background.png'; // Import your logo image

const useStyles = makeStyles((theme) => ({
  heroContent: {
    padding: 40,
    backgroundColor: '#fafafa',
    textAlign: 'center',
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover', // Ensures the image covers the entire background
    backgroundRepeat: 'no-repeat', // Prevents the image from repeating
    backgroundPosition: 'center', // Centers the image
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  heroImage: {
    width: '100%',
    height: 'auto',
  },
  logo: {
    marginTop: theme.spacing(2), // Adjust the spacing as needed
    width: '250px', // Adjust the width as needed
    height: 'auto', // Maintain aspect ratio
    borderRadius: '10%', // Makes the image circular
    display: 'block', // Centers the image
    marginLeft: 'auto', // Centers the image
    marginRight: 'auto', // Centers the image
    elevation: 100, // Adds a shadow to the image
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)', // Adds a shadow to the image
  },
}));

const HeroSection = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.heroContent} elevation={6}>
      <Typography variant="h2" component="h1" gutterBottom>
        Welcome to PaperGen
      </Typography>
      <img src={logo} alt="PaperGen Logo" className={classes.logo} /> {/* Add logo here */}
      <Typography variant="h5" component="h2" color="black" paragraph>
        The ultimate platform for educators and students to manage and evaluate academic papers.
        Streamline your learning experience with easy paper generation, submission tracking, and
        insightful feedback.
      </Typography>
      <div className={classes.heroButtons}>
        <Grid container spacing={2} justify="center">
          <Grid item>
            <Button variant="contained" color="primary">
              Get Started
            </Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" color="primary">
              Learn More
            </Button>
          </Grid>
        </Grid>
      </div>
    </Paper>
  );
};

export default HeroSection;
