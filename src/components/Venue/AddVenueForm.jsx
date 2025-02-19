import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import venueSchema from "../../forms/validation/venueSchema";
import { createVenue } from "../../api/venues";
import useAuthStore from "../../store/authStore";
import { CiCirclePlus } from "react-icons/ci";
import { MdClose } from "react-icons/md"; // Fjern-ikon
import { useNavigate } from "react-router-dom"; // Importer navigasjon
import { toast } from "react-toastify";

export default function AddVenueForm() {
    const { token } = useAuthStore();
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const { register, handleSubmit, control, setValue, watch, formState: { errors } } = useForm({
        resolver: yupResolver(venueSchema),
        defaultValues: {
            media: [{ url: "" }], // Starter med ett tomt felt
            meta: { wifi: false, parking: false, breakfast: false, pets: false },
        },
    });

    const media = watch("media");

    // Felles styling for input-felt
    const inputClass = "py-1 px-2.5 border border-bg-primary w-full rounded-md";

    // Håndtering av innsending
    const onSubmit = async (data) => {
        try {
            setError(null);

            // Automatisk legge til alt-tekst + filtrere ut tomme bildelinjer
            const updatedMedia = data.media
                .filter(m => m.url.trim() !== "") // Fjern tomme linjer
                .map((m) => ({ url: m.url, alt: `Image of ${data.name || "Venue"}` })); 

            const venueData = { ...data, media: updatedMedia };

            const response = await createVenue(venueData, token);
            toast.success("Venue updated successfully!", {
                position: "top-center",
                autoClose: 1000,
                onClose: () => navigate(`/venue/${response.data.id}`),
            });
        } catch (err) {
            setError(err.message || "Failed to create venue. Please try again later.");
        }
    };

    // Fjerne et bilde-inputfelt
    const removeMediaInput = (index) => {
        const updatedMedia = media.filter((_, i) => i !== index);
        setValue("media", updatedMedia);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto p-6 rounded-lg border border-bg-primary">
            <h2 className="text-center text-xl font-normal mb-4">Add new venue</h2>
            
            {/* Title */}
            <div className="mb-2.5">
                <label className="block">Title</label>
                <input {...register("name")} placeholder="Pacific View" className={inputClass} />
                <p className="text-red-500">{errors.name?.message}</p>
            </div>

            {/* Description */}
            <div className="mb-2.5">
                <label className="block">Description</label>
                <textarea {...register("description")} placeholder="Describe your venue" className={inputClass} />
                <p className="text-red-500">{errors.description?.message}</p>
            </div>

            {/* Media URLs */}
            <div className="mb-2.5">
                <label>Images</label>
                {media.map((_, index) => (
                    <div key={index} className="flex space-x-2 mb-2 items-center">
                        <input 
                            {...register(`media.${index}.url`)} 
                            placeholder="Media URL" 
                            className={inputClass} 
                        />
                        {/* Fjern-knapp */}
                        {media.length > 1 && (
                            <button 
                                type="button"
                                className="text-red-500 hover:text-red-700"
                                onClick={() => removeMediaInput(index)}
                            >
                                <MdClose size={24} />
                            </button>
                        )}
                    </div>
                ))}
                {/* Add more button */}
                <button 
                    type="button"
                    className="flex items-center space-x-1 hover:scale-105"
                    onClick={() => setValue("media", [...media, { url: "" }])}
                >
                    <CiCirclePlus className="w-10 h-10 text-bg-highlight" />
                    <span className="text-sm text-gray-500">Add more</span>
                </button>
            </div>

            {/* Price & Max Guests */}
            <div className="flex space-x-2 mb-2.5">
                <div>
                    <label>Price/night</label>
                    <input {...register("price")} placeholder="750" className={inputClass} />
                </div>
                <div>
                    <label>Max guests</label>
                    <input {...register("maxGuests")} placeholder="6" className={inputClass} />
                </div>
            </div>
            <p className="text-red-500">{errors.price?.message || errors.maxGuests?.message}</p>

            {/* Amenities */}
            <div className="mb-2.5">
                <label>Amenities</label>
                <div className="flex flex-wrap space-x-2.5">
                    {["breakfast", "parking", "wifi", "pets"].map((amenity) => (
                        <label key={amenity} className="flex items-center space-x-1">
                            <Controller 
                                control={control} 
                                name={`meta.${amenity}`} 
                                render={({ field }) => <input type="checkbox" {...field} checked={field.value} />}
                            />
                            <span>{amenity.charAt(0).toUpperCase() + amenity.slice(1)}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Location */}
            <div className="mb-2.5">
                <label>Address</label>
                <input {...register("location.address")} placeholder="Venuestreet 1" className={inputClass} />
            </div>
            
            <div className="flex space-x-2 mb-2.5">
                <div>
                    <label>City</label>
                    <input {...register("location.city")} placeholder="Venuecity" className={inputClass} />
                </div>
                <div>
                    <label>Zip code</label>
                    <input {...register("location.zip")} placeholder="0000" className={inputClass} />
                </div>
            </div>
            <div>
                <label>Country</label>
                <input {...register("location.country")} placeholder="Country" className={inputClass} />
            </div>

            {/* Submit */}
            <button type="submit" className="w-full my-4 bg-bg-primary text-white py-2 rounded-full hover:bg-bg-highlight">
                Add venue
            </button>
            {error && <p className="text-red-500">{error}</p>}
        </form>
    );
}