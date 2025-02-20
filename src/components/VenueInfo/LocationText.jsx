import { CiLocationOn } from 'react-icons/ci';

export default function LocationText({ location }) {
  if (!location) return <p>No location specified</p>;

  const locationText =
    location.city || location.country
      ? `${location.city || ''}${location.city && location.country ? ', ' : ''}${location.country || ''}`
      : 'No location specified';

  return (
    <div className="flex items-center space-x-2">
      <CiLocationOn className="text-2xl" />
      <p>{locationText}</p>
    </div>
  );
}
