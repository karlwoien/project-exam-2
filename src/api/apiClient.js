import { API_HOLIDAZE_URL, API_BASE_URL, API_KEY } from "./constants";
import useAuthStore from "../store/authStore";

// Generisk GET-funksjon for å hente data fra API-et
export async function fetchData(endpoint, params = {}) {
    try {
        // Bygg URL med query-parametere hvis de finnes
        const url = new URL(`${API_HOLIDAZE_URL}${endpoint}`);
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "X-Noroff-API-Key": API_KEY,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data:", error.message);
        throw error;
    }
}

export async function registerUser(userData) {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Noroff-API-Key": API_KEY,
        },
        body: JSON.stringify(userData),
    });

    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    }

    return response.json();
}

export async function loginUser(userData) {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Noroff-API-Key": API_KEY,
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Login failed: ${errorMessage}`);
        }

        const data = await response.json();
        console.log("API response from login:", data); 

        useAuthStore.getState().login(data.data, data.data.accessToken);

        return data;
    } catch (error) {
        console.error("Error logging in:", error.message);
        throw error;
    }
}