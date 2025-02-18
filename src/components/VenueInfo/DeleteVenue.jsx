export default function DeleteVenueButton({ handleDelete, isDeleting }) {
    return (
        <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
            disabled={isDeleting}
        >
            {isDeleting ? "Deleting..." : "Delete"}
        </button>
    );
}