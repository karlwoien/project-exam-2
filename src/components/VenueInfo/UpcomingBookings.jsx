import EditVenue from './EditVenue';
import DeleteVenue from './DeleteVenue';

export default function UpcomingBookings({ bookings, venueId, handleDelete, isDeleting }) {
  return (
    <div className="mb-10">
      <h3 className="mb-2.5 text-xl font-normal">Bookings</h3>
      {bookings && bookings.length > 0 ? (
        <ul className="space-y-4">
          {bookings.map((booking) => (
            <li key={booking.id} className="rounded-md border bg-gray-100 p-3">
              <p className="text-sm">
                <strong>Customer:</strong> {booking.customer.name}
              </p>
              <p className="text-sm">
                <strong>Email:</strong> {booking.customer.email}
              </p>
              <div className="flex space-x-2">
                <p className="text-sm">
                  <strong>From:</strong> {new Date(booking.dateFrom).toLocaleDateString()}
                </p>
                <p className="text-sm">
                  <strong>To:</strong> {new Date(booking.dateTo).toLocaleDateString()}
                </p>
              </div>
              <p className="text-sm">
                <strong>Guests:</strong> {booking.guests}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No bookings made yet</p>
      )}

      <h3 className="mb-2.5 mt-4 text-xl font-normal">Manage your venue</h3>
      {/* Handling for Venue Manager */}
      <div className="flex space-x-3">
        <EditVenue venueId={venueId} />
        <DeleteVenue handleDelete={handleDelete} isDeleting={isDeleting} />
      </div>
    </div>
  );
}
