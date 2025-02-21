import EditVenue from './EditVenue';
import DeleteVenue from './DeleteVenue';

/**
 * Displays upcoming bookings for a venue and provides management options.
 * @param {Object} props - Component props.
 * @param {Array} props.bookings - List of bookings.
 * @param {string} props.venueId - ID of the venue.
 * @param {Function} props.handleDelete - Function to delete the venue.
 * @param {boolean} props.isDeleting - Loading state for deletion.
 * @returns {JSX.Element} - Rendered UpcomingBookings component.
 */
export default function UpcomingBookings({ bookings, venueId, handleDelete, isDeleting }) {
  return (
    <div className="mb-10">
      <h3 className="mb-2.5 text-xl font-normal">Bookings</h3>
      {bookings?.length > 0 ? (
        <ul className="space-y-4">
          {bookings.map(({ id, customer, dateFrom, dateTo, guests }) => (
            <li key={id} className="rounded-md border bg-gray-100 p-3">
              <p className="text-sm">
                <strong>Customer:</strong> {customer.name}
              </p>
              <p className="text-sm">
                <strong>Email:</strong> {customer.email}
              </p>
              <div className="flex space-x-2">
                <p className="text-sm">
                  <strong>From:</strong> {new Date(dateFrom).toLocaleDateString()}
                </p>
                <p className="text-sm">
                  <strong>To:</strong> {new Date(dateTo).toLocaleDateString()}
                </p>
              </div>
              <p className="text-sm">
                <strong>Guests:</strong> {guests}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 italic">No bookings made yet</p>
      )}

      <h3 className="mb-2.5 mt-4 text-xl font-normal">Manage your venue</h3>
      <div className="flex space-x-3">
        <EditVenue venueId={venueId} />
        <DeleteVenue handleDelete={handleDelete} isDeleting={isDeleting} />
      </div>
    </div>
  );
}
