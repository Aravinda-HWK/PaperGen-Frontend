import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Grid } from '@mui/material';

const CoverPage = ({ title, author, photo, price, id }) => {
  return (
    <Grid container spacing={4}>
      <Grid item sm={12} md={4} lg={3}>
        <div style={{ height: '500px', width: '300px' }}>
          <Link to={`/bookdetails?id=${id}`}>
            <img
              src={photo}
              alt="img"
              style={{
                border: '1px solid black',
                borderRadius: '10px',
                width: '300px',
                height: '300px',
              }}
            />
          </Link>

          <div style={{ height: '100px', width: '300px' }}>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <Typography variant="h5" style={{ color: 'blue', marginBottom: '8px' }}  data-testid="Sample Book">
                {title}
              </Typography>
              <Typography variant="h6" style={{ marginBottom: '4px' }} data-testid="John Doe">
                {author}
              </Typography>
              <Typography variant="h6" style={{ marginBottom: '4px', fontWeight: 'bold' }} data-testid="LKR19.99">
                LKR{price}
              </Typography>
            </div>
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default CoverPage;
