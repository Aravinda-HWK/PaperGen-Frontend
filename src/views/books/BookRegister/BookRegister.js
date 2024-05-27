import { Box, Typography } from '@mui/material';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import { Stack } from '@mui/system';
import React, { useState, useEffect } from 'react';
import { storage } from '../../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';
import Spinner from '../../../components/Spinner/Spinner';
import Cokkies from 'universal-cookie';
import jwt from 'jwt-decode';
import backgroundImg from 'src/assets/images/backgrounds/background.jpg';
import { Paper } from '@mui/material';
import MainTopic from 'src/components/Topic/MainTopic';
import PurpleButton from 'src/components/Buttons/PurpleButton';
import { InputAdornment } from '@mui/material';
import bookRegister from 'src/api/book/book_register';
import DropDownList from 'src/components/DropDownList/DropDownList';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

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

const BookRegister = ({ title, subtitle, subtext }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [Title, setTitle] = useState('');
  const [ISBN, setISBN] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [summary, setSummary] = useState('');
  const [price, setPrice] = useState('');
  const [coverpage, setCoverPage] = useState(null);
  const [imageLink, setImageLink] = useState('');
  const [pdfLink, setPDFink] = useState('');
  const [loading, setLoading] = useState(false);
  const [registerBook, setRegisterBook] = useState('');
  const [id, setId] = useState('');
  const [imageUploading, setImageUploading] = useState(false);
  const [pdfUploading, setPdfUploading] = useState(false);

  const BOOK_CATEGORIES = [
    'Adventure',
    'Mystery',
    'Poetry',
    'Non-Fiction',
    'Fairy Tales and Folklore',
    'Animal Stories',
  ];

  const fetchData = () => {
    try {
      const cookies = new Cokkies();
      const token = cookies.get('token');
      const id = jwt(token)._id;
      setId(id);
    } catch (err) {
      window.location.href = '/auth/login';
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (imageUploading === false && pdfUploading === false) {
      setLoading(false);
    }
  }, [imageUploading, pdfUploading]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleCoverPageChange = (event) => {
    setCoverPage(event.target.files[0]);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleISBNChange = (event) => {
    setISBN(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };

  const handleSummaryChange = (event) => {
    setSummary(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleUpload = () => {
    setLoading(true);
    setImageUploading(true);
    setPdfUploading(true);
    console.log('Uploading Image');
    if (coverpage == null) return;
    const imageRef = ref(storage, `images/${coverpage.name + v4()}`);
    uploadBytes(imageRef, coverpage)
      .then((snaphsot) => {
        console.log('Image is uploaded.');

        // Get the download URL for the uploaded image
        getDownloadURL(snaphsot.ref)
          .then((url) => {
            setImageLink(url); // Assuming you have a function to set the URL in your component's state
            console.log(imageLink);
            setImageUploading(false);
          })
          .catch((error) => {
            console.error('Error getting download URL:', error);
          });
      })
      .catch((error) => {
        console.error('Error uploading image:', error);
      });

    console.log('Uploading PDF');
    if (selectedFile == null) return;
    const pdfRef = ref(storage, `pdf/${selectedFile.name + v4()}`);
    uploadBytes(pdfRef, selectedFile)
      .then((snaphsot) => {
        console.log('PDF is uploaded.');

        // Get the download URL for the uploaded image
        getDownloadURL(snaphsot.ref)
          .then((url) => {
            setPDFink(url); // Assuming you have a function to set the URL in your component's state
            console.log(pdfLink);
            setPdfUploading(false);
          })
          .catch((error) => {
            console.error('Error getting download URL:', error);
          });
      })
      .catch((error) => {
        console.error('Error uploading image:', error);
      });
  };

  const handleSubmit = async (e) => {
    console.log('id is ', id);
    console.log(ISBN);
    
    if (Title === '') {
      toast.error('Title cannot be empty!', {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    if (ISBN === '') {
      toast.error('ISBN cnnot be empty!', {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    if (ISBN.length <= 3) {
      toast.error('ISBN must be greater than 3 characters!', {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    if (ISBN.length >= 14) {
      toast.error('ISBN must be less than 14 characters!', {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    if (ISBN.toInteger===false) {
      toast.error('ISBN must be a number!', {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    if (author === '') {
      toast.error('Author cannot be empty!', {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    if (genre === '') {
      toast.error('Genre cannot be empty!', {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    if (summary === '') {
      toast.error('Summary cannot be empty!', {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    if (price === '') {
      toast.error('Price cannot be empty!', {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    if (imageLink === '') {
      toast.error('Coverpage cannot be empty!', {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    if (pdfLink === '') {
      toast.error('PDF cannot be empty!', {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    const jsonData = {
      publisher_id: id,
      title: Title,
      ISBN: ISBN,
      author: author,
      genre: genre,
      summary: summary,
      price: price,
      coverpage: imageLink,
      pdf: pdfLink,
    }; // Your JSON data here
    try {
      const response = await bookRegister(jsonData);
      if (response.ok) {
        setRegisterBook('Book Registered Successfully');
        toast.success('Book Registered Successfully!', {
          position: toast.POSITION.TOP_RIGHT,
        });
        console.log('Data sent successfully');
      } else {
        setRegisterBook('Book Registration Failed');
        console.error('Failed to send data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}
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
          <MainTopic text="Publish Book" />
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
          <Box>
            <Stack mb={5}>
              <Typography
                variant="subtitle1"
                fontWeight={600}
                component="label"
                htmlFor="title"
                mb="5px"
              >
                Title
              </Typography>
              <CustomTextField
                label="Sample Title - The Adventure Begins"
                id="title"
                variant="outlined"
                fullWidth
                onChange={handleTitleChange}
              />
              <Typography
                variant="subtitle1"
                fontWeight={600}
                component="label"
                htmlFor="title"
                mb="5px"
                mt="25px"
              >
                ISBN
              </Typography>
              <CustomTextField
                label="title"
                id="title"
                variant="outlined"
                fullWidth
                onChange={handleISBNChange}
              />

              <Typography
                variant="subtitle1"
                fontWeight={600}
                component="label"
                htmlFor="author"
                mb="5px"
                mt="25px"
              >
                Author
              </Typography>
              <CustomTextField
                label="Sample Author - John Doe"
                id="author"
                variant="outlined"
                fullWidth
                onChange={handleAuthorChange}
              />

              <Typography
                variant="subtitle1"
                fontWeight={600}
                component="label"
                htmlFor="Genre"
                mb="5px"
                mt="25px"
              >
                Genre
              </Typography>
              <DropDownList
                label="Sample Genre - Science Fiction"
                items={BOOK_CATEGORIES}
                onchange={setGenre}
              />
              <Typography
                variant="subtitle1"
                fontWeight={600}
                component="label"
                htmlFor="Summary"
                mb="5px"
                mt="25px"
              >
                Summary
              </Typography>
              <CustomTextField
                label="Sample Summary - In a world of advanced technology and uncharted galaxies, follow the journey..."
                id="summary"
                variant="outlined"
                fullWidth
                onChange={handleSummaryChange}
              />
              <Typography
                variant="subtitle1"
                fontWeight={600}
                component="label"
                htmlFor="price"
                mb="5px"
                mt="25px"
              >
                Price
              </Typography>
              <Box boxShadow={3} p={0} borderRadius={1} style={{ width: '40%' }}>
                <CustomTextField
                  label="Price"
                  type="number"
                  variant="outlined"
                  onChange={handlePriceChange}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start" style={{ padding: '0 8px' }}>
                        Rs.
                      </InputAdornment>
                    ),
                  }}
                  inputProps={{
                    min: 0, // Set the minimum allowed value to 0
                    style: {
                      /* Additional styles for the input field itself */
                      '-moz-appearance': 'textfield' /* Remove default arrows in Firefox */,
                    },
                  }}
                  style={{ width: '100%' }} // Apply width to the TextField
                  mt="25px"
                />
              </Box>

              <div
                style={{
                  marginTop: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  marginLeft: '30px',
                }}
              >
                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  component="label"
                  mb="5px"
                  mt="20px"
                  style={{ marginRight: '10px', marginBottom: '15px' }} // Add margin to the right for spacing
                >
                  Upload PDF
                </Typography>
               
                <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                  Choose PDF
                  <VisuallyHiddenInput
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileChange}
                  />
                </Button>

                <div style={{ marginLeft: '20px', display: 'flex', alignItems: 'center' }}>
                  <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    component="label"
                    htmlFor="ISBN"
                    mb="5px"
                    mt="25px"
                    style={{ marginRight: '10px', marginBottom: '25px' }}
                  >
                    Upload Coverpage
                  </Typography>

                 
                  <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                    Choose Coverpage
                    <VisuallyHiddenInput
                      type="file"
                      accept="image/jpeg, image/png, image/gif"
                      onChange={handleCoverPageChange}
                    />
                  </Button>
                </div>
              </div>
            </Stack>
            <Box display="flex" justifyContent="center">
              <PurpleButton label="Upload" onClick={handleUpload} />
              <div style={{ marginLeft: '10px' }}>
                {loading ? <Spinner /> : null}
                {!loading ? <PurpleButton label="Register Book" onClick={handleSubmit} /> : null}
              </div>
            </Box>
            {registerBook === 'Book Registered Successfully' ? (
              <Typography style={{ color: 'green' }}>{registerBook}</Typography>
            ) : registerBook === 'Book Registration Failed' ? (
              <Typography style={{ color: 'red' }}>{registerBook}</Typography>
            ) : null}
          </Box>
        </Paper>
      </div>
      {subtitle}
      <ToastContainer />
    </>
  );
};

export default BookRegister;
