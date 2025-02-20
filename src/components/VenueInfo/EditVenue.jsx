import { useNavigate } from 'react-router-dom';

export default function EditVenue({ venueId }) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(`/venue/${venueId}/edit`)}
      className="rounded-full bg-bg-primary px-4 py-2 text-white transition hover:bg-bg-highlight"
    >
      Update
    </button>
  );
}
