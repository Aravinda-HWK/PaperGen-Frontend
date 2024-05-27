import React, { useEffect, useState, useRef } from 'react';
import TextBox from 'src/components/TextBox/TextBox';
import PurpleButton from 'src/components/Buttons/PurpleButton';
import MainTopic from 'src/components/Topic/MainTopic';
import LoadingSpinner from 'src/components/Spinner/Spinner';
import jwt from 'jwt-decode';
import { Typography } from '@mui/material';
import { storage } from '../../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';
import { Paper } from '@mui/material';
import { getAdmin } from 'src/api/profile/get_admin';
import updateAdmin from 'src/api/profile/update_admin';
import { getAdminToken } from 'src/config/token/getAdminToken';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import backgroundImg from 'src/assets/images/backgrounds/background.jpg';

const AdminProfile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState(''); // Not visible only editable
  const [phonenumber, setPhonenumber] = useState('');
  const [bio_data, setBio_data] = useState('');
  const [logo, setLogo] = useState(null);
  const [imageLink, setImageLink] = useState('');
  const [resposeMessage, setResponseMessage] = useState('');
  const [loading, setLoading] = useState('');
  const updateData = {};
  const fileInputRef = useRef(null);
  const [id, setId] = useState('');

  const handleNameChange = (newInputText) => {
    setName(newInputText);
  };

  const handleEmailChange = (newInputText) => {
    setEmail(newInputText);
  };

  const handleUsernameChange = (newInputText) => {
    setUsername(newInputText);
  };

  const handlePasswordChange = (newInputText) => {
    setPassword(newInputText);
  };

  const handlePhonenumberChange = (newInputText) => {
    setPhonenumber(newInputText);
  };

  const handleBio_dataChange = (newInputText) => {
    setBio_data(newInputText);
  };

  const handleLogoChange = (event) => {
    setLogo(event.target.files[0]);
  };

  const handleImageClick = () => {
    // Trigger the file input when the image is clicked
    fileInputRef.current.click();
  };

  const [admin, setAdmin] = useState({});

  const fetchData = async () => {
    try {
      const token = getAdminToken();
      const id = jwt(token)._id;
      console.log(id);
      setId(id);
      const data = await getAdmin(id);
      setAdmin(data);
    } catch (err) {
      window.location.href = '/auth/login';
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdateSubmit = async (event) => {
    console.log('handleUpdateSubmit');

    if (name !== '') {
      updateData.name = name;
    }
    if (email !== '') {
      updateData.email = email;
    }

    if (username !== '') {
      updateData.username = username;
    }

    if (password !== '') {
      updateData.password = password;
    }

    if (phonenumber !== '') {
      updateData.phonenumber = phonenumber;
    }

    if (bio_data !== '') {
      updateData.bio_data = bio_data;
    }

    if (imageLink !== '') {
      updateData.logo = imageLink;
    }
    updateData._id = id;
    console.log(updateData);

    const responseData = await updateAdmin(updateData);
    setResponseMessage(responseData.message);
    if (responseData.message === 'Admin data is updated successfully.') {
      fetchData();
      toast.success('Admin data is updated!', {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    console.log(responseData.message);
  };

  const handleUpload = () => {
    if (logo === null) {
      return; // No file selected
    }
    setLoading('Uploading');
    const storageRef = ref(storage, `logo/${v4()}`);
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
              src={admin.profile_image}
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
                inputText="Name"
                label="Enter new name:"
                width="100%"
                type="text"
                isMultiline={false}
                defaultValue={admin.name}
                onInputChange={handleNameChange}
              />
            </div>
            <div style={{ width: '48%' }}>
              <TextBox
                inputText="Email Address"
                label="Enter new email address:"
                width="100%"
                type="text"
                isMultiline={false}
                defaultValue={admin.email}
                onInputChange={handleEmailChange}
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div style={{ width: '48%' }}>
              <TextBox
                inputText="Username"
                label="Enter new username:"
                width="100%"
                type="text"
                isMultiline={false}
                defaultValue={admin.username}
                onInputChange={handleUsernameChange}
              />
            </div>
            <div style={{ width: '48%' }}>
              <TextBox
                inputText="Password"
                label="Enter new password:"
                width="100%"
                type="password"
                isMultiline={false}
                defaultValue="Not Visible only editable"
                onInputChange={handlePasswordChange}
              />
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div style={{ width: '48%' }}>
              <TextBox
                inputText="Phone Number"
                label="Enter new Phone Number:"
                width="100%"
                type="text"
                isMultiline={false}
                defaultValue={admin.phonenumber}
                onInputChange={handlePhonenumberChange}
              />
            </div>
            <div style={{ width: '48%' }}>
              <TextBox
                inputText="Bio Data"
                label="Enter new Bio Data:"
                width="100%"
                type="text"
                isMultiline={true}
                defaultValue={admin.bio_data}
                onInputChange={handleBio_dataChange}
              />
            </div>
          </div>
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

export default AdminProfile;
