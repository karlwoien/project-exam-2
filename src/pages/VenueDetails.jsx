import { useParams } from "react-router-dom";
import useVenue from "../hooks/useVenue";
import useAuthStore from "../store/authStore";
import VenueImage from "../components/VenueInfo/VenueImage";
import BookingCalendar from "../components/Bookings/BookingCalendar";
import UpcomingBookings from "../components/VenueInfo/UpcomingBookings";
import VenueContent from "../components/VenueInfo/VenueContent";
import useVenueActions from "../hooks/useVenueActions";

export default function VenueDetails() {
    const { id } = useParams();
    const { venue, isLoading, error } = useVenue(id);
    const { user } = useAuthStore();
    const { handleDelete, isDeleting } = useVenueActions(id);

    if (isLoading) return <p>Loading venue details...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;

    const isOwner = user && venue.owner?.name === user.name;

    return (
        <div className="max-w-5xl mx-auto px-6 py-16 mt-16">
            {/* Venue Image */}
            <div className="mb-7">
                <VenueImage media={venue.media} className="w-full h-auto max-h-[500px] object-cover rounded-t-md" />
            </div>
            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-[2fr,1fr] items-start">
                {/* Venue Info (Venstre kolonne) */}
                <VenueContent venue={venue} />
                {/* Booking Section // handling venue manager */}
                <div className="mx-auto md:mx-0">
                    {isOwner ? (
                        <UpcomingBookings
                            bookings={venue.bookings || []}
                            venueId={venue.id}
                            handleDelete={handleDelete}
                            isDeleting={isDeleting}
                        />
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