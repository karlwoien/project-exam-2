/**
 * LoadingSpinner component for displaying a spinning loader.
 * @param {Object} props - Component props.
 * @param {string} [props.size='w-10 h-10'] - Tailwind size classes for the spinner.
 * @param {string} [props.color='border-bg-primary'] - Tailwind color classes for the spinner.
 * @returns {JSX.Element} - Rendered LoadingSpinner component.
 */
export default function LoadingSpinner({ size = 'w-10 h-10', color = 'border-bg-primary' }) {
  return (
    <div className="flex items-center justify-center">
      <div className={`animate-spin rounded-full border-4 border-t-transparent ${color} ${size}`} />
    </div>
  );
}
