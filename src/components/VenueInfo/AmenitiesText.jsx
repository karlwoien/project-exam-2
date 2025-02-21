/**
 * Displays a list of amenities available at a venue.
 * @param {Object} props - Component props.
 * @param {Object} props.meta - Object containing amenity information.
 * @param {boolean} props.meta.wifi - Indicates if WiFi is available.
 * @param {boolean} props.meta.parking - Indicates if parking is available.
 * @param {boolean} props.meta.breakfast - Indicates if breakfast is available.
 * @param {boolean} props.meta.pets - Indicates if pets are allowed.
 * @returns {JSX.Element} - Rendered AmenitiesText component.
 */
export default function AmenitiesText({ meta }) {
  if (!meta) return <p className="italic text-gray-500">No amenities listed</p>;

  const amenities = [
    meta.wifi && 'WiFi',
    meta.parking && 'Parking',
    meta.breakfast && 'Breakfast',
    meta.pets && 'Pets',
  ].filter(Boolean);

  return <p>{amenities.length ? amenities.join(' | ') : 'No amenities listed'}</p>;
}
