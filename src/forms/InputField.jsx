export default function InputField({ label, type = "text", error, register }) {
    return (
        <div className="mb-4">
            <label className="block mb-1">{label}</label>
            <input 
                type={type} 
                {...register} 
                className="w-full p-2 border rounded"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
    );
}