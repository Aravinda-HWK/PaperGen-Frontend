import PageContainer from 'src/components/container/PageContainer';
import { Box, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState, useMemo } from 'react';
import getAll from 'src/api/publisher/getAll';
import Avatar from '@mui/material/Avatar';
import UserAction from './UserAction';
import PurpleButton from 'src/components/Buttons/PurpleButton';
import deletePublisher from 'src/api/publisher/deletePublisher';

const Publisher = () => {
  const [pageSize, setPageSize] = useState(5);
  const [rows, setRows] = useState([]);
  const [rowId, setRowId] = useState(null);
  const [selectionModel, setSelectionModel] = useState([]);
  const [message, setMessage] = useState('');

  const columns = useMemo(
    () => [
      {
        field: 'logo',
        headerName: 'Avator',
        width: 100,
        renderCell: (params) => <Avatar src={params.row.logo} sx={{ width: 40, height: 40 }} />,
        sortable: false,
        filterable: false,
      },
      { field: 'name', headerName: 'Name', width: 150, editable: true },
      { field: 'email', headerName: 'Email', width: 250, editable: true },
      { field: 'username', headerName: 'Username', width: 120, editable: true },
      { field: 'bio_data', headerName: 'Bio Data', width: 250, editable: true },
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
      const data = await getAll();
      setRows([]);
      for (const element of data.publishers) {
        let item = {
          logo: element.logo,
          name: element.name,
          email: element.email,
          username: element.username,
          bio_data: element.bio_data,
          phonenumber: element.phonenumber,
          id: element._id,
        };
        setRows((rows) => [...rows, item]);
      }
      console.log(data);
    } catch (err) {
      window.location.href = '/auth/login';
    }
  };

  const handleDelete = async () => {
    console.log(selectionModel);
    for (const element of selectionModel) {
      const response = await deletePublisher(element);
      console.log(response);
    }
    setMessage('Publisher Deleted Successfully');
    fetchData();
  };
  useEffect(() => {
    fetchData();
    console.log(rowId);
  }, []);
  return (
    <PageContainer title="Publisher Page" description="this is Publisher Page">
      <Box
        sx={{
          height: 400,
          width: '100%',
        }}
      >
        <Typography variant="h3" component="h3" sx={{ textAlign: 'center', mt: 3, mb: 3 }}>
          Manage Publihsers
        </Typography>
        <DataGrid
          columns={columns}
          rows={rows}
          getRowId={(row) => row.id}
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
      <PurpleButton label={'Delete Publisher'} onClick={handleDelete} />
      <Box>
        <Typography style={{ color: 'green', textDecoration: 'none' }}>{message}</Typography>
      </Box>
    </PageContainer>
  );
};

export default Publisher;
