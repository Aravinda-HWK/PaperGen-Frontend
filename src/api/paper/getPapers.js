import baseURL from 'src/config/config';

export default async function getPapers(requestData) {
  const response = await fetch(
    `${baseURL}/paper/paper-by-teachers?teacherId=${requestData.teacherId}`,
    {
      method: 'Get',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  const data = await response.json();

  return data;
}
