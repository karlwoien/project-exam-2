import { Link } from 'react-router-dom';
import { FaCog, FaCalendarAlt } from 'react-icons/fa';
import LinkButton from '../Button/LinkButton';

export default function ProfileVenues({ venues }) {
  if (!venues.length)
    return (
      <div className="text-center">
        <p className="mb-2 text-gray-500">You haven't listed any venues for booking yet.</p>
        <LinkButton to="/venues/new" label="Add Venue" variant="accent" />
      </div>
    );

  return (
    <div className="mt-8">
      <h3 className="text-2xl">Your Listed Venues</h3>
      <p className="mb-4 text-sm text-gray-600">
        Click on your venue to manage it or see upcoming bookings.
      </p>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {venues.map((venue) => (
          <Link
            key={venue.id}
            to={`/venue/${venue.id}`}
            className="flex items-center space-x-4 rounded-md border p-4 shadow-sm transition-transform duration-300 ease-in-out hover:scale-105 active:scale-100"
          >
            <div className="flex-1">
              <h4 className="text-lg font-semibold">{venue.name}</h4>
              <p className="text-sm">Price: {venue.price} NOK/Night</p>
              <p className="text-sm">Maximum guests: {venue.maxGuests}</p>
              <div className="mt-2 flex space-x-2 text-gray-500">
                <FaCog title="Manage Venue" />
                <FaCalendarAlt title="View Bookings" />
              </div>
            </div>
            <div className="h-24 w-24 flex-shrink-0">
              <img
                src={venue.media?.[0]?.url || 'https://via.placeholder.com/100'}
                alt={venue.media?.[0]?.alt || venue.name}
                className="h-full w-full rounded-md object-cover"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
