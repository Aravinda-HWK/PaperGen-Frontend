import React, { useEffect, useState } from 'react';
import { Grid, Box, Typography, Button, Paper } from '@mui/material';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import { Stack } from '@mui/system';
import PageContainer from 'src/components/container/PageContainer';
import { useLocation } from 'react-router-dom';
import { IconTrash, IconCloudUpload, IconAdjustments } from '@tabler/icons';
import { storage } from '../../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';
import Spinner from '../../../components/Spinner/Spinner';
import backgroundImg from 'src/assets/images/backgrounds/5153829.jpg';
import MainTopic from 'src/components/Topic/MainTopic';
import { InputAdornment } from '@mui/material';
import getAllBooks from 'src/api/book/get_all_books';
import updateBook from 'src/api/book/book_update';
import deleteBook from 'src/api/book/book_delete';
import DropDownList from 'src/components/DropDownList/DropDownList';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { styled } from '@mui/material/styles';
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

const BookDetailsPage = () => {
  const [pdf, setPdf] = useState(null);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [summary, setSummary] = useState('');
  const [price, setPrice] = useState(0);
  const [imageLink, setImageLink] = useState('');
  const [pdfLink, setPDFLink] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingdetails, setLoadingDetails] = useState('');
  const updateData = {};
  const BOOK_CATEGORIES = [
    'Adventure',
    'Mystery',
    'Poetry',
    'Non-Fiction',
    'Fairy Tales and Folklore',
    'Animal Stories',
  ];

  const fetchData = async () => {
    const data = await getAllBooks(id);
    setBook(data);
    console.log(data);
  };

  const handleUpdate = async () => {
    console.log(imageLink);
    console.log(summary);
    if (title !== '') {
      updateData.title = title;
    }
    if (author !== '') {
      updateData.author = author;
    }
    if (genre !== '') {
      updateData.genre = genre;
    }
    if (summary !== '') {
      updateData.summary = summary;
    }
    if (price !== 0) {
      updateData.price = price;
    }
    if (imageLink !== '') {
      updateData.coverpage = imageLink;
    }
    if (pdfLink !== '') {
      updateData.pdf = pdfLink;
    }
    if (Object.keys(updateData).length === 0) {
      toast.error('No changes to update!', {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      updateData.id = id;

      const data = await updateBook(updateData);
      if (data.message === 'Book is updated successfully') {
        setLoadingDetails('Book is updated successfully');
        toast.success('Book is updated successfully!', {
          position: toast.POSITION.TOP_RIGHT,
        });
        fetchData();
      }
    }
  };

  const handleUpload = () => {
    console.log('uploading');
    setLoading(true);
    if (pdf !== null) {
      const storageRef = ref(storage, `pdf/${pdf.name + v4()}`);
      uploadBytes(storageRef, pdf)
        .then((snapshot) => {
          console.log('Uploaded pdf!');
          getDownloadURL(snapshot.ref)
            .then((url) => {
              setLoading(false);
              setPDFLink(url);
              setLoadingDetails('PDF uploaded successfully!');
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    }
    if (image !== null) {
      const storageRef2 = ref(storage, `images/${image.name + v4()}`);
      uploadBytes(storageRef2, image)
        .then((snapshot) => {
          console.log('Uploaded coverpage!');
          getDownloadURL(snapshot.ref)
            .then((url) => {
              setLoading(false);
              setImageLink(url);
              setLoadingDetails('Coverpage uploaded successfully!');
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

  const handleDelete = async () => {
    const data = await deleteBook(id);
    if (data.message === 'Book is deleted successfully!') {
      window.location.href = '/products';
    }
  };

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');
  const [book, setBook] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <PageContainer title="Book Details" description="this is Book Details">
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
              width: '19%',
              height: '50%',
              maxWidth: '1000px',
              margin: '0 auto',
              backgroundColor: '#fafaf7',
            }}
          >
            <MainTopic text="Change Book Details" />
          </Paper>
          <Paper
            elevation={10}
            style={{
              padding: '30px',
              width: '80%',
              maxWidth: '900px',
              margin: '0 auto',
              backgroundColor: '#fafaf7',
            }}
          >
            <Box>
              <Grid container spacing={3}>
                <>
                  <Grid item xs={12} lg={3.2}>
                    <style>
                      {`
                      .styled-image {
                        border-radius: 20px;
                        box-shadow: 0px 0px 5px rgba(0.7, 0, 0.9, 0.9);
                        max-width: 100%;
                        max-height: 300px;
                        transition: transform 0.3s; /* Add a smooth transition effect */
                      }

                      /* Apply the hover effect when hovering over .styled-image */
                      .styled-image:hover {
                        transform: scale(1.1); /* Increase the size by 5% when hovering */
                      }
                    `}
                    </style>
                    <img
                      src={book.coverpage}
                      alt="img"
                      width="100%"
                      className="styled-image" // Apply the CSS class
                    />
                  </Grid>
                  <Grid item xs={8} lg={8.7}>
                    <Box>
                      <Stack mb={9}>
                        <Typography
                          variant="subtitle1"
                          fontWeight={600}
                          component="label"
                          htmlFor="title"
                          mb="5px"
                        >
                          Title:{' '}
                          <span
                            style={{
                              color: 'blue',
                              fontStyle: 'italic',
                              fontWeight: '800',
                              fontSize: '16px',
                            }}
                          >
                            {book.title}
                          </span>
                        </Typography>
                        <CustomTextField
                          label="Enter new title:"
                          id="title"
                          variant="outlined"
                          fullWidth
                          onChange={(e) => setTitle(e.target.value)}
                        />

                        <Typography
                          variant="subtitle1"
                          fontWeight={600}
                          component="label"
                          htmlFor="author"
                          mb="5px"
                          mt="15px"
                        >
                          Author:{' '}
                          <span
                            style={{
                              color: 'blue',
                              fontStyle: 'italic',
                              fontWeight: '800',
                              fontSize: '16px',
                            }}
                          >
                            {book.author}
                          </span>
                        </Typography>
                        <CustomTextField
                          label="Enter new author:"
                          id="author"
                          variant="outlined"
                          fullWidth
                          onChange={(e) => setAuthor(e.target.value)}
                        />

                        <Typography
                          variant="subtitle1"
                          fontWeight={600}
                          component="label"
                          htmlFor="Genre"
                          mb="5px"
                          mt="15px"
                        >
                          Genre:{' '}
                          <span
                            style={{
                              color: 'blue',
                              fontStyle: 'italic',
                              fontWeight: '800',
                              fontSize: '16px',
                            }}
                          >
                            {book.genre}
                          </span>
                        </Typography>
                        <DropDownList
                          label="Enter new Genre: "
                          items={BOOK_CATEGORIES}
                          onchange={setGenre}
                        />

                        <Typography
                          variant="subtitle1"
                          fontWeight={600}
                          component="label"
                          htmlFor="summary"
                          mb="5px"
                          mt="15px"
                        >
                          Summary:{' '}
                          <span
                            style={{
                              color: 'blue',
                              fontStyle: 'italic',
                              fontWeight: '800',
                              fontSize: '16px',
                            }}
                          >
                            {book.summary}
                          </span>
                        </Typography>
                        <CustomTextField
                          label="Enter new summary"
                          id="summary"
                          variant="outlined"
                          fullWidth
                          onChange={(e) => setSummary(e.target.value)}
                        />

                        <Typography
                          variant="subtitle1"
                          fontWeight={600}
                          component="label"
                          htmlFor="price"
                          mb="5px"
                          mt="15px"
                        >
                          Price:{' '}
                          <span
                            style={{
                              color: 'blue',
                              fontStyle: 'italic',
                              fontWeight: '800',
                              fontSize: '16px',
                            }}
                          >
                            {book.price}
                          </span>
                        </Typography>
                        <div></div>
                        <CustomTextField
                          label="Price"
                          type="number"
                          variant="outlined"
                          fullWidth
                          onChange={(e) => setPrice(e.target.value)}
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
                        />

                        <div style={{ display: 'flex', alignItems: 'center', paddingTop: '10px' }}>
                          <div style={{ flex: '1', marginRight: '20px' }}>
                            <Typography
                              variant="subtitle1"
                              fontWeight={600}
                              component="label"
                              mb="5px"
                              display="block"
                            >
                              Choose Book
                            </Typography>

                            <Button
                              component="label"
                              variant="contained"
                              startIcon={<CloudUploadIcon />}
                            >
                              Choose PDF
                              <VisuallyHiddenInput
                                type="file"
                                accept="application/pdf"
                                onChange={(e) => setPdf(e.target.files[0])}
                              />
                            </Button>
                          </div>

                          <div style={{ flex: '1' }}>
                            <Typography
                              variant="subtitle1"
                              fontWeight={600}
                              component="label"
                              htmlFor="ISBN"
                              mb="5px"
                              display="block"
                            >
                              Choose Cover Page
                            </Typography>

                            <Button
                              component="label"
                              variant="contained"
                              startIcon={<CloudUploadIcon />}
                            >
                              Choose Coverpage
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
                            startIcon={<IconAdjustments />}
                            onClick={handleUpdate}
                            style={{ width: '50%' }}
                          >
                            Update details
                          </Button>
                        )}
                        {loading ? (
                          <div style={{ marginTop: '10px' }}>
                            <Spinner />
                          </div>
                        ) : null}
                        <div style={{ marginTop: '10px' }} /> {/* Add spacing */}
                        <Button
                          color="primary"
                          variant="contained"
                          size="large"
                          startIcon={<IconTrash />}
                          onClick={handleDelete}
                          style={{ width: '50%' }}
                        >
                          Delete book
                        </Button>
                      </div>
                      <Typography style={{ color: 'green' }}>{loadingdetails}</Typography>
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

export default BookDetailsPage;
