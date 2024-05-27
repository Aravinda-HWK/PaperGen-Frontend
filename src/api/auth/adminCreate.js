import baseURL from "src/config/config";

export default async function AdminLoginFunction(adminData) {
  const response = await fetch(`${baseURL}/api/admin/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(adminData),
  });

  const responseData = await response.json();

  // You can return the responseData if needed
  return responseData;
}