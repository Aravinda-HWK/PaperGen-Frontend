import baseURL from "src/config/config";

export default async function AdminLoginFunction(loginData) {
  const response = await fetch(`${baseURL}/api/admin/login`, {
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
