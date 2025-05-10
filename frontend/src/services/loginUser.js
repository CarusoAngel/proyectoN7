const API_URL = 'http://localhost:3000/api/v1/user/login';

export const loginUser = async ({ correo, password }) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ correo, password })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Error desconocido');
    }

    localStorage.setItem('token', data.token);
    localStorage.setItem('usuario', JSON.stringify(data.user)); 

    window.dispatchEvent(new Event("storage"));

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};
