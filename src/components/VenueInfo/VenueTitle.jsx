/**
 * VenueTitle component for rendering a formatted and truncated title.
 * @param {Object} props - Component props.
 * @param {string} props.title - The venue title.
 * @param {number} [props.maxLength=25] - Maximum character length before truncating.
 * @param {keyof JSX.IntrinsicElements} [props.as='h3'] - HTML tag to use for the title.
 * @param {string} [props.className='text-xl'] - Additional CSS classes.
 * @returns {JSX.Element} - Rendered VenueTitle component.
 */
export default function VenueTitle({
  title,
  maxLength = 25,
  as: Tag = 'h3',
  className = 'text-xl',
}) {
  if (!title) return null;

  const formattedTitle = title.charAt(0).toUpperCase() + title.slice(1);
  const truncatedTitle =
    formattedTitle.length > maxLength ? `${formattedTitle.slice(0, maxLength)}...` : formattedTitle;

  return <Tag className={className}>{truncatedTitle}</Tag>;
}
