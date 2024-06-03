import baseURL from 'src/config/config';

export default async function registerStudent(loginData) {
  const response = await fetch(`${baseURL}/student/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginData),
  });

  const responseData = await response.json();

  return responseData;
}
