
import { CiLocationOn } from "react-icons/ci";

export default function VenueCard () {
    return (
        <div className="card flex flex-col rounded-lg h-full">
            {/*Image */}
            <div className="h-[164px] w-full overflow-hidden">
                
            </div>
            {/*Content */}
            <div>
                <h3 className="text-xl">Title</h3>
                <div className="flex items-center space-x-2.5">
                    <CiLocationOn></CiLocationOn>
                    <p>Location</p>
                </div>
                <p className="font-thin">Amenities</p>
                <p>1000 NOK/Night</p>
            </div>
        </div>
    );
};