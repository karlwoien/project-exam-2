import { API_HOLIDAZE_URL, API_KEY } from './constants';

/**
 * Fetches user bookings.
 * @param {string} username - The username of the traveler.
 * @param {string} token - The authentication token.
 * @returns {Promise<Object>} - The user's bookings with venue details.
 * @throws {Error} - Throws an error if fetching fails.
 */
export async function fetchUserBookings(username, token) {
  const response = await fetch(`${API_HOLIDAZE_URL}/profiles/${username}/bookings?_venue=true`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      'X-Noroff-API-Key': API_KEY,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch bookings: ${response.status}`);
  }

  return response.json();
}

/**
 * Creates a new booking.
 * @param {Object} bookingData - The booking details.
 * @param {string} bookingData.dateFrom - Check-in date.
 * @param {string} bookingData.dateTo - Check-out date.
 * @param {number} bookingData.guests - Number of guests.
 * @param {string} bookingData.venueId - The venue ID.
 * @param {string} bookingData.token - The authentication token.
 * @returns {Promise<Object>} - The newly created booking details.
 * @throws {Error} - Throws an error if the booking fails.
 */
export async function createBooking({ dateFrom, dateTo, guests, venueId, token }) {
  const response = await fetch(`${API_HOLIDAZE_URL}/bookings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      'X-Noroff-API-Key': API_KEY,
    },
    body: JSON.stringify({ dateFrom, dateTo, guests, venueId }),
  });

  if (!response.ok) {
    throw new Error(`Failed to create booking: ${response.status}`);
  }

  return response.json();
}
