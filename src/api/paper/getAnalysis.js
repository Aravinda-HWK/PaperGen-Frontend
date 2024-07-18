import baseURL from 'src/config/config';

export default async function getAnalysis(question, correctAnswer) {
  const response = await fetch(`${baseURL}/result/model-review`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ question: question, answer: correctAnswer }),
  });
  const data = response.json();

  return data;
}
