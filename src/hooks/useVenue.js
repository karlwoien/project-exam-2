import { useState, useEffect } from 'react';
import { fetchData } from '../api';

/**
 * Custom hook for fetching a single venue by its ID.
 * @param {string} id - The ID of the venue to fetch.
 * @returns {Object} Contains venue data, loading state, and error state.
 */
export default function useVenue(id) {
  const [venue, setVenue] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchVenue = async () => {
      try {
        const data = await fetchData(`/venues/${id}`, { _owner: true, _bookings: true });
        setVenue(data.data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVenue();
  }, [id]);

  return { venue, isLoading, error };
}
