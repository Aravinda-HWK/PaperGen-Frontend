import React, { useEffect, useState } from 'react';
import PageContainer from 'src/components/container/PageContainer';
import createImage from 'src/assets/images/backgrounds/settings.png';
import collaborateImage from 'src/assets/images/backgrounds/profits.png';
import publishImage from 'src/assets/images/backgrounds/network.png';

const AboutUs = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsMounted(true);
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  const containerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '20px',
    opacity: isMounted ? '1' : '0',
    transform: `translateY(${isMounted ? '0' : '120px'})`,
    transition: 'opacity 0.7s ease, transform 0.5s ease',
  };

  const cardStyle = {
    width: '30%',
    height: '400px',
    background: 'linear-gradient(135deg, #3a0b54, #5e3a8e)', // Dark purple gradient
    border: '1px solid #ccc',
    borderRadius: '15px',
    padding: '20px',
    textAlign: 'center',
    color: '#fff', // Text color
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    opacity: isMounted ? '0.8' : '0',
    transform: `translateY(${isMounted ? '0' : '20px'})`,
    transition: 'opacity 0.7s ease, transform 0.7s ease',
  };

  const cardLargeStyle = {
    marginTop: '20px',
    width: '100%',
    background: 'linear-gradient(135deg, #2e0844, #4b3075)', // Darker purple gradient
    border: '1px solid #ccc',
    borderRadius: '15px',
    padding: '20px',
    textAlign: 'top',
    color: '#fff', // Text color
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    opacity: isMounted ? '1' : '0',
    transform: `translateY(${isMounted ? '0' : '20px'})`,
    transition: 'opacity 0.7s ease, transform 0.7s ease',
  };

  const cardImageStyle = {
    maxWidth: '100%',
    height: 'auto',
  };

  const cardTextStyle = {
    marginTop: '30px',
    fontSize: '14px',
  };

  return (
    <PageContainer title="About PaperGen" description="Learn more about PaperGen">
      <div style={containerStyle}>
        <div style={cardStyle}>
          <img src={createImage} style={cardImageStyle} height="70px" width="70px" alt="Create" />
          <div style={cardTextStyle}>
            PaperGen simplifies the creation of academic papers. Our intuitive tools and templates
            help you get started quickly and ensure your papers meet all formatting standards.
          </div>
        </div>

        <div style={cardStyle}>
          <img
            src={collaborateImage}
            style={cardImageStyle}
            height="70px"
            width="70px"
            alt="Collaborate"
          />
          <div style={cardTextStyle}>
            Collaboration is key to academic success. With PaperGen, you can easily collaborate with
            peers and mentors, share drafts, and get feedback in real-time.
          </div>
        </div>

        <div style={cardStyle}>
          <img src={publishImage} style={cardImageStyle} height="70px" width="70px" alt="Publish" />
          <div style={cardTextStyle}>
            Ready to publish? PaperGen streamlines the publishing process, connecting you with
            top-tier journals and ensuring your work reaches the right audience.
          </div>
        </div>
      </div>
      <div style={cardLargeStyle}>
        <div style={{ textAlign: 'center', fontSize: '40px', marginTop: '10px', color: '#e0b3ff' }}>
          Our Team
        </div>
        <div style={{ textAlign: 'center', fontSize: '20px', marginTop: '20px' }}>
          We are a dedicated team of academic professionals and tech experts committed to enhancing
          the research and publication process.
        </div>
        <div style={{ textAlign: 'center', fontSize: '20px', marginTop: '20px' }}>
          Your feedback is invaluable to us. Please reach out with any questions or suggestions.
        </div>
        <div style={{ textAlign: 'center', fontSize: '20px', marginTop: '20px' }}>
          <a href="/home" style={{ textDecoration: 'none', color: '#e0b3ff', fontWeight: 'bold' }}>
            Get Started
          </a>
        </div>
      </div>
      <div style={cardLargeStyle}>
        <div style={{ textAlign: 'center', fontSize: '40px', marginTop: '10px', color: '#e0b3ff' }}>
          Contact Us
        </div>
        <div style={{ textAlign: 'center', fontSize: '20px', marginTop: '20px' }}>
          Call Now: +1 234 567 890
        </div>
        <div style={{ textAlign: 'center', fontSize: '20px', marginTop: '20px' }}>
          Email: support@papergen.com
        </div>
      </div>
    </PageContainer>
  );
};

export default AboutUs;
