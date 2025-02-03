export default function VenueTitle({ title, maxLength = 25, as: Tag = "h3", className = "text-xl" }) {
    const formattedTitle = title.charAt(0).toUpperCase() + title.slice(1);
    const truncatedTitle = formattedTitle.length > maxLength ? `${formattedTitle.slice(0, maxLength)}...` : formattedTitle;

    return <Tag className={className}>{truncatedTitle}</Tag>;
}