import { useState, useCallback } from 'react';
import { fetchData } from '../api';

/**
 * Debounce function to limit API requests by delaying execution.
 * @param {Function} func - The function to debounce.
 * @param {number} delay - The debounce delay in milliseconds.
 * @returns {Function} - A debounced version of the input function.
 */
function debounce(func, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
}

/**
 * Custom hook for searching venues with debounce optimization.
 * @returns {Object} Contains search results, loading state, error state, and debounced search function.
 */
export default function useLookaheadSearch() {
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState(null);

  const fetchSearchResults = async (query) => {
    if (!query || query.length < 2) {
      setSearchResults([]);
      return;
    }

    try {
      setIsSearching(true);
      const endpoint = '/venues/search';
      const params = { q: query };

      const data = await fetchData(endpoint, params);
      setSearchResults(data.data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const debouncedFetchSearchResults = useCallback(debounce(fetchSearchResults, 300), []);

  return { searchResults, isSearching, error, debouncedFetchSearchResults };
}
