import baseURL from 'src/config/config';

export default async function getResultsStudent(id) {
  const response = await fetch(`${baseURL}/result/student-results?studentID=${id}`, {
    method: 'Get',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();

  return data;
}
