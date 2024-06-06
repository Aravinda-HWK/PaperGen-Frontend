import baseURL from 'src/config/config';

const getDetails = async () => {
  const response = await fetch(`${baseURL}/api/user/getAllUsers`,{
    method: 'Get',
  });
  const data = await response.json();
  return data;
};

export default getDetails;
