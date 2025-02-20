import { MdOutlineImageNotSupported } from 'react-icons/md';

export default function VenueImage({
  media,
  altText = 'Venue image',
  className = 'w-full h-full object-cover',
}) {
  const hasImage = media?.length > 0 && media[0]?.url;

  return (
    <div
      className={`flex min-h-[200px] w-full items-center justify-center overflow-hidden rounded-t-md bg-gray-200`}
    >
      {hasImage ? (
        <img src={media[0].url} alt={altText} className={`w-full object-cover ${className}`} />
      ) : (
        <MdOutlineImageNotSupported className="text-6xl text-gray-500" />
      )}
    </div>
  );
}
