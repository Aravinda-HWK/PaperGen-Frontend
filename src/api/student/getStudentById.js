import baseURL from 'src/config/config';

const getStudentById = async (id) => {
  const response = await fetch(`${baseURL}/student?id=${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return data;
};

export default getStudentById;
