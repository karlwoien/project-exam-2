import { Link } from "react-router-dom";

export default function ProfileVenues({ venues }) {
    if (!venues.length) return <p className="text-center text-gray-500">You haven't listed any venues yet.</p>;

    return (
        <div className="mt-8">
            <h3 className="text-2xl font-bold mb-4">Your Listed Venues</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {venues.map((venue) => (
                    <Link key={venue.id} to={`/venue/${venue.id}`} className="p-4 border rounded-md shadow-sm transition-transform transform hover:scale-105">
                        <h4 className="text-lg font-semibold">{venue.name}</h4>
                        <p className="text-sm">Price: {venue.price} NOK/Night</p>
                        <p className="text-sm">Maximum guests: {venue.maxGuests}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}