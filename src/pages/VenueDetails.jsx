import { useParams } from "react-router-dom";
import useVenue from "../hooks/useVenue";
import { MdStar } from "react-icons/md";
import LocationText from "../components/VenueInfo/LocationText";
import AmenitiesText from "../components/VenueInfo/AmenitiesText";
import VenueImage from "../components/VenueInfo/VenueImage";
import VenueTitle from "../components/VenueInfo/VenueTitle";

export default function VenueDetails() {
    const { id } = useParams();
    const { venue, isLoading, error } = useVenue(id);

    if (isLoading) return <p>Loading venue details...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;

    return (
        <div className="max-w-5xl mx-auto px-6 py-16 mt-16">
            {/* Image */}
            <div className="mb-7">
                <VenueImage media={venue.media} size="h-[500px]" className="w-full h-[500px] object-cover rounded-t-md" />
            </div>
            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Venue Info (Venstre kolonne) */}
                <div className="md:col-span-2">
                    <VenueTitle title={venue.name} as="h1" className="text-4xl mb-2.5"/>
                    {/* Rating */}
                    <div className="flex items-center space-x-1 mb-2.5">
                        {Array.from({ length: 5 }, (_, index) => (
                            <MdStar key={index} className={index < venue.rating ? "text-bg-highlight" : "text-gray-300"} />
                        ))}
                    </div>

                    {/* Location */}
                    <div className="flex items-center mb-2.5">
                        <LocationText location={venue.location} />
                    </div>

                    {/* Amenities */}
                    <div className="mb-2.5">
                        <AmenitiesText meta={venue.meta} />
                    </div>
                    
                    {/* Price */}
                    <p className="mb-5">{venue.price} NOK/Night</p>

                    {/* Description */}
                    <div className="mb-5">
                        <p className="font-semibold">Description</p>
                        <p>{venue.description}</p>
                    </div>
                    {/* Host Info */}
                    <div className="flex items-center mt-5">
                        <img
                            src={venue.owner?.avatar?.url || "https://via.placeholder.com/50"}
                            alt={venue.owner?.avatar?.alt || venue.owner?.name || "Venue Manager"}
                            className="w-10 h-10 rounded-full mr-3"
                        />
                        <div className="flex space-x-2">
                            <p className="font-semibold">Venue Manager:</p>
                            <p>{venue.owner?.name || "Unknown Venue Manager"}</p>
                        </div>
                    </div>
                </div>

                {/* Booking (Høyre kolonne) */}
                <div className="md:col-span-1 bg-gray-100 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">Temp header</h3>
                    
                    {/*HER MÅ KALENDER OSV INN - MÅ JOBBES MER MED */}

                    <button className="w-full bg-bg-primary text-bg-muted py-2 rounded-md hover:bg-bg-highlight">
                        Reserve
                    </button>
                    <p className="text-center text-gray-500 text-sm mt-2">Login to reserve venue</p>
                </div>
            </div>
        </div>
    );
}