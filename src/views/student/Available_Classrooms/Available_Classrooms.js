import React, { useEffect, useState, useMemo } from 'react';
import PageContainer from 'src/components/container/PageContainer';
import getAllAvailableClassrooms from 'src/api/classroom/getAllAvailableClassrooms';
import jwt from 'jwt-decode';
import Cookies from 'universal-cookie';
import {
  Box,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Button,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import moment from 'moment';
import Avatar from '@mui/material/Avatar';
import BlackButton from 'src/components/Buttons/BlackButton';
import createRequest from 'src/api/request/createRequest';

const Available_Classrooms = () => {
  const [pageSize, setPageSize] = useState(5);
  const [rows, setRows] = useState([]);
  const [rowId, setRowId] = useState(null);
  const [selectionModel, setSelectionModel] = useState([]);
  const [studentId, setStudentId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [message, setMessage] = useState('');

  const columns = useMemo(
    () => [
      { field: 'classroom', headerName: 'Classroom', width: 130 },
      { field: 'description', headerName: 'Description', width: 300 },
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
      { field: 'firstName', headerName: 'First Name', width: 130 },
      { field: 'lastName', headerName: 'Last Name', width: 130 },
      { field: 'email', headerName: 'Email', width: 280 },
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
      setStudentId(id);
      const data = await getAllAvailableClassrooms();
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

  const joinClassroom = () => {
    if (selectionModel.length === 0) {
      alert('Please select a classroom to join');
    } else if (selectionModel.length > 1) {
      alert('Please select only one classroom to join');
    } else {
      setOpenDialog(true);
    }
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setMessage('');
  };

  const handleDialogSubmit = () => {
    const selectedClassroom = rows.find((row) => row.id === selectionModel[0]);
    console.log(selectedClassroom.classroomId, studentId, message);

    const requestData = {
      classroomId: selectedClassroom.classroomId,
      studentId: studentId,
      message: message,
    };

    // Make the API call to join the classroom with the requestData
    const response = createRequest(requestData);

    if (response) {
      alert('Request sent successfully');
      // Reload the page
      window.location.reload();
    } else {
      alert('Request failed');
    }

    handleDialogClose();
  };

  return (
    <PageContainer
      title="Available Classroom List"
      description="this is Available Classroom List Page"
    >
      <Box
        sx={{
          height: 400,
          width: '100%',
        }}
      >
        <Typography variant="h3" component="h3" sx={{ textAlign: 'center', mt: 3, mb: 3 }}>
          Available List of Classroom
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
      <BlackButton label={'Join Classroom'} onClick={joinClassroom}></BlackButton>
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Join Classroom</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter a message to the teacher when requesting to join the classroom.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="message"
            label="Message"
            type="text"
            fullWidth
            variant="outlined"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDialogSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </PageContainer>
  );
};

export default Available_Classrooms;
