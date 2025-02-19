import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchVenue } from "../api";
import VenueForm from "../components/Venue/VenueForm";
import { useTitle } from "../hooks/useTitle";

export default function EditVenue() {
    const { id } = useParams();
    const [venue, setVenue] = useState(null);

    useEffect(() => {
        fetchVenue(id).then(response => setVenue(response.data));
    }, [id]);

    useTitle("Edit venue")

    return (
        <div className="max-w-5xl mx-auto">
            {venue ? <VenueForm venue={venue} /> : <p className="text-center text-gray-500">Loading...</p>}
        </div>
    );
}
