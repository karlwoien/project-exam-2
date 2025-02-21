import { useParams } from 'react-router-dom';
import useVenue from '../hooks/useVenue';
import useAuthStore from '../store/authStore';
import VenueImage from '../components/VenueInfo/VenueImage';
import BookingCalendar from '../components/Bookings/BookingCalendar';
import UpcomingBookings from '../components/VenueInfo/UpcomingBookings';
import VenueContent from '../components/VenueInfo/VenueContent';
import useVenueActions from '../hooks/useVenueActions';
import { useTitle } from '../hooks/useTitle';
import LoadingSpinner from '../components/Loading/LoadingSpinner';

/**
 * VenueDetails page that displays detailed information about a venue.
 * Includes venue images, content, booking options, and management actions for venue owners.
 * @returns {JSX.Element} - Rendered VenueDetails component.
 */
export default function VenueDetails() {
  const { id } = useParams();
  const { venue, isLoading, error } = useVenue(id);
  const { user } = useAuthStore();
  const { handleDelete, isDeleting } = useVenueActions(id);

  useTitle(venue?.name || 'Venue Details');

  if (isLoading) return <LoadingSpinner />;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  const isOwner = user && venue.owner?.name === user.name;

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-7">
        <VenueImage
          media={venue.media}
          className="h-auto max-h-[500px] w-full rounded-t-md object-cover"
        />
      </div>

      <div className="grid grid-cols-1 items-start md:grid-cols-[2fr,1fr]">
        <VenueContent venue={venue} />
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
