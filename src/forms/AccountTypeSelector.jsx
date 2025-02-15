export default function AccountTypeSelector({ selected, setSelected }) {
    return (
        <div className="flex justify-center space-x-2 mb-2.5">
            <button
                type="button"
                className={`px-4 py-2 border rounded-full ${!selected ? "bg-bg-primary text-white" : "border-bg-primary"}`}
                onClick={() => setSelected(false)}
            >
                Traveler
            </button>
            <button
                type="button"
                className={`px-4 py-2 border rounded-full ${selected ? "bg-bg-primary text-white" : "border-bg-primary"}`}
                onClick={() => setSelected(true)}
            >
                Venue Manager
            </button>
        </div>
    );
}