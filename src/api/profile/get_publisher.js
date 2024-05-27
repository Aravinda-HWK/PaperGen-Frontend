import baseURL from "src/config/config";

export default async function getPublisher(id){
    const response = await fetch(`${baseURL}/api/publisher/getPublisher`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ _id: id }),
    });
    const data = await response.json();

    return data;
}