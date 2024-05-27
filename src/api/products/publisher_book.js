import baseURL from "src/config/config";

export default async function publisherBook(id){
    const response = await fetch(`${baseURL}/api/book/publisherbook`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ publisher_id: id }),
    });
    const data = await response.json();

    return data;
}