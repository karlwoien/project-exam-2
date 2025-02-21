import VenueCard from '../components/VenueCard';
import VenueSearch from '../components/SearchVenues/VenueSearch';
import useVenues from '../hooks/useVenues';
import { useTitle } from '../hooks/useTitle';
import LoadingSpinner from '../components/Loading/LoadingSpinner';

/**
 * Venues page displaying a list of available venues with search functionality.
 * @returns {JSX.Element} - Rendered Venues page.
 */
export default function Venues() {
  useTitle('Venues');
  const { venues, isLoading, error, fetchVenues } = useVenues();

  const handleSearch = (query) => {
    const trimmedQuery = query.trim();
    fetchVenues(trimmedQuery);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="mb-5 text-4xl text-bg-highlight">EXPLORE VENUES</h1>
      <div className="w-full">
        <VenueSearch onSearch={handleSearch} />
      </div>
      
      <div className="mx-auto max-w-6xl">
        <div className="grid auto-rows-fr grid-cols-1 gap-7 sm:grid-cols-2 md:grid-cols-3">
          {venues.map((venue) => (
            <VenueCard key={venue.id} venue={venue} />
          ))}
        </div>
      </div>
    </div>
  );
}
