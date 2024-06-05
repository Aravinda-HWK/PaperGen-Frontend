import baseURL from 'src/config/config';

export default async function updateTeacher(updateData) {
  const response = await fetch(`${baseURL}/auth/update`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updateData),
  });

  const responseData = await response.json();

  return responseData;
}
