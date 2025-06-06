const baseUrl = 'http://localhost:3001';

const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
};

function getItems() {
  return fetch(`${baseUrl}/items`)
    .then(handleResponse)
    .catch((error) => {
      console.error("Failed to fetch items:", error);
      return []; 
    });
}

export { getItems };

export const addItem = ({ name, imageUrl, weather }) => {
  return fetch(`${baseUrl}/items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      imageUrl,
      weather,
    }),
  }).then(handleResponse);
};

export const deleteItem = (id) => {
  return fetch(`${baseUrl}/items/${id}`, {
    method: 'DELETE',
  })
    .then(handleResponse) 
    .catch((error) => {
      console.error(`Failed to delete item ${id}:`, error);
      throw error; 
    });
};