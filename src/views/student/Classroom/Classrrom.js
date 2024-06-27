import React, { useEffect, useState, useMemo } from 'react';
import PageContainer from 'src/components/container/PageContainer';
import getClassroomsStudent from 'src/api/classroom/getClassroomsStudent';
import jwt from 'jwt-decode';
import Cookies from 'universal-cookie';
import { Box, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import moment from 'moment';
import Avatar from '@mui/material/Avatar';

const ClassroomList = () => {
  const [pageSize, setPageSize] = useState(5);
  const [rows, setRows] = useState([]);
  const [rowId, setRowId] = useState(null);
  const [selectionModel, setSelectionModel] = useState([]);

  const columns = useMemo(
    () => [
      { field: 'classroom', headerName: 'Classroom', width: 100 },
      { field: 'description', headerName: 'Description', width: 200 },
      { field: 'createdAt', headerName: 'Created At', width: 220 },
      { field: 'updatedAt', headerName: 'Updated At', width: 220 },
      {
        field: 'photo',
        headerName: 'Teacher Photo',
        width: 130,
        renderCell: (params) => (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
            }}
          >
            <Avatar src={params.row.photo} sx={{ width: 40, height: 40 }} />
          </div>
        ),
        sortable: false,
        filterable: false,
      },
      { field: 'firstName', headerName: 'First Name', width: 100 },
      { field: 'lastName', headerName: 'Last Name', width: 100 },
      { field: 'email', headerName: 'Email', width: 220 },
    ],
    [rowId, selectionModel],
  );

  const formatDate = (date) => {
    return moment(date).format('MMMM Do YYYY, h:mm:ss a');
  };

  const fetchData = async () => {
    try {
      const cookies = new Cookies();
      const token = cookies.get('student_token');
      const id = jwt(token).id;
      const data = await getClassroomsStudent(id);
      const newData = data;
      newData.forEach((item, index) => {
        let item1 = {
          id: index,
          photo: item.teacher.photo,
          firstName: item.teacher.firstName,
          lastName: item.teacher.lastName,
          email: item.teacher.email,
          classroom: item.name,
          description: item.description,
          createdAt: formatDate(item.createdAt),
          updatedAt: formatDate(item.updatedAt),
          classroomId: item.id,
          teachertId: item.teacher.id,
        };
        setRows((rows) => [...rows, item1]);
      });
    } catch (err) {
      window.location.href = '/auth/teacherLogin';
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <PageContainer title="Classroom List" description="this is Classroom List Page">
      <Box
        sx={{
          height: 400,
          width: '100%',
        }}
      >
        <Typography variant="h3" component="h3" sx={{ textAlign: 'center', mt: 3, mb: 3 }}>
          View List of Classroom
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
          selectionModel={selectionModel}
          onRowSelectionModelChange={(newSelectionModel) => {
            setSelectionModel(newSelectionModel);
          }}
          sx={{
            '& .MuiDataGrid-cell--textLeft': {
              textAlign: 'left',
            },
            '& .MuiDataGrid-columnsContainer': {
              backgroundColor: (theme) => (theme.palette.mode === 'light' ? 'white' : '#1c2125'),
            },
            '& .MuiDataGrid-iconSeparator': {
              display: 'none',
            },
            '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
              borderRight: `2px solid black`,
              borderBottom: `2px solid black`,
              borderLeft: `2px solid black`,
              borderTop: `2px solid black`,
            },
            '& .MuiDataGrid-columnHeaderTitle': {
              fontWeight: 'bold',
              fontSize: '1.1em',
              fontFamily: 'times new roman',
              color: 'black',
            },
            '& .MuiDataGrid-columnHeader': {
              backgroundColor: 'lightgray', // Set header background color
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
    </PageContainer>
  );
};

export default ClassroomList;
