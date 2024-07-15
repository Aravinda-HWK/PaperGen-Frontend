import React, { useEffect, useState, useMemo } from 'react';
import PageContainer from 'src/components/container/PageContainer';
import getPapersStudent from 'src/api/paper/getPapersStudent';
import jwt from 'jwt-decode';
import Cookies from 'universal-cookie';
import { Box, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import moment from 'moment';
import BlackButton from 'src/components/Buttons/BlackButton';

const PaperList = () => {
  const [pageSize, setPageSize] = useState(5);
  const [rows, setRows] = useState([]);
  const [rowId, setRowId] = useState(null);
  const [selectionModel, setSelectionModel] = useState([]);

  const columns = useMemo(
    () => [
      { field: 'name', headerName: 'Name', width: 140 },
      { field: 'description', headerName: 'Description', width: 200 },
      { field: 'classroomName', headerName: 'Classroom Name', width: 150 },
      { field: 'usedNumberOfQuestions', headerName: 'Number Of Questions', width: 180 },
      { field: 'startTime', headerName: 'Start Time', width: 220 },
      { field: 'endTime', headerName: 'End Time', width: 220 },
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
      const data = await getPapersStudent(id);
      const newData = data;
      console.log(newData);
      newData.forEach((item, index) => {
        let item1 = {
          id: index,
          name: item.name,
          classroomName: item.classroom.name,
          description: item.description,
          usedNumberOfQuestions: item.usedNumberOfQuestions,
          startTime: formatDate(item.startTime),
          endTime: formatDate(item.endTime),
          classroomId: item.classroomId,
          paperId: item.id,
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

  const goToSelectedPaper = () => {
    if (selectionModel.length === 0) {
      alert('Please select a paper to view');
    } else {
      if (selectionModel.length > 1) {
        alert('Please select only one paper to view');
      } else {
        // console.log(rows[selectionModel[0]]);
        window.location.href = `/student/paper/create/${rows[selectionModel[0]].paperId}`;
      }
    }
  };

  return (
    <PageContainer title="Paper List" description="this is Paper List Page">
      <Box
        sx={{
          height: 400,
          width: '100%',
        }}
      >
        <Typography variant="h3" component="h3" sx={{ textAlign: 'center', mt: 3, mb: 3 }}>
          Manage Paper List
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
      <BlackButton label={'Attempt Paper'} onClick={goToSelectedPaper}></BlackButton>
    </PageContainer>
  );
};

export default PaperList;
