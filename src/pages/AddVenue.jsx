import VenueForm from "../components/Venue/VenueForm";
import useAuthStore from "../store/authStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AddVenue() {
    const { user } = useAuthStore();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user?.venueManager) {
            navigate("/"); // Redirect hvis ikke Venue Manager
        }
    }, [user, navigate]);

    return (
        <div className="max-w-5xl mx-auto px-6 py-16 mt-16">
            <VenueForm />
        </div>
    );
}