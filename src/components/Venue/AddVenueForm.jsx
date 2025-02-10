import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import venueSchema from "../../forms/validation/venueSchema";
import { createVenue } from "../../api/venues";
import useAuthStore from "../../store/authStore";

export default function AddVenueForm() {
    const { token } = useAuthStore();
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const { register, handleSubmit, control, setValue, watch, formState: { errors } } = useForm({
        resolver: yupResolver(venueSchema),
        defaultValues: {
            media: [{ url: "", alt: "" }],
            meta: { wifi: false, parking: false, breakfast: false, pets: false },
        },
    });

    const media = watch("media");

    const onSubmit = async (data) => {
        setError(null);
        setSuccess(null);
        try {
            const venueData = { ...data, media: data.media.filter(m => m.url) };
            await createVenue(venueData, token);
            setSuccess("Venue created successfully!");
        } catch (err) {
            setError("Failed to create venue.");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto p-6 rounded-lg border border-black">
            <h2 className="text-center text-2xl font-bold mb-4">Add new venue</h2>
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}

            {/* Title */}
            <div className="mb-2.5 ">
                <label className="block">Title</label>
                <input {...register("name")} placeholder="Pacific View" className="input-field border w-full rounded-md px-2"/>
                <p className="text-red-500">{errors.name?.message}</p>
            </div>
            
            {/* Description */}
            <div className="mb-2.5">
                <label className="block">Description</label>
                <textarea {...register("description")} placeholder="Describe your venue" className="input-field border w-full rounded-md px-2"/>
                <p className="text-red-500">{errors.description?.message}</p>
            </div>
            

            {/* Media URLs */}
            <div className="mb-2.5">
                {media.map((_, index) => (
                    <div key={index} className="flex space-x-2 mb-2">
                        <input {...register(`media.${index}.url`)} placeholder="Media URL" className="input-field border w-full rounded-md px-2"/>
                        <input {...register(`media.${index}.alt`)} placeholder="Alt text (optional)" className="input-field border w-full rounded-md px-2"/>
                    </div>
                ))}
                <button type="button" className="text-blue-500" onClick={() => setValue("media", [...media, { url: "", alt: "" }])}>
                    + Add more
                </button>
            </div>

            {/* Price & Max Guests */}
            <div className="flex space-x-2 mb-2.5">
                <input {...register("price")} placeholder="Price/night" className="input-field border w-full rounded-md px-2" />
                <input {...register("maxGuests")} placeholder="Max guests" className="input-field border w-full rounded-md px-2" />
            </div>
            <p className="text-red-500">{errors.price?.message || errors.maxGuests?.message}</p>

            {/* Amenities */}
            <div className="mb-4">
                <label>Amenities</label>
                <div className="flex flex-wrap space-x-2">
                    {["wifi", "parking", "breakfast", "pets"].map((amenity) => (
                        <label key={amenity} className="flex items-center space-x-1">
                            <Controller control={control} name={`meta.${amenity}`} render={({ field }) => <input type="checkbox" {...field} checked={field.value} />} />
                            <span>{amenity.charAt(0).toUpperCase() + amenity.slice(1)}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Location */}
            <label>Address</label>
            <input {...register("location.address")} placeholder="Address" className=" mb-2.5 input-field border w-full rounded-md px-2" />
            <div className="flex space-x-2 mb-2.5">
                <input {...register("location.city")} placeholder="City" className="input-field border w-full rounded-md px-2" />
                <input {...register("location.zip")} placeholder="Zip code" className="input-field border w-full rounded-md px-2" />
            </div>
            <input {...register("location.country")} placeholder="Country" className="input-field border w-full rounded-md px-2" />

            {/* Submit */}
            <button type="submit" className="w-full mt-4 bg-bg-primary text-white py-2 rounded-full hover:bg-bg-highlight">
                Add venue
            </button>
        </form>
    );
}