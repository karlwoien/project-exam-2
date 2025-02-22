import { useEffect } from 'react';

/**
 * Custom hook for dynamically updating the document title and meta description.
 * @param {string} title - The title to set for the page.
 * @param {string} [description] - The meta description for the page.
 */
export function useSEO(title, description = 'Discover and book unique venues with Holidaze.') {
  useEffect(() => {
    const baseTitle = 'Holidaze';
    document.title = title ? `${title} | ${baseTitle}` : baseTitle;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    } else {
      const newMeta = document.createElement('meta');
      newMeta.name = 'description';
      newMeta.content = description;
      document.head.appendChild(newMeta);
    }
  }, [title, description]);
}
