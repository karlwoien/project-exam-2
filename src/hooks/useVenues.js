import { useState, useEffect } from "react";
import { fetchData } from "../api/apiClient";

export default function useVenues() {
    const [venues, setVenues] = useState([]); // Holder venues
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Funksjon for å hente venues (alle eller basert på søk)
    const fetchVenues = async (query = "") => {
        try {
            setIsLoading(query ? false : true); // Unngå "Loading" for søk
            const endpoint = query ? "/venues/search" : "/venues";
            const params = query ? { q: query } : undefined;

            const data = await fetchData(endpoint, params);
            setVenues(data.data);
            setError(null); // Nullstill feil hvis alt fungerer
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    // Automatisk henting av alle venues ved førstegangs render
    useEffect(() => {
        fetchVenues();
    }, []);

    return { venues, isLoading, error, fetchVenues };
};