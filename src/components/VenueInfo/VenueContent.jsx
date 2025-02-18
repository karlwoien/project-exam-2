import { MdStar } from "react-icons/md";
import LocationText from "./LocationText";
import AmenitiesText from "./AmenitiesText";
import VenueTitle from "./VenueTitle";

export default function VenueContent({ venue }) {
    return (
        <div className="mb-5 max-w-[500px]">
            <div className="flex justify-between items-center">
                <VenueTitle title={venue.name} as="h1" className="text-4xl mb-2.5" />
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-1 mb-2.5">
                {Array.from({ length: 5 }, (_, index) => (
                    <MdStar key={index} className={index < venue.rating ? "text-bg-highlight" : "text-gray-300"} />
                ))}
                <span className="text-gray-500">| Rating</span>
            </div>

            {/* Location */}
            <div className="flex items-center mb-2.5">
                <LocationText location={venue.location} />
            </div>

            {/* Amenities */}
            <div className="mb-2.5 flex space-x-2">
                <p className="font-normal">Amenities:</p>
                <AmenitiesText meta={venue.meta} />
            </div>

            {/* Price */}
            <div className="mb-2.5">
                <p className="font-normal">{venue.price} NOK/Night</p>
            </div>

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
    );
}