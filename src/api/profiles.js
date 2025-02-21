import { API_HOLIDAZE_URL, API_KEY } from './constants';

/**
 * Fetches a user profile from the API.
 * @param {string} username - The username of the profile to fetch.
 * @param {string} token - The authentication token.
 * @returns {Promise<Object>} - The user's profile data.
 * @throws {Error} - If the request fails.
 */
export async function fetchUserProfile(username, token) {
  const response = await fetch(`${API_HOLIDAZE_URL}/profiles/${username}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      'X-Noroff-API-Key': API_KEY,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch profile: ${response.status}`);
  }

  return await response.json();
}

/**
 * Updates a user profile in the API.
 * @param {string} username - The username of the profile to update.
 * @param {Object} updatedData - The updated profile data.
 * @param {string} token - The authentication token.
 * @returns {Promise<Object>} - The updated profile data.
 * @throws {Error} - If the request fails.
 */
export async function updateUserProfile(username, updatedData, token) {
  const response = await fetch(`${API_HOLIDAZE_URL}/profiles/${username}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      'X-Noroff-API-Key': API_KEY,
    },
    body: JSON.stringify(updatedData),
  });

  if (!response.ok) {
    throw new Error(`Failed to update profile: ${response.status}`);
  }

  return await response.json();
}
