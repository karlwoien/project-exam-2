import { Link } from "react-router-dom";
import LocationText from "../VenueInfo/LocationText";
import AmenitiesText from "../VenueInfo/AmenitiesText";
import VenueImage from "../VenueInfo/VenueImage";
import VenueTitle from "../VenueInfo/VenueTitle";

export default function VenueCard ({venue}) {

    return (
        <Link to={`/venue/${venue.id}`}>
        <div className="card flex flex-col">
            {/*Image */}
            <div className="mb-2.5">
                <VenueImage media={venue.media} className="w-full h-[200px] object-cover rounded-t-md" />
            </div>
            {/*Content */}
            <div>
                <VenueTitle title={venue.name} className="mb-1" />
                <div className="flex items-center space-x-2.5 mb-1">
                    <LocationText location={venue.location} />
                </div>
                <AmenitiesText meta={venue.meta} />
                <p className="mt-1"> {venue.price} NOK/Night</p>
            </div>
        </div>
        </Link>
    );
}