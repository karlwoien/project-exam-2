export default function ProfileBookings({ bookings }) {
    if (!bookings.length) return <p className="text-center text-gray-500">No bookings found.</p>;

    return (
        <div className="mt-8">
            <h3 className="text-2xl font-bold mb-4">Your Bookings</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {bookings.map((booking) => (
                    <div key={booking.id} className="p-4 border rounded-md shadow-sm">
                        <h4 className="text-lg font-semibold">{booking.venue}</h4>
                        <p className="text-sm text-gray-500">From {booking.dateFrom} To {booking.dateTo}</p>
                        <p className="text-sm">{booking.guests} Guests</p>
                    </div>
                ))}
            </div>
        </div>
    );
}