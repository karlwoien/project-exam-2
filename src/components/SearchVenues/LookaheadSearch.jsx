import { useState } from 'react';
import useLookaheadSearch from '../../hooks/useLookaheadSearch';
import { useNavigate } from 'react-router-dom';

export default function LookaheadSearch() {
  const [query, setQuery] = useState('');
  const { searchResults, debouncedFetchSearchResults } = useLookaheadSearch();
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
        className="w-full rounded-full border-2 bg-transparent px-4 py-2 text-white placeholder-white focus:border-transparent focus:outline-none focus:ring-2 focus:ring-bg-highlight"
      />
      {query.length > 1 && searchResults.length > 0 && (
        <ul className="absolute mt-1 w-full rounded-lg border border-gray-300 bg-white text-left text-black shadow-md">
          {searchResults.map((venue) => (
            <li
              key={venue.id}
              onClick={() => handleSelectVenue(venue.id)}
              className="flex cursor-pointer items-center p-2 hover:bg-gray-100"
            >
              <img
                src={venue.media?.[0]?.url}
                alt={venue.media?.[0]?.alt || 'Venue image'}
                className="mr-3 h-10 w-10 rounded-md object-cover"
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
