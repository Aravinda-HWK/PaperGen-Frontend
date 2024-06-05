import baseURL from 'src/config/config';

export default async function getTeacher(id, token) {
  const response = await fetch(`${baseURL}/auth?id=${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();

  return data;
}
