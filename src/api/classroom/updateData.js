import baseURL from 'src/config/config';

export default async function updatePublisher(updateData) {
  const response = await fetch(`${baseURL}/classroom/update-details`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updateData),
  });
  const responseData = await response.json();

  return responseData;
}
