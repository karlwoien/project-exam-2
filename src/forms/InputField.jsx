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
