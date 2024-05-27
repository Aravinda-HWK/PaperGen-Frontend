import React, { useEffect } from 'react';
import PageContainer from 'src/components/container/PageContainer';
import backgroundImg from 'src/assets/images/AR page/rm222batch5-kul-03.jpg';
import CustomTextField from 'src/components/forms/theme-elements/CustomTextField';
import { Typography } from '@mui/material';
import DropDownList from 'src/components/DropDownList/DropDownList';
import Cookies from 'universal-cookie';
import jwt from 'jwt-decode';
import PurpleButton from 'src/components/Buttons/PurpleButton';
import getBooks from 'src/api/ar_content/ar_content';

const ARContent = () => {
  let [list, setList] = React.useState([]);
  const [book, setBook] = React.useState('');
  console.log(book);

  const fetchData = async () => {
    try {
      const cookies = new Cookies();
      const token = cookies.get('token');
      const id = jwt(token)._id;
      const data = await getBooks(id);
      console.log(data.response);
      for (const element of data.response) {
        console.log(element.title);
        setList((prevList) => [...prevList, element.title]);
      }
    } catch (err) {
      window.location.href = '/auth/login';
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <PageContainer title="AR Content Page" description="this is AR Content Page">
      <div
        style={{
          display: 'flex',
          flexDirection: 'column', // Display children vertically
          justifyContent: 'space-between', // Distribute space evenly
          alignItems: 'center',
          minHeight: '80vh',
          backgroundImage: `url(${backgroundImg})`, // Set the background image
          backgroundSize: 'cover', // Adjust the background size
          backgroundPosition: 'center', // Center the background image
          backgroundRepeat: 'no-repeat', // Do not repeat the image
          borderRadius: '20px',
          boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.5)',
          position: 'relative', // Add relative positioning
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '16vh',
            minWidth: '50vh',
            backgroundColor: 'rgba(0, 0, 255, 0.3)', // Shaded blue color with alpha (opacity)
            borderRadius: '20px',
            boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.5)',
            position: 'absolute',
            top: '10%',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          {/* Content */}
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '16vh',
            minWidth: '50vh',
            background: 'linear-gradient(to right, lightblue, white)', // Gradient background
            borderRadius: '20px',
            boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.5)',
            position: 'absolute',
            top: '10%',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          <h1 style={{ color: 'black' }}>Add AR visualization</h1>
        </div>
        <div
          style={{
            position: 'absolute', // Add absolute positioning
            top: '30%',
          }}
        >
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="title"
            mb="5px"
            mt="15px"
          >
            Title :
          </Typography>
          <CustomTextField label="Enter title:" id="author" variant="outlined" fullWidth />
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="description"
            mb="5px"
            mt="15px"
          >
            Description :
          </Typography>
          <CustomTextField
            label="Enter description:"
            id="description"
            variant="outlined"
            fullWidth
          />
          <Typography variant="subtitle1" fontWeight={600} component="label" mb="5px" mt="15px">
            Book :
          </Typography>
          <DropDownList label="Book" items={list} onchange={setBook}/>
        </div>
        <div
          style={{
            position: 'absolute', // Add absolute positioning
            top: '80%',
            left: '35%',
          }}
        >
          <PurpleButton label="Add Image" />
        </div>
        <div
          style={{
            position: 'absolute', // Add absolute positioning
            top: '80%',
            left: '50%',
          }}
        >
          <PurpleButton label="Add AR Content" />
        </div>
      </div>
    </PageContainer>
  );
};

export default ARContent;
