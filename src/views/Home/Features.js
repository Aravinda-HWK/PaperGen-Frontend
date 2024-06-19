import React from 'react';
import { Grid, Card, CardContent, Typography, CardActions, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardContent: {
    flexGrow: 1,
  },
}));

const features = [
  {
    title: 'Easy Paper Generation',
    description: 'Generate papers effortlessly with our intuitive tools.',
  },
  {
    title: 'Submission Tracking',
    description: 'Track the status of your submissions in real-time.',
  },
  { title: 'Insightful Feedback', description: 'Receive detailed feedback to improve your work.' },
];

const Features = () => {
  const classes = useStyles();

  return (
    <Grid container spacing={4} className={classes.cardGrid}>
      {features.map((feature) => (
        <Grid item key={feature.title} xs={12} sm={6} md={4}>
          <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
              <Typography gutterBottom variant="h5" component="h2">
                {feature.title}
              </Typography>
              <Typography>{feature.description}</Typography>
            </CardContent>
            <CardActions>
              <Button size="small" color="primary">
                Learn More
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Features;
