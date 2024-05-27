import baseURl from '../../config/config';

export default async function getBooks(id) {
  const response = await fetch(`${baseURl}/api/book/publisherbook`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ publisher_id: id }),
  });
  const data = await response.json();
  return data;
}
