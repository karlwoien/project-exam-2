import { API_HOLIDAZE_URL, API_KEY } from "./constants";


// Hent alle venues med API-nøkkel
export async function getAllVenues() {
    try {
        const response = await fetch(`${API_HOLIDAZE_URL}/venues`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "X-Noroff-API-Key": API_KEY, // Legger til API-nøkkelen i headeren
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch venues: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data; // Returnerer venues fra API-et
    } catch (error) {
        console.error('Error fetching venues:', error.message);
        throw error; // Kaster feilen videre
    }
}