import baseURL from 'src/config/config';

const getClassrromsStudent = async (id) => {
  const response = await fetch(`${baseURL}/classroom/classroom-by-student?studentID=${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return data;
};

export default getClassrromsStudent;
