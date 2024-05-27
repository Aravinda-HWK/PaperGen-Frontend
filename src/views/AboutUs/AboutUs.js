import React, { useEffect, useState } from 'react';
import PageContainer from 'src/components/container/PageContainer';
import techImage from 'src/assets/images/backgrounds/settings.png';
import million from 'src/assets/images/backgrounds/profits.png';
import network from 'src/assets/images/backgrounds/network.png';

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
    background: 'linear-gradient(135deg, #6B52AE,#1d2066)', // Purple to Blue gradient
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
    background: 'linear-gradient(135deg, #221230,#1d2066)', // Purple to Blue gradient
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
    <PageContainer title="About Page" description="This is About Page">
      <div style={containerStyle}>
        <div style={cardStyle}>
          <img src={techImage} style={cardImageStyle} height="70px" width="70px" alt="Tech" />
          <div style={cardTextStyle}>
            Our app and website have a diverse user base spanning across continents. With readers
            from over 120 countries and counting, your books will reach a truly global audience. Tap
            into new markets and connect with readers from different cultural backgrounds.
          </div>
        </div>

        <div style={cardStyle}>
          <img src={million} style={cardImageStyle} height="70px" width="70px" alt="Million" />
          <div style={cardTextStyle}>
            Our mobile app has been downloaded over 5 million times and counting. This impressive
            user base ensures that your books will be exposed to a massive and growing audience,
            maximizing your book's visibility and potential sales.
          </div>
        </div>

        <div style={cardStyle}>
          <img src={network} style={cardImageStyle} height="70px" width="70px" alt="Network" />
          <div style={cardTextStyle}>
            Our platform boasts a highly engaged community of readers who spend an average of 30
            minutes per session. This level of engagement means that readers are actively
            interacting with the content, discussing it, and sharing their experiences. Your books
            will have a dedicated and enthusiastic audience eager to explore new releases.
          </div>
        </div>
      </div>
      <div style={cardLargeStyle}>
        <div style={{ textAlign: 'center', fontSize: '40px', marginTop: '10px', color: '#6B52AE' }}>
          Our Team
        </div>
        <div style={{ textAlign: 'center', fontSize: '20px', marginTop: '20px' }}>
          We are a passionate team of book lovers and tech enthusiasts dedicated to improving the
          reading experience.
        </div>
        <div style={{ textAlign: 'center', fontSize: '20px', marginTop: '20px' }}>
          Your feedback is valuable to us. Feel free to contact us with any questions or
          suggestions.
        </div>
        <div style={{ textAlign: 'center', fontSize: '20px', marginTop: '20px' }}>
          <a href="/home" style={{ textDecoration: 'none', color: '#6B52AE', fontWeight: 'bold' }}>
            Begin Here
          </a>
        </div>
      </div>
      <div style={cardLargeStyle}>
        <div style={{ textAlign: 'center', fontSize: '40px', marginTop: '10px', color: '#6B52AE' }}>
          Contact Details
        </div>
        <div style={{ textAlign: 'center', fontSize: '20px', marginTop: '20px' }}>
          Call Now : +91 9876543210
        </div>
        <div style={{ textAlign: 'center', fontSize: '20px', marginTop: '20px' }}>
          Email us : AReader3D@email.com
        </div>
      </div>
    </PageContainer>
  );
};

export default AboutUs;
