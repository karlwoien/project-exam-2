import React from "react";
import VenueCard from "../components/VenueCard";
import Search from "../components/SearchVenues/VenueSearch";
import useVenues from "../hooks/useVenues";
import { useTitle } from "../hooks/useTitle";
import LoadingSpinner from "../components/Loading/LoadingSpinner";

export default function Venues() {
    useTitle("Venues")
    const { venues, isLoading, error, fetchVenues } = useVenues();

    const handleSearch = (query) => {
      fetchVenues(query.trim() || ""); // Bruk query eller hent alle venues
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (error) {
      return <p className="text-red-500">Error: {error}</p>;
    }

    return (
        <div className="max-w-5xl mx-auto">
            <h1 className="text-bg-highlight text-4xl mb-5">EXPLORE VENUES</h1>
            {/* Search input and filter option */}
            <div className="w-full">
                {/* Search input */}
                <Search onSearch={handleSearch} />
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