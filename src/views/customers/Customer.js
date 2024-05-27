import React, { useEffect, useState, useMemo } from 'react';
import PageContainer from 'src/components/container/PageContainer';

import getDetails from 'src/api/customers/getDetails';

import jwt from 'jwt-decode';
import Cookies from 'universal-cookie';
import { Box, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Avatar from '@mui/material/Avatar';

const Customers = () => {
  const [pageSize, setPageSize] = useState(5);
  const [rows, setRows] = useState([]);

  const columns = useMemo(
    () => [
      {
        field: 'image_link',
        headerName: 'Avator',
        width: 70,
        renderCell: (params) => <Avatar src={params.row.image_link} sx={{ width: 40, height: 40 }} />,
        sortable: false,
        filterable: false,
      },
      { field: 'name', headerName: 'Name', width: 180 },
      { field: 'username', headerName: 'Username', width: 170 },
      { field: 'title', headerName: 'Title', width: 300 },
      { field: 'genre', headerName: 'Genre', width: 250 },
      { field: 'ISBN', headerName: 'ISBN', width: 80 },
      { field: 'price', headerName: 'Price', width: 80 },
    ],
    [],
  );

  const fetchData = async () => {
    try {
      const cookies = new Cookies();
      const token = cookies.get('token');
      const id = jwt(token)._id;
      const data = await getDetails(id);
      const newData = data.read_books;
      newData.forEach((item, index) => {
        let item1 = {
          image_link: item.user_details.image_link,
          name: item.user_details.name,
          username: item.user_details.username,
          title: item.book_details.title,
          genre: item.book_details.genre,
          ISBN: item.book_details.ISBN,
          price: item.book_details.price,
          id: index,
        };
        setRows((rows) => [...rows, item1]);
      });
      console.log(data);
    } catch (err) {
      window.location.href = '/auth/login';
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <PageContainer title="Customer" description="this is Customer Page">
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
        />
      </Box>
    </PageContainer>
  );
};

export default Customers;
