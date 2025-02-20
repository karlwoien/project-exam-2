import { Link } from 'react-router-dom';
import LinkButton from '../Button/LinkButton';

export default function ProfileBookings({ bookings }) {
  // Filtrer ut kun kommende bookinger
  const now = new Date();
  const upcomingBookings = bookings
    .filter((booking) => new Date(booking.dateFrom) > now)
    .sort((a, b) => new Date(a.dateFrom) - new Date(b.dateFrom)); // Sorterer etter nærmeste dato først

  if (!upcomingBookings.length)
    return (
      <div className="text-center">
        <p className="mb-2 text-gray-500">You have no upcoming bookings.</p>
        <LinkButton to="/venues" label="Explore Venues" variant="accent" />
      </div>
    );

  return (
    <div className="mt-8">
      <h3 className="mb-4 text-2xl">Your Upcoming Bookings</h3>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {upcomingBookings.map((booking) => (
          <Link
            key={booking.id}
            to={`/venue/${booking.venue.id}`}
            className="flex items-center space-x-4 rounded-md border p-4 shadow-sm transition-transform duration-300 ease-in-out hover:scale-105 active:scale-100"
          >
            <div className="flex-1">
              <h4 className="text-lg">{booking.venue.name}</h4>
              <div className="flex flex-col">
                <p className="text-sm">
                  <strong>From:</strong> {new Date(booking.dateFrom).toLocaleDateString()}
                </p>
                <p className="text-sm">
                  <strong>To:</strong> {new Date(booking.dateTo).toLocaleDateString()}
                </p>
              </div>
              <p className="text-sm">{booking.guests} Guests</p>
            </div>
            <div className="h-24 w-24 flex-shrink-0">
              <img
                src={booking.venue.media?.[0]?.url || 'https://via.placeholder.com/100'}
                alt={booking.venue.media?.[0]?.alt || booking.venue.name}
                className="h-full w-full rounded-md object-cover"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
