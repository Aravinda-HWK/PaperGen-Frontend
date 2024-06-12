import baseURL from 'src/config/config';

export default async function addStudent(requestData) {
  const response = await fetch(`${baseURL}/classroom/add-student`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestData),
  });
  const data = await response.json();

  return data;
}
