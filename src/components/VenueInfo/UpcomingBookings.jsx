import EditVenue from "./EditVenue";
import DeleteVenue from "./DeleteVenue";

export default function UpcomingBookings({ bookings, venueId, handleDelete, isDeleting }) {
    return (
        <div className="mb-10">
            <h3 className="text-xl font-normal mb-2.5">Upcoming Bookings</h3>
            {bookings && bookings.length > 0 ? (
                <ul className="space-y-4">
                    {bookings.map((booking) => (
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
                <EditVenue venueId={venueId} />
                <DeleteVenue handleDelete={handleDelete} isDeleting={isDeleting} />
            </div>
        </div>
    );
}