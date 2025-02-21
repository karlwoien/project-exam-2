import { API_HOLIDAZE_URL, API_KEY } from './constants';

/**
 * Fetches data from the API.
 * @param {string} endpoint - The API endpoint (relative to API_HOLIDAZE_URL).
 * @param {Object} [params={}] - Optional query parameters.
 * @returns {Promise<Object>} - The JSON response from the API.
 * @throws {Error} - Throws an error if the request fails.
 */
export async function fetchData(endpoint, params = {}) {
  // Construct URL with optional query parameters
  const url = new URL(`${API_HOLIDAZE_URL}${endpoint}`);
  Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]));

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Noroff-API-Key': API_KEY,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
  }

  return response.json();
}
