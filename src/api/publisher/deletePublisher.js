import baseURL from "src/config/config";

export default async function deletePublisher(id){
    const response = await fetch(`${baseURL}/api/publisher/deletePublisher`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({userId: id }),
    });
    const data = await response.json();

    return data;
}