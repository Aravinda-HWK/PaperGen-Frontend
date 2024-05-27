import baseURL from 'src/config/config';

export default async function resetPasswordFunction(loginData) {
  const response = await fetch(`${baseURL}/api/publisher/resetPassword`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginData),
  });

  const responseData = await response.json();

  return responseData;
}
