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