import { CiLocationOn } from "react-icons/ci";
import { MdOutlineImageNotSupported } from "react-icons/md";
import { Link } from "react-router-dom";

export default function VenueCard ({venue}) {
     // Generer lokasjonstekst
     const location = venue.location?.city || venue.location?.country
     ? `${venue.location.city || ""}${venue.location.city && venue.location.country ? ", " : ""}${venue.location.country || ""}`
     : "No location specified";

     // Generer amenities tekst
    const amenities = [];
    if (venue.meta.wifi) amenities.push("WiFi");
    if (venue.meta.parking) amenities.push("Parking");
    if (venue.meta.breakfast) amenities.push("Breakfast");
    if (venue.meta.pets) amenities.push("Pets");
    const amenitiesText = amenities.length > 0 ? amenities.join(", ") : "No amenities listed";
    
    // Sjekk om venue har bilde
    const hasImage = venue.media?.length > 0 && venue.media[0]?.url;
 
    return (
        <Link to={`venue/${venue.id}`}>
        <div className="card flex flex-col">
            {/*Image */}
            <div className="h-[200px] w-full overflow-hidden pb-2.5 flex justify-center items-center">
            {hasImage ? (
                        <img
                            src={venue.media[0].url}
                            alt={venue.name}
                            className="w-full h-full object-fill rounded-t-md"
                        />
                    ) : (
                        <MdOutlineImageNotSupported className="text-gray-500 text-6xl" />
                    )}
            </div>
            {/*Content */}
            <div>
                <h3 className="text-xl">{venue.name.length > 25 ? `${venue.name.slice(0, 25)}...` : venue.name}</h3>
                <div className="flex items-center space-x-2.5">
                    <CiLocationOn/>
                    <p>{location}</p>
                </div>
                <p className="font-thin">{amenitiesText}</p>
                <p> {venue.price} NOK/Night</p>
            </div>
        </div>
        </Link>
    );
}