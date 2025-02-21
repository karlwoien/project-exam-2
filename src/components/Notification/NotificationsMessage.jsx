/**
 * NotificationMessage component for displaying success or error messages.
 * @param {Object} props - Component props.
 * @param {string} props.type - Type of message ('success', 'error').
 * @param {string} props.message - The message to display.
 * @returns {JSX.Element|null} - Rendered notification message or null if no message.
 */
export default function NotificationMessage({ type = 'success', message }) {
  if (!message) return null;

  const baseClasses = 'p-3 rounded-lg text-center mt-4';
  const typeClasses = {
    success: 'bg-green-100 text-green-800',
    error: 'bg-red-100 text-red-800',
  }

  return <div className={`${baseClasses} ${typeClasses[type] || typeClasses.success}`}>{message}</div>;
}
