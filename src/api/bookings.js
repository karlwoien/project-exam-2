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

// Create booking
export async function createBooking({ dateFrom, dateTo, guests, venueId, token }) {
    try {
        const response = await fetch(`${API_HOLIDAZE_URL}/bookings`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
                "X-Noroff-API-Key": API_KEY,
            },
            body: JSON.stringify({
                dateFrom,
                dateTo,
                guests,
                venueId,
            }),
        });

        if (!response.ok) {
            throw new Error(`Failed to create booking: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error creating booking:", error.message);
        throw error;
    }
}

// Get venue bookings for å sjekke ledig/oppdatt
export async function fetchVenueBookings(venueId, token) {
    try {
        const url = `${API_HOLIDAZE_URL}/bookings?_venue=true`; // Henter alle bookinger og inkluderer venue-data
        console.log("Fetching all bookings from:", url);

        const response = await fetch(url, {
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

        const allBookings = await response.json();
        console.log("Full booking data:", allBookings);

        // Filtrer ut bookings som kun gjelder for dette venue
        const venueBookings = allBookings.data.filter(booking => booking.venue.id === venueId);

        return { data: venueBookings };
    } catch (error) {
        console.error("Error fetching venue bookings:", error.message);
        throw error;
    }
}