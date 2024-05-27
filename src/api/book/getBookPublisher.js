import baseURL from "src/config/config";

export default async function getAllBooks(){
    const response = await fetch(`${baseURL}/api/book`, {
      method: 'GET',
    });
    const data = await response.json();

    return data;
}