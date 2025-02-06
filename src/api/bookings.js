import { API_HOLIDAZE_URL, API_KEY } from "./constants";

// GET bookings for Travelers
export async function fetchUserBookings(username, token) {
    try {
        const response = await fetch(`${API_HOLIDAZE_URL}/profiles/${username}/bookings`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
                "X-Noroff-API-Key": API_KEY,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch bookings: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching bookings:", error.message);
        throw error;
    }
}