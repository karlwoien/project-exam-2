export default function DeleteVenueButton({ handleDelete, isDeleting }) {
  return (
    <button
      onClick={handleDelete}
      className="rounded-full bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
      disabled={isDeleting}
    >
      {isDeleting ? 'Deleting...' : 'Delete'}
    </button>
  );
}
