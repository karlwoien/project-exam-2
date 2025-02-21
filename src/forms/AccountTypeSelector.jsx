/**
 * Component for selecting between "Traveler" and "Venue Manager" account types.
 * @param {Object} props - Component props.
 * @param {boolean} props.selected - Indicates if "Venue Manager" is selected.
 * @param {Function} props.setSelected - Function to update selected state.
 * @returns {JSX.Element} - Rendered AccountTypeSelector component.
 */
export default function AccountTypeSelector({ selected, setSelected }) {
  return (
    <fieldset className="mb-2.5 flex justify-center space-x-2" aria-label="Select account type">
      <legend className="sr-only">Account Type</legend>
      <button
        type="button"
        className={`rounded-full border px-4 py-2 ${!selected ? 'bg-bg-primary text-white' : 'border-bg-primary'}`}
        onClick={() => setSelected(false)}
        aria-selected={!selected}
        aria-label="Select Traveler account"
      >
        Traveler
      </button>
      <button
        type="button"
        className={`rounded-full border px-4 py-2 ${selected ? 'bg-bg-primary text-white' : 'border-bg-primary'}`}
        onClick={() => setSelected(true)}
        aria-selected={selected}
        aria-label="Select Venue Manager account"
      >
        Venue Manager
      </button>
    </fieldset>
  );
}
