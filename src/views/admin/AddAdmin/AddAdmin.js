import React, { useState,useEffect } from 'react';
import { Grid, Box, Typography, Button, Paper } from '@mui/material';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import { Stack } from '@mui/system';
import PageContainer from 'src/components/container/PageContainer';
import { IconCloudUpload, IconAd } from '@tabler/icons';
import { storage } from '../../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';
import Spinner from '../../../components/Spinner/Spinner';
import backgroundImg from 'src/assets/images/backgrounds/2947.jpg';
import MainTopic from 'src/components/Topic/MainTopic';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import adminCreate from '../../../api/auth/adminCreate';
import { userSchema } from '../../../validations/AdminValidation';
import { getAdminToken } from 'src/config/token/getAdminToken';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const AddAdmin = () => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassowrd] = useState('');
  const [username, setUsername] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [bio_data, setBio_data] = useState('');
  const [imageLink, setImageLink] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingdetails, setLoadingDetails] = useState('');
  const [errorMessege, setErrorMessege] = useState('');


  const fetchData = async () => {
    try {
      getAdminToken();
    } catch (err) {
      window.location.href = '/auth/login';
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpload = () => {
    console.log('uploading');
    setLoading(true);
    if (image !== null) {
      const storageRef2 = ref(storage, `images/${image.name + v4()}`);
      uploadBytes(storageRef2, image)
        .then((snapshot) => {
          console.log('Uploaded coverpage!');
          getDownloadURL(snapshot.ref)
            .then((url) => {
              setLoading(false);
              setImageLink(url);
              setLoadingDetails('Logo uploaded successfully!');
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleCreateAdmin = async (event) => {
    setErrorMessege('');
    setLoadingDetails('');
    console.log(name);
    const adminData = {
      name: name,
      email: email,
      password: password,
      username: username,
      phonenumber: phonenumber,
      bio_data: bio_data,
      image: imageLink,
    };
    const isValid = await userSchema.isValid(adminData);

    if (isValid) {
      setLoading(true);
      try {
        const responseData = await adminCreate(adminData);
        if (responseData.message === 'Admin is added successfully.') {
          console.log(responseData);
          toast.success('Admin data is updated!', {
            position: toast.POSITION.TOP_RIGHT,
          });
          setLoading(false);
          setLoadingDetails(responseData.message);
        } else {
          setLoading(false);
          setErrorMessege(responseData.message);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        // Attempt to validate and catch validation errors
        await userSchema.validate(adminData);
      } catch (validationError) {
        setErrorMessege(validationError.message);
      }
    }
  };

  return (
    <>
      <PageContainer title="Add Admin Page" description="this is Admin Add Page">
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '150vh',
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
              width: '17%',
              height: '50%',
              maxWidth: '1000px',
              margin: '0 auto',
              backgroundColor: '#fafaf7',
            }}
          >
            <MainTopic text="Add Admin" />
          </Paper>
          <Paper
            elevation={10}
            style={{
              padding: '40px',
              width: '80%',
              maxWidth: '900px',
              margin: '0 auto',
              backgroundColor: '#fafaf7',
            }}
          >
            <Box>
              <Grid container spacing={5}>
                <>
                  <Grid item xs={8} lg={10}>
                    <Box>
                      <Stack mb={10}>
                        <Typography
                          variant="subtitle1"
                          fontWeight={600}
                          component="label"
                          htmlFor="name"
                          mb="5px"
                        >
                          Name:
                        </Typography>
                        <CustomTextField
                          label="Enter new admin name:"
                          id="name"
                          variant="outlined"
                          fullWidth
                          onChange={(e) => setName(e.target.value)}
                        />

                        <Typography
                          variant="subtitle1"
                          fontWeight={600}
                          component="label"
                          htmlFor="email"
                          mb="5px"
                          mt="15px"
                        >
                          Email Address:
                        </Typography>
                        <CustomTextField
                          label="Enter new admin email address:"
                          id="email"
                          variant="outlined"
                          fullWidth
                          onChange={(e) => setEmail(e.target.value)}
                        />

                        <Typography
                          variant="subtitle1"
                          fontWeight={600}
                          component="label"
                          htmlFor="username"
                          mb="5px"
                          mt="15px"
                        >
                          Username:
                        </Typography>
                        <CustomTextField
                          label="Enter new admin username:"
                          id="username"
                          variant="outlined"
                          fullWidth
                          onChange={(e) => setUsername(e.target.value)}
                        />

                        <Typography
                          variant="subtitle1"
                          fontWeight={600}
                          component="label"
                          htmlFor="password"
                          mb="5px"
                          mt="15px"
                        >
                          Password:
                        </Typography>
                        <CustomTextField
                          label="Enter new admin password:"
                          id="password"
                          variant="outlined"
                          fullWidth
                          type="password"
                          onChange={(e) => setPassowrd(e.target.value)}
                        />

                        <Typography
                          variant="subtitle1"
                          fontWeight={600}
                          component="label"
                          htmlFor="phonenumber"
                          mb="5px"
                          mt="15px"
                        >
                          Phone Number:
                        </Typography>
                        <CustomTextField
                          label="Enter new admin phone number:"
                          id="phonenumber"
                          variant="outlined"
                          fullWidth
                          onChange={(e) => setPhonenumber(e.target.value)}
                        />

                        <Typography
                          variant="subtitle1"
                          fontWeight={600}
                          component="label"
                          htmlFor="bio_data"
                          mb="5px"
                          mt="15px"
                        >
                          Bio Data:
                        </Typography>
                        <CustomTextField
                          label="Enter new admin bio data:"
                          id="bio_data"
                          variant="outlined"
                          fullWidth
                          onChange={(e) => setBio_data(e.target.value)}
                        />

                        <div style={{ display: 'flex', alignItems: 'center', paddingTop: '10px' }}>
                          <div style={{ flex: '1' }}>
                            <Typography
                              variant="subtitle1"
                              fontWeight={600}
                              component="label"
                              htmlFor="ISBN"
                              mb="5px"
                              display="block"
                            >
                              Choose Logo
                            </Typography>

                            <Button
                              component="label"
                              variant="contained"
                              startIcon={<CloudUploadIcon />}
                            >
                              Choose Logo
                              <VisuallyHiddenInput
                                type="file"
                                accept="image/jpeg, image/png, image/gif"
                                onChange={(e) => setImage(e.target.files[0])}
                              />
                            </Button>
                          </div>
                        </div>
                      </Stack>
                      <div
                        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                      >
                        <Button
                          color="primary"
                          variant="contained"
                          size="large"
                          startIcon={<IconCloudUpload />}
                          onClick={handleUpload}
                          style={{ width: '50%' }}
                        >
                          Upload
                        </Button>
                        <div style={{ marginTop: '10px' }} /> {/* Add spacing */}
                        {!loading && (
                          <Button
                            color="primary"
                            variant="contained"
                            size="large"
                            startIcon={<IconAd />}
                            onClick={handleCreateAdmin}
                            style={{ width: '50%' }}
                          >
                            Create Admin
                          </Button>
                        )}
                        {loading ? (
                          <div style={{ marginTop: '10px' }}>
                            <Spinner />
                          </div>
                        ) : null}
                      </div>
                      <Typography style={{ color: 'green' }}>{loadingdetails}</Typography>
                      <Typography style={{ color: 'red' }}>{errorMessege}</Typography>
                    </Box>
                  </Grid>
                </>
              </Grid>
            </Box>
          </Paper>
        </div>
      </PageContainer>
      <ToastContainer />
    </>
  );
};

export default AddAdmin;
