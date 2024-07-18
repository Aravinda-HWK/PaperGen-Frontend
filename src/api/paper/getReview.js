import baseURL from 'src/config/config';

export async function getReview(id) {
  const response = await fetch(`${baseURL}/result/answer-list?resultID=${id}`, {
    method: 'Get',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();

  return data;
}
