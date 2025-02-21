/**
 * Button component for deleting a venue.
 * @param {Object} props - Component props.
 * @param {Function} props.handleDelete - Function to handle venue deletion.
 * @param {boolean} props.isDeleting - Indicates if the deletion is in progress.
 * @returns {JSX.Element} - Rendered DeleteVenueButton component.
 */
export default function DeleteVenueButton({ handleDelete, isDeleting }) {
  return (
    <button
      onClick={handleDelete}
      className="rounded-full bg-red-500 px-4 py-2 text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
      disabled={isDeleting}
      aria-disabled={isDeleting}
      aria-label="Delete venue"
    >
      {isDeleting ? 'Deleting...' : 'Delete'}
    </button>
  );
}
