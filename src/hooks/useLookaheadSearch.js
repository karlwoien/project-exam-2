import { useState, useCallback } from 'react';
import { fetchData } from '../api';

// Debounce-funksjon for å redusere antall API-kall
function debounce(func, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
}

export default function useLookaheadSearch() {
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState(null);

  // Henter venues basert på søk
  const fetchSearchResults = async (query) => {
    if (!query || query.length < 2) {
      setSearchResults([]); // Nullstill hvis søket er for kort
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
  // Debounce fetchSearchResults
  const debouncedFetchSearchResults = useCallback(debounce(fetchSearchResults, 300), []);

  return { searchResults, isSearching, error, debouncedFetchSearchResults };
}
