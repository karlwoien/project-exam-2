import React, { useState, useEffect } from "react";
import VenueCard from "../components/VenueCard";
import { getAllVenues } from "../api/apiClient";

export default function Venues() {
    const [venues, setVenues] = useState([]); // Holder alle venues
    const [error, setError] = useState(null); // Håndterer feil

    useEffect(() => {
        async function fetchVenues() {
            try {
                const data = await getAllVenues(); // Hent data fra API
                setVenues(data.data); // Sett venue-data i state
            } catch (err) {
                setError(err.message); // Sett feil i state hvis noe går galt
            }
        }

        fetchVenues(); // Kjør funksjonen når komponenten rendres
    }, []);

    if (error) {
        return <p className="text-red-500">Error: {error}</p>;
    }

    if (venues.length === 0) {
        return <p>Loading venues...</p>;
    }

    return (
        <div className="max-w-5xl mx-auto px-6 py-16 mt-16">
            <h1 className="text-bg-highlight text-4xl mb-5">EXPLORE VENUES</h1>
            {/* Search input and filter option */}
            <div className="flex space-x-4">
                <p>Placeholder search input</p>
                <p>Placeholder filter option</p>
            </div>
            {/* Venues grid */}
            <div className=" max-w-6xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7 auto-rows-fr">
                    {venues.map((venue) => (
                        <VenueCard key={venue.id} venue={venue} />
                    ))}
                </div>
            </div>
        </div>
    );
}