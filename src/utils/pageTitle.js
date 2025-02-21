/**
 * Updates the document title dynamically based on the provided title.
 * Ensures the title only updates if it's different from the current value.
 *
 * @param {string} title - The page-specific title to be added.
 */
export function pageTitle(title) {
  const baseTitle = 'Holidaze';
  const newTitle = title ? `${title} | ${baseTitle}` : baseTitle;

  if (document.title !== newTitle) {
    document.title = newTitle;
  }
}
