import { useState, useEffect } from 'react';
import { Controller } from 'react-hook-form';
import { createVenue, updateVenue } from '../../api/venues';
import useAuthStore from '../../store/authStore';
import { CiCirclePlus } from 'react-icons/ci';
import { MdClose, MdStar } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useVenueForm from '../../hooks/useVenueForm';

/**
 * VenueForm component for creating and updating venues.
 * @param {Object} props - Component props.
 * @param {Object} [props.venue] - The venue data to edit (if provided).
 * @returns {JSX.Element} - Rendered VenueForm component.
 */
export default function VenueForm({ venue }) {
  const { token } = useAuthStore();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const isEditing = !!venue;

  const { register, handleSubmit, control, setValue, watch, formState: { errors } } = useVenueForm(venue);

  const media = watch('media');
  const rating = watch('rating');

  const handleRatingClick = (index) => {
    setValue('rating', index + 1);
  };

  useEffect(() => {
    if (venue) {
      Object.keys(venue).forEach((key) => {
        setValue(key, venue[key]);
      });
    }
  }, [venue, setValue]);

  const inputClass = 'py-1 px-2.5 border border-bg-primary w-full rounded-md';

  const onSubmit = async (data) => {
    try {
      setError(null);

      const updatedMedia = data.media
        .filter((m) => (m.url?.trim() || '') !== '')
        .map((m) => ({ url: m.url, alt: `Image of ${data.name || 'Venue'}` }));

      const venueData = { ...data, media: updatedMedia };

      if (isEditing) {
        const response = await updateVenue(venue.id, venueData, token);
        toast.success('Venue updated successfully!', {
          position: 'top-center',
          autoClose: 1000,
          onClose: () => navigate(`/venue/${response.data.id}`),
        });
      } else {
        const response = await createVenue(venueData, token);
        toast.success('Venue created successfully!', {
          position: 'top-center',
          autoClose: 1000,
          onClose: () => navigate(`/venue/${response.data.id}`),
        });
      }
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    }
  };

  const removeMediaInput = (index) => {
    const updatedMedia = media.filter((_, i) => i !== index);
    setValue('media', updatedMedia);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto max-w-lg rounded-lg border border-bg-primary p-6"
    >
      <h2 className="mb-4 text-center text-xl font-normal">
        {isEditing ? 'Edit your venue' : 'Add new Venue'}
      </h2>
      <div className="mb-2.5">
        <label htmlFor="venue-name" className="block">
          Title
        </label>
        <input
          {...register('name')}
          id="venue-name"
          placeholder="Enter venue title"
          className={inputClass}
          aria-label="Venue title"
          aria-describedby="name-error"
        />
        <p id="name-error" className="text-red-500">
          {errors.name?.message}
        </p>
      </div>
      <div className="mb-2.5">
        <label htmlFor="venue-description" className="block">
          Description
        </label>
        <textarea
          {...register('description')}
          id="venue-description"
          placeholder="Describe your venue"
          className={inputClass}
          aria-label="Venue description"
          aria-describedby="description-error"
        />
        <p id="description-error" className="text-red-500">
          {errors.description?.message}
        </p>
      </div>
      <div className="mb-2.5">
        <label>Images</label>
        {media.map((_, index) => (
          <div key={index} className="mb-2 flex items-center space-x-2">
            <input
              {...register(`media.${index}.url`)}
              placeholder="Media URL"
              className={inputClass}
            />
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
        <button
          type="button"
          className="flex items-center space-x-1 hover:scale-105"
          onClick={() => setValue('media', [...media, { url: '' }])}
          aria-label="Add another image"
        >
          <CiCirclePlus className="h-10 w-10 text-bg-highlight" />
          <span className="text-sm text-gray-500">Add more</span>
        </button>
      </div>
      <div className="mb-2.5 flex space-x-2">
        <div>
          <label htmlFor="venue-price">Price/night</label>
          <input
            {...register('price')}
            id="venue-price"
            placeholder="Enter price in NOK"
            className={inputClass}
            aria-label="Venue price"
            aria-describedby="price-error"
          />
        </div>
        <div>
          <label htmlFor="venue-max-guests">Maximum guests</label>
          <input
            {...register('maxGuests')}
            id="venue-max-guests"
            placeholder="Enter maximum guests"
            className={inputClass}
            aria-label="Maximum number of guests"
            aria-describedby="maxGuests-error"
          />
        </div>
      </div>
      <p id="price-error" className="text-red-500">
        {errors.price?.message}
      </p>
      <p id="maxGuests-error" className="text-red-500">
        {errors.maxGuests?.message}
      </p>
      <div className="mb-2.5">
        <label>Amenities</label>
        <div className="flex flex-wrap space-x-2.5">
          {['breakfast', 'parking', 'wifi', 'pets'].map((amenity) => (
            <label key={amenity} className="flex items-center space-x-1">
              <Controller
                control={control}
                name={`meta.${amenity}`}
                render={({ field }) => (
                  <input
                    type="checkbox"
                    {...field}
                    checked={field.value}
                    aria-label={`Include ${amenity}`}
                  />
                )}
              />
              <span>{amenity.charAt(0).toUpperCase() + amenity.slice(1)}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="mb-2.5">
        <label className="block">Rating</label>
        <div className="flex items-center space-x-1">
          {Array.from({ length: 5 }, (_, index) => (
            <MdStar
              key={index}
              className={
                index < rating ? 'cursor-pointer text-bg-highlight' : 'cursor-pointer text-gray-300'
              }
              onClick={() => handleRatingClick(index)}
              size={24}
              aria-label={`Rate venue ${index + 1} out of 5`}
            />
          ))}
        </div>
      </div>
      <div className="mb-2.5">
        <label htmlFor="venue-address">Address</label>
        <input
          {...register('location.address')}
          id="venue-address"
          placeholder="Enter street address"
          className={inputClass}
          aria-label="Venue address"
        />
      </div>

      <div className="mb-2.5 flex space-x-2">
        <div>
          <label htmlFor="venue-city">City</label>
          <input
            {...register('location.city')}
            id="venue-city"
            placeholder="Enter city"
            className={inputClass}
            aria-label="Venue city"
          />
        </div>
        <div>
          <label htmlFor="venue-zip">Zip code</label>
          <input
            {...register('location.zip')}
            id="venue-zip"
            placeholder="Enter zip code"
            className={inputClass}
            aria-label="Venue zip code"
          />
        </div>
      </div>
      <div>
        <label htmlFor="venue-country">Country</label>
        <input
          {...register('location.country')}
          id="venue-country"
          placeholder="Country"
          className={inputClass}
          aria-label="Venue country"
        />
      </div>

      <button
        type="submit"
        className="my-4 w-full rounded-full bg-bg-primary py-2 text-white hover:bg-bg-highlight"
      >
        {isEditing ? 'Update Venue' : 'Add Venue'}
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}
