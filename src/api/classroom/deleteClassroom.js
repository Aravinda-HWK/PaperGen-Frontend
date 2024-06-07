import baseURL from 'src/config/config';

export default async function deleteClassroom(id) {
  const response = await fetch(`${baseURL}/classroom/delete`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ classroomID: id }),
  });
  const data = await response.json();

  return data;
}
