import React, { useEffect, useState, useMemo } from 'react';
import PageContainer from 'src/components/container/PageContainer';
import getClassrooms from 'src/api/classroom/getClassrroms';
import jwt from 'jwt-decode';
import Cookies from 'universal-cookie';
import { Box, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import moment from 'moment';
import PurpleButton from 'src/components/Buttons/BlackButton';
import deleteClassroom from 'src/api/classroom/deleteClassroom';
import UserAction from './UserAction';

const Classroom = () => {
  const [pageSize, setPageSize] = useState(5);
  const [rows, setRows] = useState([]);
  const [idList, setIdList] = useState([]);
  const [rowId, setRowId] = useState(null);
  const [selectionModel, setSelectionModel] = useState([]);
  const [message, setMessage] = useState('');

  const columns = useMemo(
    () => [
      { field: 'name', headerName: 'Class Name', width: 150, editable: true },
      { field: 'numberOfStudents', headerName: 'Number of Students', width: 150 },
      { field: 'description', headerName: 'Description', width: 240, editable: true },
      { field: 'createdAt', headerName: 'Created At', width: 230 },
      { field: 'updatedAt', headerName: 'Updated At', width: 230 },
      {
        field: 'actions',
        headerName: 'Actions',
        type: 'actions',
        renderCell: (params) => (
          <UserAction {...{ params, rowId, setRowId, selectionModel, idList }} />
        ),
      },
    ],
    [rowId, selectionModel],
  );

  const formatDate = (date) => {
    return moment(date).format('MMMM Do YYYY, h:mm:ss a');
  };

  const handleDelete = async () => {
    console.log(rows[selectionModel[0]]);
    console.log(idList[selectionModel[0]]);

    for (const element of selectionModel) {
      const response = await deleteClassroom(idList[element]);
      console.log(response);
    }

    setMessage('Classroom Deleted Successfully');
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
      const data = await getClassrooms(id);
      const newData = data;
      newData.forEach((item, index) => {
        let item1 = {
          id: index,
          name: item.name,
          numberOfStudents: item.numberOfStudents,
          description: item.description,
          createdAt: formatDate(item.createdAt),
          updatedAt: formatDate(item.updatedAt),
        };
        setRows((rows) => [...rows, item1]);
        setIdList((idList) => [...idList, item.id]);
      });
    } catch (err) {
      window.location.href = '/auth/teacherLogin';
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <PageContainer title="Classroom" description="this is Classroom Page">
      <Box
        sx={{
          height: 400,
          width: '100%',
        }}
      >
        <Typography variant="h3" component="h3" sx={{ textAlign: 'center', mt: 3, mb: 3 }}>
          Manage Classrooms
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
      <PurpleButton label={'Delete Classroom'} onClick={handleDelete} />
      <Box>
        <Typography style={{ color: 'green', textDecoration: 'none' }}>{message}</Typography>
      </Box>
    </PageContainer>
  );
};

export default Classroom;
