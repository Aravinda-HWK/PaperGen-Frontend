import baseURL from 'src/config/config';

export default async function getPaperGivenId(id) {
  const response = await fetch(`${baseURL}/paper/paper-by-id?id=${id}`, {
    method: 'Get',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();

  return data;
}
