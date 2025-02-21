import { CiLocationOn } from 'react-icons/ci';

/**
 * Component for displaying a venue's location.
 * @param {Object} props - Component props.
 * @param {Object} props.location - The location object containing city and country.
 * @param {string} [props.location.city] - The city of the venue.
 * @param {string} [props.location.country] - The country of the venue.
 * @returns {JSX.Element} - Rendered LocationText component.
 */
export default function LocationText({ location }) {
  if (!location) return <p>No location specified</p>;

  const { city = '', country = '' } = location;
  const locationText = city || country ? `${city}${city && country ? ', ' : ''}${country}` : 'No location specified';

  return (
    <div className="flex items-center space-x-2">
      <CiLocationOn className="text-2xl" aria-hidden="true" />
      <p>{locationText}</p>
    </div>
  );
}
