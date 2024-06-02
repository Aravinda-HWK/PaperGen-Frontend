import React, { useState, useEffect, useMemo } from 'react';
import { Grid, Box, Typography } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import CoverPage from '../../components/CoverPage/CoverPage';
import ComponentSlider from '../../components/Slider/ComponentSlider';
import { getAuthToken } from '../authentication/auth/TeacherAuthLogin';
import jwt from 'jwt-decode';
import Avatar from '@mui/material/Avatar';
import deleteBook from 'src/api/book/book_delete';
import PurpleButton from 'src/components/Buttons/PurpleButton';
import publisherBook from 'src/api/products/publisher_book';
import { DataGrid } from '@mui/x-data-grid';

const Products = () => {
  const [booklist, setBooklist] = useState([]);
  const [pageSize, setPageSize] = useState(5);
  const [rowId, setRowId] = useState(null);
  const [selectionModel, setSelectionModel] = useState([]);
  const [message, setMessage] = useState('');

  const columns = useMemo(
    () => [
      {
        field: 'coverpage',
        headerName: 'Coverpage',
        width: 90,
        renderCell: (params) => (
          <Avatar src={params.row.coverpage} sx={{ width: 40, height: 40 }} />
        ),
        sortable: false,
        filterable: false,
      },
      { field: 'title', headerName: 'Title', width: 300 },
      { field: 'author', headerName: 'Author', width: 300 },
      { field: 'price', headerName: 'Price', width: 80 },
      { field: 'genre', headerName: 'Genre', width: 250 },
      { field: 'ISBN', headerName: 'ISBN', width: 80 },
    ],
    [rowId, selectionModel],
  );

  const fetchData = async () => {
    try {
      const token = getAuthToken();
      const id = jwt(token)._id;
      const data = await publisherBook(id);
      setBooklist(data.response);
      console.log(data.response);
    } catch (err) {
      window.location.href = '/auth/login';
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async () => {
    console.log(selectionModel);
    for (const element of selectionModel) {
      const response = await deleteBook(element);
      console.log(response);
    }
    setMessage('Book Deleted Successfully');
    fetchData();
  };

  const newbooklist = booklist.map((book, index) => (
    <CoverPage
      title={book.title}
      author={book.author}
      price={book.price}
      photo={book.coverpage}
      id={book._id}
    />
  ));

  return (
    <PageContainer title="Products" description="this is Products">
      <Box
        sx={{
          height: 400,
          width: '100%',
        }}
      >
        <Typography variant="h3" component="h3" sx={{ textAlign: 'center', mt: 3, mb: 3 }}>
          Manage books
        </Typography>
        <DataGrid
          columns={columns}
          rows={booklist}
          rowsPerPageOptions={[5, 10, 20]}
          pageSize={pageSize}
          pagination
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          checkboxSelection
          selectionModel={selectionModel}
          getRowId={(book) => book._id}
          onRowSelectionModelChange={(newSelectionModel) => {
            setSelectionModel(newSelectionModel);
          }}
          getRowSpacing={(params) => ({
            top: params.isFirstVisible ? 0 : 5,
            bottom: params.isLastVisible ? 0 : 5,
          })}
          sx={{
            '& .MuiDataGrid-cell--textLeft': {
              textAlign: 'left',
            },
            '& .MuiDataGrid-columnsContainer': {
              backgroundColor: (theme) => (theme.palette.mode === 'light' ? '#fafafa' : '#1c2125'),
            },
            '& .MuiDataGrid-iconSeparator': {
              display: 'none',
            },
            '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
              borderRight: `2px solid rgba(224, 224, 224, 1)`,
            },
            '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
              borderBottom: `3px solid rgba(224, 224, 224, 1)`,
            },
          }}
          onCellEditStop={(params) => {
            // This callback is called when a cell is edited and committed.
            // You can access the row ID using params.id.
            const editedRowId = params.id;
            setRowId(editedRowId); // Update the rowId state with the edited row ID
          }}
        />
      </Box>
      <div
        style={{
          padding: '25px',
        }}
      ></div>
      <PurpleButton label={'Delete Book'} onClick={handleDelete} />
      <Box>
        <Typography style={{ color: 'green', textDecoration: 'none' }}>{message}</Typography>
      </Box>

      <Box
        style={{
          paddingTop: '30px',
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <ComponentSlider components={newbooklist} className="bg-white/80" />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Products;
