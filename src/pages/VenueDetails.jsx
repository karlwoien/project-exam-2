import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useVenue from "../hooks/useVenue";
import { fetchVenueBookings, deleteVenue } from "../api";
import useAuthStore from "../store/authStore";
import { MdStar, MdDelete } from "react-icons/md";
import LocationText from "../components/VenueInfo/LocationText";
import AmenitiesText from "../components/VenueInfo/AmenitiesText";
import VenueImage from "../components/VenueInfo/VenueImage";
import VenueTitle from "../components/VenueInfo/VenueTitle";
import BookingCalendar from "../components/Bookings/BookingCalendar";

export default function VenueDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { venue, isLoading, error } = useVenue(id);
    const { user, token } = useAuthStore();
    const [bookings, setBookings] = useState([]);
    const [isDeleting, setIsDeleting] = useState(false);

    // Fetch eksisterende bookinger for dette stedet
    useEffect(() => {
        async function loadBookings() {
            try {
                if (venue) {
                    const data = await fetchVenueBookings(venue.id, token);
                    setBookings(data.data);
                }
            } catch (error) {
                console.error("Error loading venue bookings:", error);
            }
        }

        if (venue) {
            loadBookings();
        }
    }, [venue, token]);

    if (isLoading) return <p>Loading venue details...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;

    // Sjekk om innlogget bruker eier venue
    const isOwner = user && venue.owner?.name === user.name;

    // Håndter sletting av venue
    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this venue?");
        if (!confirmDelete) return;

        setIsDeleting(true);
        try {
            await deleteVenue(id, token);
            alert("Venue deleted successfully!");
            navigate("/profile"); // Send brukeren tilbake til profilen
        } catch (error) {
            console.error("Error deleting venue:", error.message);
            alert("Failed to delete venue.");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto px-6 py-16 mt-16">
            {/* Image */}
            <div className="mb-7">
                <VenueImage media={venue.media} size="h-[500px]" className="w-full h-[500px] object-cover rounded-t-md" />
            </div>

            {/* Content Grid */}
            <div className="flex flex-wrap justify-between">
                {/* Venue Info (Venstre kolonne) */}
                <div className="mb-5 max-w-[600px]">
                    <div className="flex justify-between items-center">
                        <VenueTitle title={venue.name} as="h1" className="text-4xl mb-2.5" />
                        
                        {/* Slett-knapp (kun for eier) */}
                        {isOwner && (
                            <button
                                onClick={handleDelete}
                                className="flex items-center space-x-2 text-red-500 hover:text-red-700 transition"
                                disabled={isDeleting}
                            >
                                <MdDelete className="w-6 h-6" />
                                <span>{isDeleting ? "Deleting..." : "Delete Venue"}</span>
                            </button>
                            
                        )}

                        {/*Edit knapp */}
                        {venue.owner?.name === user?.name && (
                        <button 
                            onClick={() => navigate(`/venue/${venue.id}/edit`)}
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                        >
                            Edit Venue
                        </button>
                        )}
                    </div>

                    {/* Rating */}
                    <div className="flex items-center space-x-1 mb-2.5">
                        {Array.from({ length: 5 }, (_, index) => (
                            <MdStar key={index} className={index < venue.rating ? "text-bg-highlight" : "text-gray-300"} />
                        ))}
                    </div>

                    {/* Location */}
                    <div className="flex items-center mb-2.5">
                        <LocationText location={venue.location} />
                    </div>

                    {/* Amenities */}
                    <div className="mb-2.5">
                        <AmenitiesText meta={venue.meta} />
                    </div>

                    {/* Price */}
                    <p className="mb-5">{venue.price} NOK/Night</p>

                    {/* Description */}
                    <div className="mb-5">
                        <p className="font-semibold">Description</p>
                        <p>{venue.description}</p>
                    </div>

                    {/* Host Info */}
                    <div className="flex items-center mt-5">
                        <img
                            src={venue.owner?.avatar?.url || "https://via.placeholder.com/50"}
                            alt={venue.owner?.avatar?.alt || venue.owner?.name || "Venue Manager"}
                            className="w-10 h-10 rounded-full mr-3"
                        />
                        <div className="flex space-x-2">
                            <p className="font-semibold">Venue Manager:</p>
                            <p>{venue.owner?.name || "Unknown Venue Manager"}</p>
                        </div>
                    </div>
                </div>

                {/* Booking (Høyre kolonne) */}
                <div className="px-6 shadow-lg rounded-md h-[500px]">
                    <BookingCalendar
                        bookings={bookings}
                        maxGuests={venue.maxGuests}
                        venueId={venue.id}
                    />
                </div>
            </div>
        </div>
    );
}