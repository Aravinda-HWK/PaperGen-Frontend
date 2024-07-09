import baseURL from 'src/config/config';

export default async function getQuestionPaper(id) {
  const response = await fetch(`${baseURL}/question/by-paper-id?paperId=${id}`, {
    method: 'Get',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();

  return data;
}
