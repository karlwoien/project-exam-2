import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import venueSchema from '../forms/validation/venueSchema';

/**
 * Custom hook for handling venue form logic.
 * @param {Object} [venue] - Existing venue data (optional, for editing).
 * @returns {Object} - Form control functions and state.
 */
export default function useVenueForm(venue) {
  return useForm({
    resolver: yupResolver(venueSchema),
    defaultValues: venue || {
      name: '',
      description: '',
      media: [{ url: '' }],
      price: '',
      maxGuests: '',
      rating: 0,
      meta: { wifi: false, parking: false, breakfast: false, pets: false },
      location: { address: '', city: '', zip: '', country: '' },
    },
  });
}
