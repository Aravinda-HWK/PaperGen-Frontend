import React, { useEffect, useState, useMemo } from 'react';
import PageContainer from 'src/components/container/PageContainer';
import getResultsStudent from 'src/api/paper/result';
import jwt from 'jwt-decode';
import Cookies from 'universal-cookie';
import { Box, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import moment from 'moment';
import BlackButton from 'src/components/Buttons/BlackButton';

const ResultList = () => {
  const [pageSize, setPageSize] = useState(5);
  const [rows, setRows] = useState([]);
  const [rowId, setRowId] = useState(null);
  const [selectionModel, setSelectionModel] = useState([]);

  const columns = useMemo(
    () => [
      { field: 'name', headerName: 'Name', width: 140 },
      { field: 'description', headerName: 'Description', width: 200 },
      { field: 'score', headerName: 'Score', width: 150 },
      { field: 'number_of_questions', headerName: 'Number Of Questions', width: 180 },
      { field: 'mark_percentage', headerName: 'Mark Percentage', width: 180 },
      { field: 'created_at', headerName: 'Created At', width: 220 },
      { field: 'updated_at', headerName: 'Updated At', width: 220 },
    ],
    [rowId, selectionModel],
  );

  const formatDate = (date) => {
    return moment(date).format('MMMM Do YYYY, h:mm:ss a');
  };

  const calculateMarkPercentage = (score, numberOfQuestions) => {
    return ((score / numberOfQuestions) * 100).toFixed(2);
  };

  const fetchData = async () => {
    try {
      const cookies = new Cookies();
      const token = cookies.get('student_token');
      const id = jwt(token).id;
      const data = await getResultsStudent(id);
      const newData = data;
      console.log(newData);
      newData.forEach((item, index) => {
        let item1 = {
          id: item.id,
          name: item.paperName,
          description: item.paperDescription,
          score: item.score,
          number_of_questions: item.numberOfQuestions,
          mark_percentage: calculateMarkPercentage(item.score, item.numberOfQuestions),
          created_at: formatDate(item.createdAt),
          updated_at: formatDate(item.updatedAt),
          classroomId: item.classroomId,
          paperId: item.paperId,
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
      console.log(selectionModel[0]);
      if (selectionModel.length > 1) {
        alert('Please select only one paper to view');
      } else {
        window.location.href = `/student/review/${selectionModel[0]}`;
      }
    }
  };

  return (
    <PageContainer title="Result List" description="this is Result List Page">
      <Box
        sx={{
          height: 400,
          width: '100%',
        }}
      >
        <Typography variant="h3" component="h3" sx={{ textAlign: 'center', mt: 3, mb: 3 }}>
          Manage Result List
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
      <BlackButton label={'Review Paper'} onClick={goToSelectedPaper}></BlackButton>
    </PageContainer>
  );
};

export default ResultList;
