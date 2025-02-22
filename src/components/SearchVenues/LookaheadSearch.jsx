import { useState } from 'react';
import useLookaheadSearch from '../../hooks/useLookaheadSearch';
import { useNavigate } from 'react-router-dom';

/**
 * LookaheadSearch component that allows users to search for venues dynamically.
 * @returns {JSX.Element} - Rendered LookaheadSearch component.
 */
export default function LookaheadSearch() {
  const [query, setQuery] = useState('');
  const { searchResults, debouncedFetchSearchResults } = useLookaheadSearch();
  const navigate = useNavigate();

  const handleQueryChange = (event) => {
    const value = event.target.value;
    setQuery(value);
    debouncedFetchSearchResults(value);
  };

  const navigateToVenue = (venueId) => {
    navigate(`/venue/${venueId}`);
  };

  return (
    <div className="relative w-full">
      <label htmlFor="search-venues" className="sr-only">
        Search for venues
      </label>
      <input
        type="text"
        id="search-venues"
        placeholder="Search venues..."
        value={query}
        onChange={handleQueryChange}
        aria-label="Search for venues"
        className="w-full rounded-full border-2 bg-transparent px-4 py-2 text-white placeholder-white focus:border-transparent focus:outline-none focus:ring-2 focus:ring-bg-highlight"
      />
      {query.length > 1 && Array.isArray(searchResults) && searchResults.length > 0 && (
        <ul className="absolute mt-1 w-full rounded-lg border border-gray-300 bg-white text-left text-black shadow-md">
          {searchResults.map(({ id, media, name, price }) => {
            const imageUrl = media?.[0]?.url && media[0].url.startsWith('http') 
              ? media[0].url 
              : '/default-placeholder.jpg';

            const truncatedName = name.length > 20 ? `${name.slice(0, 30)}` : name;

            return (
              <li
                key={id}
                onClick={() => navigateToVenue(id)}
                className="flex cursor-pointer items-center p-2 hover:bg-gray-100"
              >
                <img
                  src={imageUrl}
                  alt={media?.[0]?.alt || 'Venue image'}
                  className="mr-3 h-10 w-10 rounded-md object-cover"
                  loading="lazy"
                />
                <span className="font-medium">{truncatedName}</span>
                <span className="ml-auto font-medium hidden sm:block">{price} NOK/Night</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
