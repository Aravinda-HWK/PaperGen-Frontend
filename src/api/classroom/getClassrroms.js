import baseURL from 'src/config/config';

const getClassrroms = async (id) => {
  const response = await fetch(`${baseURL}/classroom/teacher-classrooms?teacherID=${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return data;
};

export default getClassrroms;
