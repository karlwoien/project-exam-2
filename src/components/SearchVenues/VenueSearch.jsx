import { useState } from 'react';

/**
 * VenueSearch component for searching venues via user input.
 * @param {Object} props - Component props.
 * @param {Function} props.onSearch - Callback function to handle search input.
 * @returns {JSX.Element} - Rendered search input field.
 */
export default function VenueSearch({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleInputChange = (event) => {
    const value = event.target.value.trim();
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className="mb-4">
      <label htmlFor="venue-search" className="sr-only">
        Search for venues
      </label>
      <input
        type="text"
        id="venue-search"
        placeholder="Search venues..."
        value={query}
        onChange={handleInputChange}
        aria-label="Search for venues"
        className="w-full rounded-full border border-bg-primary px-4 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-bg-highlight"
      />
    </div>
  );
}
