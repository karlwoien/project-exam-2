import { useEffect } from 'react';
import { pageTitle } from '../utils/pageTitle';

/**
 * Custom hook for dynamically updating the document title.
 * @param {string} title - The title to set for the page.
 */
export function useTitle(title) {
  useEffect(() => {
    pageTitle(title);
  }, [title]);
}
