import baseURL from 'src/config/config';

export default async function getPapersStudent(id) {
  const response = await fetch(`${baseURL}/paper/paper-by-students?studentId=${id}`, {
    method: 'Get',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();

  return data;
}
