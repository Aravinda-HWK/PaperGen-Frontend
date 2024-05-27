import baseURL from "src/config/config";

export default async function registerBook(jsonData){
    const response = await fetch(`${baseURL}/api/book/store`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
      });

    return response;
}