import React, { useEffect, useState, useRef } from 'react';
import TextBox from 'src/components/TextBox/TextBox';
import PurpleButton from 'src/components/Buttons/PurpleButton';
import MainTopic from 'src/components/Topic/MainTopic';
import LoadingSpinner from 'src/components/Spinner/Spinner';
import jwt from 'jwt-decode';
import { Typography } from '@mui/material';
import { storage } from '../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';
import { Paper } from '@mui/material';
import { getAuthToken } from '../authentication/auth/TeacherAuthLogin';
import getTeacher from 'src/api/profile/get_teacher';
import updateTeacher from '../../api/profile/update_teacher';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import backgroundImg from 'src/assets/images/backgrounds/loginBackground.jpg';

const Profile = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [description, setDescription] = useState('');
  const [logo, setLogo] = useState(null);
  const [imageLink, setImageLink] = useState('');
  const [resposeMessage, setResponseMessage] = useState('');
  const [loading, setLoading] = useState('');
  const updateData = {};
  const fileInputRef = useRef(null);
  const [id, setId] = useState('');

  const handleFirstNameChange = (newInputText) => {
    setFirstName(newInputText);
  };

  const handleLastNameChange = (newInputText) => {
    setLastName(newInputText);
  };

  const handleEmailChange = (newInputText) => {
    setEmail(newInputText);
  };

  const handlePasswordChange = (newInputText) => {
    setPassword(newInputText);
  };

  const handleDescriptionChange = (newInputText) => {
    setDescription(newInputText);
  };

  const handleLogoChange = (event) => {
    setLogo(event.target.files[0]);
  };

  const handleImageClick = () => {
    // Trigger the file input when the image is clicked
    fileInputRef.current.click();
  };

  const [teacher, setTeacher] = useState({});

  const fetchData = async () => {
    try {
      const token = getAuthToken();
      const id = jwt(token).id;
      setId(id);
      const data = await getTeacher(id, token);
      setTeacher(data);
      console.log(data);
    } catch (err) {
      window.location.href = '/auth/teacherLogin';
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const handleUpdateSubmit = async (event) => {
    event.preventDefault();
    setResponseMessage('');
    if (firstName !== '') {
      updateData.firstName = firstName;
    }
    if (lastName !== '') {
      updateData.lastName = lastName;
    }
    if (email !== '') {
      if (isValidEmail(email)) {
        updateData.email = email;
      } else {
        setResponseMessage('Invalid email address.');
        return;
      }
    }
    if (password !== '') {
      if (password.length < 8) {
        setResponseMessage('Password must be at least 8 characters long.');
        return;
      } else {
        updateData.password = password;
      }
    }
    if (description !== '') {
      updateData.description = description;
    }
    if (imageLink !== '') {
      updateData.photo = imageLink;
    }
    updateData.id = id;

    console.log(updateData);
    const responseData = await updateTeacher(updateData);
    if (responseData.error) {
      setResponseMessage(responseData.message);
    } else {
      setTeacher(responseData);
      setResponseMessage('Profile is updated successfully.');
      toast.success('Profile is updated successfully.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleUpload = () => {
    if (logo === null) {
      return; // No file selected
    }
    setLoading('Uploading');
    const storageRef = ref(storage, `profile/${v4()}`);
    uploadBytes(storageRef, logo)
      .then((snapshot) => {
        setLoading('Uploaded a logo!');
        console.log('Uploaded a logo!');
        getDownloadURL(snapshot.ref)
          .then((url) => {
            setImageLink(url); // Assuming you have a function to set the URL in your component's state
            console.log(imageLink);
          })
          .catch((error) => {
            console.error('Error getting download URL:', error);
          });
      })
      .catch((error) => {
        console.error('Error uploading logo:', error);
      });
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          backgroundImage: `url(${backgroundImg})`, // Set the background image
          backgroundSize: 'cover', // Adjust the background size
          backgroundPosition: 'center', // Center the background image
        }}
      >
        <Paper
          elevation={10}
          style={{
            alignItems: 'center',
            padding: '10px',
            width: '19%',
            height: '50%',
            maxWidth: '1000px',
            margin: '0 auto',
            backgroundColor: '#fafaf7',
          }}
        >
          <MainTopic text="Your Profile" />
        </Paper>
        <Paper
          elevation={10}
          style={{
            padding: '20px',
            width: '100%',
            maxWidth: '1000px',
            margin: '0 auto',
            backgroundColor: '#fafaf7',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '30vh',
            }}
          >
            <img
              src={teacher.photo ? teacher.photo : 'https://via.placeholder.com/200'}
              alt="logo"
              style={{
                width: '200px',
                height: '200px',
                cursor: 'pointer',
                borderRadius: '50%',
                objectFit: 'cover',
                objectPosition: 'center',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease', // Add transitions
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.8)', // Add box-shadow
              }}
              hover={{
                transform: 'scale(1.1)', // Increase size by 10% on hover
                boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.9)', // Add a larger shadow on hover
              }}
              onClick={handleImageClick}
            />
          </div>
          {loading === 'Uploading' ? <LoadingSpinner /> : null}
          {loading === 'Uploaded a logo!' ? (
            <Typography style={{ color: 'green' }}>Logo is uploaded!</Typography>
          ) : null}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <input
              type="file"
              accept="image/*"
              onChange={handleLogoChange}
              ref={fileInputRef}
              style={{ display: 'none' }}
            />
            <button
              onClick={handleUpload}
              style={{
                marginLeft: '10px',
                marginBottom: '20px',
                backgroundColor: 'linear-gradient(90deg, #000, #000, #333, #333, #333, #555, #555)', // Shaded background
                color: '#000', // White text color
                border: 'none',
                padding: '10px 20px',
                cursor: 'pointer',
                borderRadius: '5px',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.7)',
              }}
            >
              Upload
            </button>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div style={{ width: '48%' }}>
              <TextBox
                inputText="First Name"
                label="Enter new first name:"
                width="100%"
                type="text"
                isMultiline={false}
                defaultValue={teacher.firstName ? teacher.firstName : 'No first name available'}
                onInputChange={handleFirstNameChange}
              />
            </div>
            <div style={{ width: '48%' }}>
              <TextBox
                inputText="Last Name"
                label="Enter new last name:"
                width="100%"
                type="text"
                isMultiline={false}
                defaultValue={teacher.lastName ? teacher.lastName : 'No last name available'}
                onInputChange={handleLastNameChange}
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div style={{ width: '48%' }}>
              <TextBox
                inputText="Email Address"
                label="Enter new email address:"
                width="100%"
                type="text"
                isMultiline={false}
                defaultValue={teacher.email ? teacher.email : 'No email available'}
                onInputChange={handleEmailChange}
              />
            </div>
            <div style={{ width: '48%' }}>
              <TextBox
                inputText="Password"
                label="Enter new password:"
                width="100%"
                type="password"
                isMultiline={false}
                defaultValue={'Password is not visible'}
                onInputChange={handlePasswordChange}
              />
            </div>
          </div>

          <TextBox
            inputText="Description"
            label="Enter new descriptio:"
            width="100%"
            type="text"
            isMultiline={true}
            defaultValue={teacher.description ? teacher.description : 'No description available'}
            onInputChange={handleDescriptionChange}
          />

          <div
            style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}
            onSubmit={handleUpdateSubmit}
          >
            {loading === 'Uploading' ? null : (
              <PurpleButton label="Update" onClick={handleUpdateSubmit} />
            )}
          </div>
          <Typography style={{ color: 'green' }}>{resposeMessage}</Typography>
        </Paper>
      </div>
      <ToastContainer />
    </>
  );
};

export default Profile;
