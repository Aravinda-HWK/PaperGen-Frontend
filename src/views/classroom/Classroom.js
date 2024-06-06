import React, { useEffect, useState, useMemo } from 'react';
import PageContainer from 'src/components/container/PageContainer';

import getClassrooms from 'src/api/classroom/getClassrroms';

import jwt from 'jwt-decode';
import Cookies from 'universal-cookie';
import { Box, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const Classroom = () => {
  const [pageSize, setPageSize] = useState(5);
  const [rows, setRows] = useState([]);

  const columns = useMemo(
    () => [
      { field: 'name', headerName: 'Class Name', width: 180 },
      { field: 'numberOfStudents', headerName: 'Number of Students', width: 170 },
      { field: 'description', headerName: 'Description', width: 300 },
      { field: 'createdAt', headerName: 'Created At', width: 250 },
      { field: 'updatedAt', headerName: 'Updated At', width: 80 },
    ],
    [],
  );

  const fetchData = async () => {
    try {
      const cookies = new Cookies();
      const token = cookies.get('token');
      const id = jwt(token).id;
      console.log(id);
      const data = await getClassrooms(id);
      const newData = data;
      console.log(newData);
      newData.forEach((item, index) => {
        let item1 = {
          id: index,
          name: item.name,
          numberOfStudents: item.numberOfStudents,
          description: item.description,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
        };
        setRows((rows) => [...rows, item1]);
      });
    } catch (err) {
      console.error('Error:', err);
      // window.location.href = '/auth/teacherLogin';
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

export default Classroom;
