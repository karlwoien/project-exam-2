import { Link } from "react-router-dom";
import LocationText from "../VenueInfo/LocationText";
import AmenitiesText from "../VenueInfo/AmenitiesText";
import VenueImage from "../VenueInfo/VenueImage";
import VenueTitle from "../VenueInfo/VenueTitle";
import { MdStar } from "react-icons/md";

export default function VenueCard ({venue}) {

    return (
        <Link to={`/venue/${venue.id}`}>
        <div className="card flex flex-col hover:scale-105">
            {/*Image */}
            <div className="mb-2.5">
                <VenueImage media={venue.media} className="w-full h-[200px] object-cover rounded-t-md" />
            </div>
            {/*Content */}
            <div>
                <VenueTitle title={venue.name} className="mb-1 text-xl" />
                <div className="flex items-center space-x-1 mb-2.5">
                    {Array.from({ length: 5 }, (_, index) => (
                        <MdStar key={index} className={index < venue.rating ? "text-bg-highlight" : "text-gray-300"} />
                    ))}
                </div>
                <div className="flex items-center space-x-2.5 mb-1">
                    <LocationText location={venue.location} />
                </div>
                <p className="mt-1 font-normal"> {venue.price} NOK/Night</p>
            </div>
        </div>
        </Link>
    );
}