import baseURL from "src/config/config";

export default async function verifyOTP(otp, id) {
  const response = await fetch(`${baseURL}/api/publisher/verifyOTP`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ otp: otp, publisherId: id }),
  });
  const responseData = await response.json();

  return responseData;
}
