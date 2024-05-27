import PageContainer from 'src/components/container/PageContainer';
import { Box, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState, useMemo } from 'react';
import getAll from 'src/api/book/getBookPublisher';
import Avatar from '@mui/material/Avatar';
import UserAction from './UserAction';
import PurpleButton from 'src/components/Buttons/PurpleButton';
import deleteBook from 'src/api/book/book_delete';
import { getAdminToken } from 'src/config/token/getAdminToken';

const BookManage = () => {
  const [pageSize, setPageSize] = useState(5);
  const [rows, setRows] = useState([]);
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
      { field: 'title', headerName: 'Title', width: 200, editable: true },
      { field: 'author', headerName: 'Author', width: 150, editable: true },
      { field: 'genre', headerName: 'Genre', width: 140 },
      { field: 'price', headerName: 'Price', width: 100, editable: true },
      {
        field: 'logo',
        headerName: 'Publisher',
        width: 90,
        renderCell: (params) => <Avatar src={params.row.logo} sx={{ width: 40, height: 40 }} />,
        sortable: false,
        filterable: false,
      },
      { field: 'name', headerName: 'Name', width: 220 },
      {
        field: 'actions',
        headerName: 'Actions',
        type: 'actions',
        renderCell: (params) => <UserAction {...{ params, rowId, setRowId, selectionModel }} />,
      },
    ],
    [rowId, selectionModel],
  );

  const fetchData = async () => {
    try {
      getAdminToken();
    } catch (err) {
      window.location.href = '/auth/login';
    }
    try {
      const data = await getAll();
      setRows([]);
      const newData = data.data;
      console.log(data.data);
      newData.forEach((item, index) => {
        let item1 = {
          coverpage: item.book_details.coverpage,
          title: item.book_details.title,
          author: item.book_details.author,
          genre: item.book_details.genre,
          price: item.book_details.price,
          logo: item.book_details.publisher_details.logo,
          name: item.book_details.publisher_details.name,
          id: item.book_details._id,
        };
        setRows((rows) => [...rows, item1]);
      });
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

  return (
    <PageContainer title="Book Manage" description="this is Book Manage Page">
      <Box
        sx={{
          height: 400,
          width: '100%',
        }}
      >
        <Typography variant="h3" component="h3" sx={{ textAlign: 'center', mt: 3, mb: 3 }}>
          Manage Customers
        </Typography>
        <DataGrid
          columns={columns}
          rows={rows}
          getRowId={(rows) => rows.id}
          rowsPerPageOptions={[5, 10, 20]}
          pageSize={pageSize}
          pagination
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          checkboxSelection
          selectionModel={selectionModel}
          onRowSelectionModelChange={(newSelectionModel) => {
            setSelectionModel(newSelectionModel);
          }}
          getRowSpacing={(params) => ({
            top: params.isFirstVisible ? 0 : 8,
            bottom: params.isLastVisible ? 0 : 8,
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
      <div style={{
        padding: '30px',
      }}>

      </div>
      <PurpleButton label={'Delete Book'} onClick={handleDelete} />
      <Box>
        <Typography style={{ color: 'green', textDecoration: 'none' }}>{message}</Typography>
      </Box>
    </PageContainer>
  );
};

export default BookManage;
