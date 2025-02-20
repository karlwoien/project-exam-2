export default function InputField({ label, type = "text", placeholder, error, register }) {
    return (
        <div className="mb-4">
            <label className="block mb-1">{label}</label>
            <input 
                type={type}
                placeholder={placeholder} 
                {...register} 
                className="py-1 px-2.5 border border-bg-primary w-full rounded-md"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
    );
}