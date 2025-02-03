export default function AccountTypeSelector({ selected, setSelected }) {
    return (
        <div className="flex justify-center space-x-2 mb-4">
            <button
                type="button"
                className={`px-4 py-2 border ${!selected ? "bg-bg-primary text-white" : "border-gray-300"}`}
                onClick={() => setSelected(false)}
            >
                Traveler
            </button>
            <button
                type="button"
                className={`px-4 py-2 border ${selected ? "bg-bg-primary text-white" : "border-gray-300"}`}
                onClick={() => setSelected(true)}
            >
                Venue Manager
            </button>
        </div>
    );
}