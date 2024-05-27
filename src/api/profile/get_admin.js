import baseURL from "src/config/config";

export async function getAdmin(id){
    const response = await fetch(`${baseURL}/api/admin/get`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: id }),
    });
    const data = await response.json();

    return data;
}