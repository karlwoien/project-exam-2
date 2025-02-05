export default function ProfileVenues({ venues }) {
    if (!venues.length) return <p className="text-center text-gray-500">No venues found.</p>;

    return (
        <div className="mt-8">
            <h3 className="text-2xl font-bold mb-4">Your Venues</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {venues.map((venue) => (
                    <div key={venue.id} className="p-4 border rounded-md shadow-sm">
                        <h4 className="text-lg font-semibold">{venue.name}</h4>
                        <p className="text-sm">{venue.price} NOK/Night</p>
                        <p className="text-sm">{venue.maxGuests} Guests</p>
                    </div>
                ))}
            </div>
        </div>
    );
}