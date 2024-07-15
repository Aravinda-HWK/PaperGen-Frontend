import React from 'react';
import PageContainer from 'src/components/container/PageContainer';
import { Grid, Box } from '@mui/material';
import image from 'src/assets/images/home/bgImage1.jpg';
import image2 from 'src/assets/images/home/rm347-sasi-banner-15.jpg';
import SendUsMessage from 'src/views/Home/SendUsMessage';

const HomePage = () => {
  const [isHovered, setIsHovered] = React.useState(false);

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleLeave = () => {
    setIsHovered(false);
  };

  return (
    <>
      <PageContainer title="Home Page" alt="home" description="this is Home Page">
        <Box>
          <Grid container>
            <Grid item xs={12} lg={13}>
              <div
                className="image-container"
                style={{
                  ...imageContainerStyles,
                  ...(isHovered && hoverStyles), // Apply hover styles when isHovered is true
                }}
                onMouseEnter={handleHover}
                onMouseLeave={handleLeave}
              >
                <Grid
                  item
                  xs={7}
                  padding={10}
                  style={{
                    fontWeight: 'bold',
                    color: 'your-color-here',
                    fontSize: '24px',
                    textShadow: '3px 3px 5px rgba(0, 0, 0, 0.9)',
                  }}
                >
                  <h1>
                    Create Academic&nbsp;
                    <br />
                    <br />
                    Papers Effortlessly
                  </h1>
                </Grid>

                <Grid item xs={8}></Grid>
                <Grid
                  item
                  xs={15}
                  paddingLeft="20px"
                  paddingTop="110px"
                  style={{
                    fontWeight: 'bold',
                    color: 'white',
                    fontSize: '24px',
                    textShadow: '3px 3px 5px rgba(0, 0, 0, 0.9)',
                  }}
                >
                  Welcome to PaperGen, the ultimate platform for educators and students to manage
                  and evaluate academic papers. Our advanced tools streamline the creation,
                  submission, and review process, making academic tasks more efficient and
                  effective. Experience seamless integration of technology in education with
                  PaperGen.
                </Grid>
              </div>
            </Grid>

            <div
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                marginTop: '40px',
                borderRadius: '40px',
                backgroundImage: `url(${image2})`,
                backgroundSize: 'cover',
                objectFit: 'cover',
                boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.9)',
                transition: 'transform 0.1s',
                ...(isHovered && hoverStyles),
                padding: '20px',
                height: '600px', // Increase the height to your desired value
                width: '100%', // Increase the width to your desired value
              }}
              onMouseEnter={handleHover}
              onMouseLeave={handleLeave}
            >
              {/* Grid content here */}
            </div>

            <div>
              <SendUsMessage />
            </div>
          </Grid>
        </Box>
      </PageContainer>
    </>
  );
};

export default HomePage;

const imageContainerStyles = {
  backgroundImage: `url(${image})`,
  height: '550px',
  borderRadius: '40px',
  boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.9)',
  transition: 'transform 0.3s', // Add a smooth transition effect
};
const hoverStyles = {
  transform: 'scale(1.01)', // Increase the size by 10% when hovering
};
