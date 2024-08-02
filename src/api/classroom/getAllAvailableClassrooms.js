import baseURL from 'src/config/config';

const getAllAvailableClassrooms = async (id) => {
  const response = await fetch(`${baseURL}/classroom/all-classrooms?studentID=${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return data;
};

export default getAllAvailableClassrooms;
