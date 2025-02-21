import { useNavigate } from 'react-router-dom';

/**
 * Button component for navigating to the edit venue page.
 * @param {Object} props - Component props.
 * @param {string} props.venueId - The ID of the venue to edit.
 * @returns {JSX.Element} - Rendered EditVenueButton component.
 */
export default function EditVenueButton({ venueId }) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(`/venue/${venueId}/edit`)}
      className="rounded-full bg-bg-primary px-4 py-2 text-white transition hover:bg-bg-highlight"
      aria-label="Edit venue"
    >
      Update
    </button>
  );
}
