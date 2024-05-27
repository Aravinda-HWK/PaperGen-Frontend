import baseURL from 'src/config/config';

const getDetails = async (id) => {
  const response = await fetch(`${baseURL}/api/read_books/getdetails`,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({publisher_id: id}),
  });
  const data = await response.json();
  return data;
};

export default getDetails;
