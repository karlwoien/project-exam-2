import { useNavigate } from "react-router-dom";

export default function EditVenue({ venueId }) {
    const navigate = useNavigate();

    return (
        <button 
            onClick={() => navigate(`/venue/${venueId}/edit`)}
            className="px-4 py-2 bg-bg-primary text-white rounded-full hover:bg-bg-highlight transition"
        >
            Update
        </button>
    );
}