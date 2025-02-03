import { MdOutlineImageNotSupported } from "react-icons/md";

export default function VenueImage({ media, altText = "Venue image", size = "h-[200px]", className = "w-full h-full object-cover" }) {
    const hasImage = media?.length > 0 && media[0]?.url;

    return (
        <div className={`w-full ${size} flex justify-center items-center overflow-hidden bg-gray-200 rounded-t-md`}>
            {hasImage ? (
                <img src={media[0].url} alt={altText} className={className} />
            ) : (
                <MdOutlineImageNotSupported className="text-gray-500 text-6xl" />
            )}
        </div>
    );
}