import { API_HOLIDAZE_URL, API_KEY } from "./constants";

// GET venues - Venue Manager
export async function fetchUserVenues(username, token) {
    try {
        const response = await fetch(`${API_HOLIDAZE_URL}/profiles/${username}/venues`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
                "X-Noroff-API-Key": API_KEY,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch venues: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching venues:", error.message);
        throw error;
    }
}

// Create venue - post method
export async function createVenue(venueData, token) {
    try {
        const response = await fetch(`${API_HOLIDAZE_URL}/venues`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
                "X-Noroff-API-Key": API_KEY,
            },
            body: JSON.stringify(venueData),
        });

        if (!response.ok) {
            throw new Error(`Failed to create venue: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error creating venue:", error.message);
        throw error;
    }
}

// DELETE VENUE - delete method
export async function deleteVenue(venueId, token) {
    try {
        const response = await fetch(`${API_HOLIDAZE_URL}/venues/${venueId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
                "X-Noroff-API-Key": API_KEY,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to delete venue: ${response.status}`);
        }

        return true; // Returnerer suksess
    } catch (error) {
        console.error("Error deleting venue:", error.message);
        throw error;
    }
}
