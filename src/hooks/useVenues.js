import { useState, useEffect } from 'react';
import { fetchData } from '../api';

/**
 * Custom hook for fetching and managing venue data.
 * @returns {Object} Contains venues, loading state, error state, and a function to fetch venues.
 */
export default function useVenues() {
  const [venues, setVenues] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Fetches venues from the API.
   * If a query is provided, it searches for venues; otherwise, it fetches all venues sorted by creation date.
   * @param {string} [query=''] - Optional search query.
   */
  const fetchVenues = async (query = '') => {
    try {
      setIsLoading(query ? false : true);

      const endpoint = query ? '/venues/search' : '/venues';
      const params = query ? { q: query } : { sort: 'created', order: 'desc' };

      const data = await fetchData(endpoint, params);
      setVenues(data.data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVenues();
  }, []);

  return { venues, isLoading, error, fetchVenues };
}
