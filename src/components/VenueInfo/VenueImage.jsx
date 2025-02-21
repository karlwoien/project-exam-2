import { MdOutlineImageNotSupported } from 'react-icons/md';

/**
 * VenueImage component for displaying a venue's primary image.
 * If no image is available, a fallback icon is shown.
 * @param {Object} props - Component props.
 * @param {Array} props.media - List of media objects containing image URLs.
 * @param {string} [props.altText='Venue image'] - Alternative text for the image.
 * @param {string} [props.className='w-full h-full object-cover'] - Additional CSS classes.
 * @returns {JSX.Element} - Rendered VenueImage component.
 */
export default function VenueImage({
  media,
  altText = 'Venue image',
  className = 'w-full h-full object-cover',
}) {
  const imageUrl = media?.[0]?.url || '';

  return (
    <div
      className="flex min-h-[200px] w-full items-center justify-center overflow-hidden rounded-t-md bg-gray-200"
      aria-label={imageUrl ? 'Venue image' : 'No image available'}
    >
      {imageUrl ? (
        <img src={imageUrl} alt={altText} className={className} />
      ) : (
        <MdOutlineImageNotSupported className="text-6xl text-gray-500" aria-hidden="true" />
      )}
    </div>
  );
}
