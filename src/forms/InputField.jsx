/**
 * Reusable input field component for forms.
 * @param {Object} props - Component props.
 * @param {string} props.label - Label for the input field.
 * @param {string} [props.type='text'] - Type of input field (default: text).
 * @param {string} [props.placeholder] - Placeholder text for the input.
 * @param {string} [props.error] - Error message for validation.
 * @param {Object} props.register - React Hook Form register function.
 * @returns {JSX.Element} - Rendered InputField component.
 */
export default function InputField({ label, type = 'text', placeholder, error, register }) {
  return (
    <div className="mb-4">
      <label className="mb-1 block">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        {...register}
        className="w-full rounded-md border border-bg-primary px-2.5 py-1"
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
