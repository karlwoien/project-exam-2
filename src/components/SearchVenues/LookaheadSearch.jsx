import { useState } from "react";
import useLookaheadSearch from "../../hooks/useLookaheadSearch";
import { useNavigate } from "react-router-dom";

export default function LookaheadSearch() {
    const [query, setQuery] = useState("");
    const { searchResults, isSearching, debouncedFetchSearchResults } = useLookaheadSearch();
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const value = event.target.value;
        setQuery(value);
        debouncedFetchSearchResults(value);
    };

    const handleSelectVenue = (venueId) => {
        navigate(`/venue/${venueId}`);
    };

    return (
        <div className="relative w-full">
            <input
                type="text"
                placeholder="Search venues..."
                value={query}
                onChange={handleInputChange}
                className="w-full px-4 py-2 text-white placeholder-white bg-transparent border-2 rounded-full focus:outline-none focus:ring-2 focus:ring-bg-highlight focus:border-transparent"
            />
            {query.length > 1 && searchResults.length > 0 && (
                <ul className="absolute w-full bg-white border border-gray-300 rounded-lg shadow-md mt-1 text-black text-left">
                    {searchResults.map((venue) => (
                        <li
                            key={venue.id}
                            onClick={() => handleSelectVenue(venue.id)}
                            className="flex items-center p-2 cursor-pointer hover:bg-gray-100"
                        >
                            <img
                                src={venue.media?.[0]?.url}
                                alt={venue.media?.[0]?.alt || "Venue image"}
                                className="w-10 h-10 rounded-md object-cover mr-3"
                            />
                            <span className="font-medium">{venue.name}</span>
                            <span className="ml-auto font-medium">{venue.price} NOK/Night</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}