import PageContainer from 'src/components/container/PageContainer';
import { Box, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState, useMemo } from 'react';
import getAll from 'src/api/classroom/getAll';
import moment from 'moment';
import Avatar from '@mui/material/Avatar';
import UserAction from './UserAction';
import PurpleButton from 'src/components/Buttons/BlackButton';
// import deleteUser from 'src/api/classroom/deleteClassroom';
import { getAdminToken } from 'src/config/token/getAdminToken';

const Customer = () => {
  const [pageSize, setPageSize] = useState(5);
  const [rows, setRows] = useState([]);
  const [rowId, setRowId] = useState(null);
  const [selectionModel, setSelectionModel] = useState([]);
  const [message, setMessage] = useState('');

  const columns = useMemo(
    () => [
      {
        field: 'image_link',
        headerName: 'Avator',
        width: 70,
        renderCell: (params) => (
          <Avatar src={params.row.image_link} sx={{ width: 40, height: 40 }} />
        ),
        sortable: false,
        filterable: false,
      },
      { field: 'name', headerName: 'Name', width: 150, editable: true },
      { field: 'email', headerName: 'Email', width: 200, editable: true },
      { field: 'username', headerName: 'Username', width: 120, editable: true },
      {
        field: 'createdAt',
        headerName: 'Created At',
        width: 100,
        renderCell: (params) => {
          return moment(params.value).format('DD/MM/YYYY');
        },
      },
      { field: 'bio_data', headerName: 'Bio Data', width: 220, editable: true },
      { field: 'phonenumber', headerName: 'Phone Number', width: 130, editable: true },
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
      for (const element of data.users) {
        let item = {
          image_link: element.image_link,
          name: element.name,
          email: element.email,
          username: element.username,
          createdAt: element.createdAt,
          bio_data: element.bio_data,
          phonenumber: element.phonenumber,
          id: element._id,
        };
        setRows((rows) => [...rows, item]);
        // console.log(data.data[i]);
      }
      console.log(data);
    } catch (err) {
      window.location.href = '/auth/login';
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async () => {
    // console.log(selectionModel);
    // for (const element of selectionModel) {
    //   const response = await deleteUser(element);
    //   console.log(response);
    // }
    // setMessage('Publisher Deleted Successfully');
    // fetchData();
  };

  return (
    <PageContainer title="Customer Page" description="this is Customer Page">
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
      <div
        style={{
          padding: '30px',
        }}
      ></div>
      <PurpleButton label={'Delete Reader'} onClick={handleDelete} />
      <Box>
        <Typography style={{ color: 'green', textDecoration: 'none' }}>{message}</Typography>
      </Box>
    </PageContainer>
  );
};

export default Customer;
