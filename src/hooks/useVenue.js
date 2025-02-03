import { useState, useEffect } from "react";
import { fetchData } from "../api/apiClient";

export default function useVenue(id) {
    const [venue, setVenue] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) return;

        async function fetchVenue() {
            try {
                const data = await fetchData(`/venues/${id}` , { _owner: true });
                setVenue(data.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        }

        fetchVenue();
    }, [id]);

    return { venue, isLoading, error };
}