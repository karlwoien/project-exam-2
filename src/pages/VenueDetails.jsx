import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import useVenue from "../hooks/useVenue";
import { deleteVenue } from "../api";
import useAuthStore from "../store/authStore";
import { MdStar } from "react-icons/md";
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
    const [isDeleting, setIsDeleting] = useState(false);

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
            {/* Venue Image */}
            <div className="mb-7">
                <VenueImage media={venue.media} size="h-[500px]" className="w-full h-[500px] object-cover rounded-t-md" />
            </div>

            {/* Content Grid */}
            <div className="flex flex-wrap justify-between">
                {/* Venue Info (Venstre kolonne) */}
                <div className="mb-5 max-w-[500px]">
                    <div className="flex justify-between items-center">
                        <VenueTitle title={venue.name} as="h1" className="text-4xl mb-2.5 text-bg-highlight" />
                    </div>

                    {/* Rating */}
                    <div className="flex items-center space-x-1 mb-2.5">
                        {Array.from({ length: 5 }, (_, index) => (
                            <MdStar key={index} className={index < venue.rating ? "text-bg-highlight" : "text-gray-300"} />
                        ))}
                        <span className="text-gray-500">| Rating</span>
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
                    <div className="mb-2.5">
                        <p>{venue.price} NOK/Night</p>
                    </div>

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

                {/* Booking Section // handling venue manager */}
                <div className="px-6 shadow-lg rounded-md mt-4 md:mt-0 w-[400px]">
                    {isOwner ? (
                        <div className="mb-10">
                            <h3 className="text-xl font-normal mb-2.5">Upcoming Bookings</h3>
                            {venue.bookings && venue.bookings.length > 0 ? (
                                <ul className="space-y-4">
                                    {venue.bookings.map((booking) => (
                                        <li key={booking.id} className="border p-3 rounded-md bg-gray-100">
                                            <p><strong>From:</strong> {new Date(booking.dateFrom).toLocaleDateString()}</p>
                                            <p><strong>To:</strong> {new Date(booking.dateTo).toLocaleDateString()}</p>
                                            <p><strong>Guests:</strong> {booking.guests}</p>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-500">No bookings yet.</p>
                            )}
                            <h3 className="text-xl font-normal mb-2.5 mt-4">Manage your venue</h3>
                            {/* Handling for Venue Manager */}
                            <div className="flex space-x-3">
                                {/* Edit Venue */}
                                <button 
                                    onClick={() => navigate(`/venue/${venue.id}/edit`)}
                                    className="px-4 py-2 bg-bg-primary text-white rounded-full hover:bg-bg-highlight transition"
                                >
                                    Update
                                </button>

                                {/* Delete Venue */}
                                <button
                                    onClick={handleDelete}
                                    className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                                    disabled={isDeleting}
                                >
                                    {isDeleting ? "Deleting..." : "Delete"}
                                </button>
                            </div>
                        </div>
                    ) : (
                        <BookingCalendar
                            bookings={venue.bookings || []}
                            maxGuests={venue.maxGuests}
                            venueId={venue.id}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}