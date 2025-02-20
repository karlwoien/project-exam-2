import { API_HOLIDAZE_URL, API_KEY } from './constants';

// GET userprofile
export async function fetchUserProfile(username, token) {
  try {
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
  } catch (error) {
    console.error('Error fetching profile:', error.message);
    throw error;
  }
}

// Update userprofile
export async function updateUserProfile(username, updatedData, token) {
  try {
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
  } catch (error) {
    console.error('Error updating profile:', error.message);
    throw error;
  }
}
