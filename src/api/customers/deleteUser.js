import baseURL from "src/config/config";

export default async function deletePublisher(id){
    const response = await fetch(`${baseURL}/api/user/deleteUser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({id: id }),
    });
    const data = await response.json();

    return data;
}