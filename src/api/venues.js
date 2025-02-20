import { API_HOLIDAZE_URL, API_KEY } from './constants';

// GET venues - Venue Manager
export async function fetchUserVenues(username, token) {
  try {
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
  } catch (error) {
    console.error('Error fetching venues:', error.message);
    throw error;
  }
}

// Create venue - post method
export async function createVenue(venueData, token) {
  try {
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
  } catch (error) {
    console.error('Error creating venue:', error.message);
    throw error;
  }
}

// DELETE VENUE - delete method
export async function deleteVenue(venueId, token) {
  try {
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
  } catch (error) {
    console.error('Error deleting venue:', error.message);
    throw error;
  }
}

//UPDATE VENUE - PUT method
export async function updateVenue(venueId, updatedData, token) {
  try {
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
  } catch (error) {
    console.error('Error updating venue:', error.message);
    throw error;
  }
}

// fetch venue id
export async function fetchVenue(venueId) {
  try {
    const url = `${API_HOLIDAZE_URL}/venues/${venueId}?_owner=true&_bookings=true`;
    console.log(`Fetching venue with bookings from: ${url}`);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Noroff-API-Key': API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch venue: ${response.status}`);
    }

    const venueData = await response.json();
    return venueData;
  } catch (error) {
    throw error;
  }
}
