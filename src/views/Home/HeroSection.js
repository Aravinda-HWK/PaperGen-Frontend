import React from 'react';
import { Typography, Button, Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  heroContent: {
    padding: theme.spacing(8, 0, 6),
    backgroundColor: '#fafafa',
    textAlign: 'center',
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  heroImage: {
    width: '100%',
    height: 'auto',
  },
}));

const HeroSection = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.heroContent} elevation={6}>
      <Typography variant="h2" component="h1" gutterBottom>
        Welcome to PaperGen
      </Typography>
      <Typography variant="h5" component="h2" color="textSecondary" paragraph>
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
