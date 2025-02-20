export default function AccountTypeSelector({ selected, setSelected }) {
  return (
    <div className="mb-2.5 flex justify-center space-x-2">
      <button
        type="button"
        className={`rounded-full border px-4 py-2 ${!selected ? 'bg-bg-primary text-white' : 'border-bg-primary'}`}
        onClick={() => setSelected(false)}
      >
        Traveler
      </button>
      <button
        type="button"
        className={`rounded-full border px-4 py-2 ${selected ? 'bg-bg-primary text-white' : 'border-bg-primary'}`}
        onClick={() => setSelected(true)}
      >
        Venue Manager
      </button>
    </div>
  );
}
