import { API_BASE_URL, API_KEY } from './constants';
import useAuthStore from '../store/authStore';

/**
 * Registers a new user.
 * @param {Object} userData - The user registration data.
 * @param {string} userData.name - The user's name.
 * @param {string} userData.email - The user's email.
 * @param {string} userData.password - The user's password.
 * @returns {Promise<Object>} - The response data containing user info.
 * @throws {Error} - Throws an error if registration fails.
 */
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

/**
 * Logs in a user and updates Zustand auth store.
 * @param {Object} userData - The user login credentials.
 * @param {string} userData.email - The user's email.
 * @param {string} userData.password - The user's password.
 * @returns {Promise<Object>} - The user data and access token.
 * @throws {Error} - Throws an error if login fails.
 */
export async function loginUser(userData) {
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
  useAuthStore.getState().login(data.data, data.data.accessToken);

  return data;
}
