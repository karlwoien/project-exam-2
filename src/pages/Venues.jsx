import VenueCard from '../components/VenueCard';
import VenueSearch from '../components/SearchVenues/VenueSearch';
import useVenues from '../hooks/useVenues';
import { useTitle } from '../hooks/useTitle';
import LoadingSpinner from '../components/Loading/LoadingSpinner';

export default function Venues() {
  useTitle('Venues');
  const { venues, isLoading, error, fetchVenues } = useVenues();

  const handleSearch = (query) => {
    fetchVenues(query.trim() || ''); // Bruk query eller hent alle venues
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
      {/* Search input and filter option */}
      <div className="w-full">
        {/* Search input */}
        <VenueSearch onSearch={handleSearch} />
      </div>
      {/* Venues grid */}
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
