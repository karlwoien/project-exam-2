import { API_HOLIDAZE_URL, API_BASE_URL, API_KEY } from './constants';
import useAuthStore from '../store/authStore';

//REGISTER USER
export async function registerUser(userData) {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Noroff-API-Key': API_KEY,
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }

  return response.json();
}

//LOGIN USER
export async function loginUser(userData) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login?_holidaze=true`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Noroff-API-Key': API_KEY,
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Login failed: ${errorMessage}`);
    }

    const data = await response.json();
    console.log('API response from login:', data);

    useAuthStore.getState().login(data.data, data.data.accessToken);

    return data;
  } catch (error) {
    console.error('Error logging in:', error.message);
    throw error;
  }
}
