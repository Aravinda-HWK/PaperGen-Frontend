import baseURL from 'src/config/config';

export default async function TeacherLoginFunction(loginData) {
  const response = await fetch(`${baseURL}/auth/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginData),
  });

  const responseData = await response.json();

  // You can return the responseData if needed
  return responseData;
}
