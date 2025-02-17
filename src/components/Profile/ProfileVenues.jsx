import { Link } from "react-router-dom";
import LinkButton from "../LinkButton";
import { FaCog, FaCalendarAlt } from "react-icons/fa";

export default function ProfileVenues({ venues }) {
    if (!venues.length) return (
        <div className="text-center">
            <p className="text-gray-500 mb-2">You haven't listed any venues for booking yet.</p>
            <LinkButton to="/venues/new" label="Add Venue" variant="accent"/>
        </div>
    );

    return (
        <div className="mt-8">
            <h3 className="text-2xl">Your Listed Venues</h3>
            <p className="text-gray-600 mb-4">Click on your venue to manage it or see upcoming bookings.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {venues.map((venue) => (
                    <Link 
                        key={venue.id} 
                        to={`/venue/${venue.id}`} 
                        className="p-4 border rounded-md shadow-sm flex items-center transition-transform transform hover:scale-105 space-x-4"
                    >
                        <div className="flex-1">
                            <h4 className="text-lg font-semibold">{venue.name}</h4>
                            <p className="text-sm">Price: {venue.price} NOK/Night</p>
                            <p className="text-sm">Maximum guests: {venue.maxGuests}</p>
                            <div className=" flex space-x-2 text-gray-500 mt-2">
                                <FaCog title="Manage Venue" />
                                <FaCalendarAlt title="View Bookings" />
                             </div>
                        </div>
                        <div className="w-24 h-24 flex-shrink-0">
                            <img 
                                src={venue.media?.[0]?.url || "https://via.placeholder.com/100"} 
                                alt={venue.media?.[0]?.alt || venue.name} 
                                className="w-full h-full object-cover rounded-md"
                            />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}