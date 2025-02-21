import { Link } from 'react-router-dom';
import LocationText from '../VenueInfo/LocationText';
import VenueImage from '../VenueInfo/VenueImage';
import VenueTitle from '../VenueInfo/VenueTitle';
import { MdStar } from 'react-icons/md';

/**
 * VenueCard component for displaying a single venue's summary.
 * @param {Object} props - Component props.
 * @param {Object} props.venue - The venue data.
 * @returns {JSX.Element} - Rendered VenueCard component.
 */
export default function VenueCard({ venue }) {
  if (!venue) return null;

  return (
    <Link to={`/venue/${venue.id}`} className="block">
      <div className="card flex flex-col transition-transform duration-300 ease-in-out hover:scale-105 active:scale-100">
        <VenueImage media={venue.media} className="h-[200px] w-full rounded-t-md" />

        <div className="p-2">
          <VenueTitle title={venue.name} className="mb-1 text-xl" />

          <div className="mb-2 flex items-center space-x-1">
            {Array.from({ length: 5 }, (_, index) => (
              <MdStar
                key={index}
                className={index < venue.rating ? 'text-bg-highlight' : 'text-gray-300'}
              />
            ))}
          </div>

          <LocationText location={venue.location} />

          <p className="mt-1 font-normal">{venue.price} NOK/Night</p>
        </div>
      </div>
    </Link>
  );
}
