import baseURL from "src/config/config";

export default async function resendOTP(id,email){
    const response = await fetch(`${baseURL}/api/publisher/resendOTP`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ publisherId: id, email: email }),
    });
    const responseData = await response.json();

    return responseData;
}