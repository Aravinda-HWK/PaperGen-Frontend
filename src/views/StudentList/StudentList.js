import React, { useEffect, useState, useMemo } from 'react';
import PageContainer from 'src/components/container/PageContainer';
import getStudentForTeacher from 'src/api/student/getStudentForTeacher';
import jwt from 'jwt-decode';
import Cookies from 'universal-cookie';
import { Box, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import moment from 'moment';
import PurpleButton from 'src/components/Buttons/BlackButton';
import deleteStudentClassroom from 'src/api/student/deleteStudentClassroom';
import Avatar from '@mui/material/Avatar';

const StudentList = () => {
  const [pageSize, setPageSize] = useState(5);
  const [rows, setRows] = useState([]);
  const [rowId, setRowId] = useState(null);
  const [selectionModel, setSelectionModel] = useState([]);
  const [message, setMessage] = useState('');

  const columns = useMemo(
    () => [
      {
        field: 'photo',
        headerName: 'Avator',
        width: 70,
        renderCell: (params) => <Avatar src={params.row.photo} sx={{ width: 40, height: 40 }} />,
        sortable: false,
        filterable: false,
      },
      { field: 'classroom', headerName: 'Classroom', width: 100 },
      { field: 'firstName', headerName: 'First Name', width: 100 },
      { field: 'lastName', headerName: 'Last Name', width: 100 },
      { field: 'email', headerName: 'Email', width: 220 },
      { field: 'description', headerName: 'Description', width: 200 },
      { field: 'createdAt', headerName: 'Created At', width: 220 },
      { field: 'updatedAt', headerName: 'Updated At', width: 220 },
    ],
    [rowId, selectionModel],
  );

  const formatDate = (date) => {
    return moment(date).format('MMMM Do YYYY, h:mm:ss a');
  };

  const handleDelete = async () => {
    console.log(rows[selectionModel[0]]);

    for (const element of selectionModel) {
      const response = await deleteStudentClassroom(
        rows[element].classroomId,
        rows[element].studentId,
      );
      console.log(response);
    }

    setMessage('Student is removed from the classroom successfully!');
    setTimeout(() => {
      setMessage('');
      window.location.reload();
    }, 1000);
  };

  const fetchData = async () => {
    try {
      const cookies = new Cookies();
      const token = cookies.get('token');
      const id = jwt(token).id;
      const data = await getStudentForTeacher(id);
      const newData = data;
      newData.forEach((item, index) => {
        let item1 = {
          id: index,
          photo: item.photo,
          firstName: item.firstName,
          lastName: item.lastName,
          email: item.email,
          classroom: item.classroom.name,
          description: item.description,
          createdAt: formatDate(item.createdAt),
          updatedAt: formatDate(item.updatedAt),
          classroomId: item.classroom.id,
          studentId: item.id,
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
    <PageContainer title="Student List" description="this is Student List Page">
      <Box
        sx={{
          height: 400,
          width: '100%',
        }}
      >
        <Typography variant="h3" component="h3" sx={{ textAlign: 'center', mt: 3, mb: 3 }}>
          Manage Student List
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
          checkboxSelection
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
      <PurpleButton label={'Remove Student'} onClick={handleDelete} />
      <Box>
        <Typography style={{ color: 'green', textDecoration: 'none' }}>{message}</Typography>
      </Box>
    </PageContainer>
  );
};

export default StudentList;
