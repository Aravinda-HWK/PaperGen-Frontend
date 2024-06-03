import baseURL from 'src/config/config';

export default async function registerTeacher(loginData) {
  const response = await fetch(`${baseURL}/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginData),
  });

  const responseData = await response.json();

  return responseData;
}
