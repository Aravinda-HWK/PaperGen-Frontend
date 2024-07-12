import baseURL from 'src/config/config';

export default async function submitPaper(requestData) {
  const response = await fetch(`${baseURL}/result/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestData),
  });
  const data = await response.json();

  return data;
}
