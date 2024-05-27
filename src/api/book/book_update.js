import baseURL from "src/config/config";

export default async function updateBook(updateData) {
  const response = await fetch(`${baseURL}/api/book/update`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updateData),
  });
  const data = await response.json();

  return data;
}
