import { MdStar } from 'react-icons/md';
import LocationText from './LocationText';
import AmenitiesText from './AmenitiesText';
import VenueTitle from './VenueTitle';

/**
 * VenueContent component displaying detailed information about a venue.
 * @param {Object} props - Component props.
 * @param {Object} props.venue - The venue data.
 * @returns {JSX.Element} - Rendered VenueContent component.
 */
export default function VenueContent({ venue }) {
  return (
    <div className="mb-5 max-w-[500px]">
      <div className="flex items-center justify-between">
        <VenueTitle title={venue.name} as="h1" className="mb-2.5 text-4xl" />
      </div>
      <div className="mb-2.5 flex items-center space-x-1" aria-label={`Rating: ${venue.rating} out of 5`}>
        {Array.from({ length: 5 }, (_, index) => (
          <MdStar
            key={index}
            className={index < venue.rating ? 'text-bg-highlight' : 'text-gray-300'}
          />
        ))}
        <span className="text-gray-500">| Rating</span>
      </div>
      <div className="mb-1 flex items-center">
        <LocationText location={venue.location} />
      </div>
      <div className="mb-1 flex space-x-2">
        <p className="font-normal">Amenities:</p>
        <AmenitiesText meta={venue.meta} />
      </div>
      <div className="mb-1 flex space-x-2">
        <p className="font-normal">Maximum guests:</p>
        <p>{venue.maxGuests}</p>
      </div>
      <div className="mb-2.5">
        <p className="font-normal">{venue.price} NOK/Night</p>
      </div>
      <div className="mb-5">
        <p className="font-semibold">Description</p>
        <p>{venue.description}</p>
      </div>
      <div className="my-4 border-t border-gray-300"></div>
      <div className="mt-5 flex items-center">
        <img
          src={venue.owner?.avatar?.url || 'https://via.placeholder.com/50'}
          alt={venue.owner?.avatar?.alt || venue.owner?.name || 'Venue Manager'}
          className="mr-3 h-10 w-10 rounded-full"
        />
        <div className="flex space-x-2">
          <p className="font-semibold">Venue Manager:</p>
          <p>{venue.owner?.name || 'Unknown Venue Manager'}</p>
        </div>
      </div>
      <div className="my-4 border-t border-gray-300"></div>
    </div>
  );
}
