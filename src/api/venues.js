import { API_HOLIDAZE_URL, API_KEY } from './constants';

/**
 * Fetches all venues created by a specific user.
 * @param {string} username - The username of the venue owner.
 * @param {string} token - The authentication token.
 * @returns {Promise<Object>} - The user's venues data.
 * @throws {Error} - If the request fails.
 */
export async function fetchUserVenues(username, token) {
  const response = await fetch(`${API_HOLIDAZE_URL}/profiles/${username}/venues`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      'X-Noroff-API-Key': API_KEY,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch venues: ${response.status}`);
  }

  return await response.json();
}

/**
 * Creates a new venue.
 * @param {Object} venueData - The venue details.
 * @param {string} token - The authentication token.
 * @returns {Promise<Object>} - The created venue data.
 * @throws {Error} - If the request fails.
 */
export async function createVenue(venueData, token) {
  const response = await fetch(`${API_HOLIDAZE_URL}/venues`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      'X-Noroff-API-Key': API_KEY,
    },
    body: JSON.stringify(venueData),
  });

  if (!response.ok) {
    throw new Error(`Failed to create venue: ${response.status}`);
  }

  return await response.json();
}

/**
 * Deletes a venue.
 * @param {string} venueId - The ID of the venue to delete.
 * @param {string} token - The authentication token.
 * @returns {Promise<boolean>} - True if the deletion was successful.
 * @throws {Error} - If the request fails.
 */
export async function deleteVenue(venueId, token) {
  const response = await fetch(`${API_HOLIDAZE_URL}/venues/${venueId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      'X-Noroff-API-Key': API_KEY,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to delete venue: ${response.status}`);
  }

  return true; // Returnerer suksess
}

/**
 * Updates an existing venue.
 * @param {string} venueId - The ID of the venue to update.
 * @param {Object} updatedData - The updated venue details.
 * @param {string} token - The authentication token.
 * @returns {Promise<Object>} - The updated venue data.
 * @throws {Error} - If the request fails.
 */
export async function updateVenue(venueId, updatedData, token) {
  const response = await fetch(`${API_HOLIDAZE_URL}/venues/${venueId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      'X-Noroff-API-Key': API_KEY,
    },
    body: JSON.stringify(updatedData),
  });

  if (!response.ok) {
    throw new Error(`Failed to update venue: ${response.status}`);
  }

  return await response.json();
}

/**
 * Fetches details of a specific venue, including its owner and bookings.
 * @param {string} venueId - The ID of the venue to fetch.
 * @returns {Promise<Object>} - The venue details.
 * @throws {Error} - If the request fails.
 */
export async function fetchVenue(venueId) {
  const response = await fetch(`${API_HOLIDAZE_URL}/venues/${venueId}?_owner=true&_bookings=true`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Noroff-API-Key': API_KEY,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch venue: ${response.status}`);
  }

  return await response.json();
}
